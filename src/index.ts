#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { promisify } from "util";
import { Command } from "commander";
import packageJson from "../package.json";

const program = new Command();

const readdir = promisify(fs.readdir);
const mkdir = promisify(fs.mkdir);
const rename = promisify(fs.rename);
const stat = promisify(fs.stat);

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
      const baseName = path.parse(file).name.split("-")[0]; // Group by prefix before "-"
      if (!nameGroups[baseName]) {
        nameGroups[baseName] = [];
      }
      nameGroups[baseName].push(filePath);
    }
  }

  return nameGroups;
}

/**
 * Organize files into folders and provide detailed output.
 * @param dirPath - The directory path to organize.
 * @param options - Options for organizing (by extensions or names).
 */
async function organizeFiles(
  dirPath: string,
  options: { ext: boolean; name: boolean }
): Promise<void> {
  const fileGroups = options.name
    ? await getFileNameGroups(dirPath)
    : await getFileTypes(dirPath);

  const summary: { folder: string; created: boolean; filesAdded: number }[] =
    [];
  let totalFilesMoved = 0;

  for (const [key, filePaths] of Object.entries(fileGroups)) {
    const folderName = options.ext ? key.replace(".", "") : key;
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

    totalFilesMoved += filesAdded;
    summary.push({ folder: folderName, created: folderCreated, filesAdded });
  }

  // Print summary
  console.log(`Organization Summary for '${dirPath}':`);
  if (totalFilesMoved === 0) {
    console.log("- No files were organized.");
  } else {
    for (const { folder, created, filesAdded } of summary) {
      console.log(`- Folder: ${folder}`);
      console.log(`  - ${created ? "Created" : "Already existed"}`);
      console.log(`  - Files added: ${filesAdded}`);
    }
  }
}

/**
 * CLI Entry Point
 */
program
  .name("dir-tidy")
  .version(packageJson.version)
  .description("Organize files in a directory into categorized folders.")
  .argument("[directory]", "The directory to organize", ".")
  .option("--ext", "Use file extensions as folder names")
  .option("--name", "Group files by starting names")
  .action(
    async (directory: string, options: { ext: boolean; name: boolean }) => {
      try {
        if (options.ext && options.name) {
          console.error("Options --ext and --name are mutually exclusive.");
          process.exit(1);
        }
        const absDirPath = path.resolve(directory);
        const dirStat = await stat(absDirPath);

        if (!dirStat.isDirectory()) {
          console.error(`The provided path is not a directory: ${absDirPath}`);
          process.exit(1);
        }

        await organizeFiles(absDirPath, options);
      } catch (error: any) {
        console.error("An error occurred:", error.message);
        process.exit(1);
      }
    }
  );

program.parse(process.argv);
