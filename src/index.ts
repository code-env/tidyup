#!/usr/bin/env ts-node
import fs from "fs";
import path from "path";
import { promisify } from "util";

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
 * Organize files into folders based on their extensions and provide detailed output.
 * @param dirPath - The directory path to organize.
 */
async function organizeFiles(dirPath: string): Promise<void> {
  const fileTypes = await getFileTypes(dirPath);
  const summary: { folder: string; created: boolean; filesAdded: number }[] =
    [];

  for (const [ext, filePaths] of Object.entries(fileTypes)) {
    const folderName = FILE_TYPE_MAP[ext] || `others-${ext.replace(".", "")}`;
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

  // Print summary
  console.log(`Organization Summary for '${dirPath}':`);
  for (const { folder, created, filesAdded } of summary) {
    console.log(`- Folder: ${folder}`);
    console.log(`  - ${created ? "Created" : "Already existed"}`);
    console.log(`  - Files added: ${filesAdded}`);
  }
}

/**
 * CLI Entry Point
 */
(async () => {
  const dirPath = process.argv[2];

  if (!dirPath) {
    console.error("Please provide a directory path.");
    process.exit(1);
  }

  try {
    const absDirPath = path.resolve(dirPath);
    const dirStat = await stat(absDirPath);

    if (!dirStat.isDirectory()) {
      console.error(`The provided path is not a directory: ${absDirPath}`);
      process.exit(1);
    }

    await organizeFiles(absDirPath);
  } catch (error: any) {
    console.error("An error occurred:", error.message);
    process.exit(1);
  }
})();
