#!/usr/bin/env node
import { Command } from "commander";
import fs from "fs";
import path from "path";
import { promisify } from "util";
import { version } from "../package.json";

const readdir = promisify(fs.readdir);
const mkdir = promisify(fs.mkdir);
const rename = promisify(fs.rename);
const stat = promisify(fs.stat);

// Define mappings for file types to folder names
const FILE_TYPE_MAP: Record<string, string> = {
  ".png": "images-png",
  ".jpg": "images-jpg",
  ".jpeg": "images-jpeg",
  ".mp4": "videos-mp4",
  ".avi": "videos-avi",
  ".pdf": "documents-pdf",
};

const program = new Command();

program
  .version(version)
  .argument("[directory]", "Directory to tidy up", ".") // Default to current directory
  .description("Organize files in a directory based on their extensions")
  .option("--ext", "Use the file extetions as folder names")
  .option("--name", "Group files by starting name")
  .action(async (inputDir: string, option: { ext: boolean; name: boolean }) => {
    const dirPath = path.resolve(inputDir);
    try {
      if (option.ext && option.name) {
        console.error("Only one of --ext or --name can be used at a time");
        process.exit(1);
      }

      const dirStat = await stat(dirPath);
      if (!dirStat.isDirectory()) {
        console.error(`The provided path is not a directory: ${dirPath}`);
        process.exit(1);
      }

      await organizeFiles(dirPath, option);
    } catch (error: any) {
      console.error("An error occurred:", error.message);
      process.exit(1);
    }
  });

program.parse(process.argv);

/**
 * Get all file types present in a directory.
 * @param dirPath - The path to the directory.
 * @returns A record where keys are file extensions and values are file paths.
 */
async function getFileTypes(
  dirPath: string
): Promise<Record<string, string[]>> {
  const files = await readdir(dirPath);
  const fileTypes: Record<string, string[]> = {};

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const fileStat = await stat(filePath);

    if (fileStat.isFile()) {
      const ext = path.extname(file).toLowerCase();
      if (!fileTypes[ext]) {
        fileTypes[ext] = [];
      }
      fileTypes[ext].push(filePath);
    }
  }

  return fileTypes;
}

/**
 * Get all file name groups based on starting names.
 * @param dirPath - The path to the directory.
 * @returns A record where keys are base names and values are file paths.
 */
async function getFileNameGroups(
  dirPath: string
): Promise<Record<string, string[]>> {
  const files = await readdir(dirPath);
  const nameGroups: Record<string, string[]> = {};

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const fileStat = await stat(filePath);

    if (fileStat.isFile()) {
      const baseName = path.parse(file).name.slice(0, 10);
      if (!nameGroups[baseName]) {
        nameGroups[baseName] = [];
      }
      nameGroups[baseName].push(filePath);
    }
  }

  return nameGroups;
}

/**
 * Organize files into folders based on their extensions and provide detailed output.
 * @param dirPath - The directory path to organize.
 */

async function organizeFiles(
  dirPath: string,
  options: { ext: boolean; name: boolean }
): Promise<void> {
  let fileTypes: Record<string, string[]>;

  if (options.name) {
    fileTypes = await getFileNameGroups(dirPath);
  } else {
    fileTypes = await getFileTypes(dirPath);
  }

  const summary: { folder: string; created: boolean; filesAdded: number }[] =
    [];

  for (const [ext, filePaths] of Object.entries(fileTypes)) {
    const newFolder = ext.split(".")[1];

    const folderName = options.ext
      ? newFolder
      : FILE_TYPE_MAP[ext] || `others-${ext.replace(".", "")}`;
    const folderPath = path.join(dirPath, folderName);
    let folderCreated = false;

    if (!fs.existsSync(folderPath)) {
      await mkdir(folderPath);
      folderCreated = true;
    }

    let filesAdded = 0;
    for (const filePath of filePaths) {
      const fileName = path.basename(filePath);
      let newFilePath = path.join(folderPath, fileName);
      // Check if file already exists and resolve conflicts
      if (fs.existsSync(newFilePath)) {
        const fileBase = path.parse(fileName).name;
        const fileExt = path.extname(fileName);
        let counter = 1;
        while (fs.existsSync(newFilePath)) {
          const newFileName = `${fileBase}(${counter})${fileExt}`;
          newFilePath = path.join(folderPath, newFileName);
          counter++;
        }
      }
      await rename(filePath, newFilePath);
      filesAdded++;
    }
    summary.push({ folder: folderName, created: folderCreated, filesAdded });
  }

  const lastPath = dirPath.split("/");
  const lastDir = lastPath[lastPath.length - 1];

  console.log(`Organization Summary for '${lastDir}':`);
  for (const { folder, created, filesAdded } of summary) {
    console.log(`- Folder: ${folder}`);
    console.log(`  - ${created ? "Created" : "Already existed"}`);
    console.log(`  - Files added: ${filesAdded}`);
  }
}
