#!/usr/bin/env ts-node
import fs from "fs";
import path from "path";
import { promisify } from "util";

const readdir = promisify(fs.readdir);
const mkdir = promisify(fs.mkdir);
const rename = promisify(fs.rename);
const stat = promisify(fs.stat);

const FILE_TYPE_MAP: Record<string, string> = {
  ".png": "images-png",
  ".jpg": "images-jpg",
  ".jpeg": "images-jpeg",
  ".mp4": "videos-mp4",
  ".avi": "videos-avi",
  ".pdf": "documents-pdf",
};

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

async function organizeFiles(dirPath: string): Promise<void> {
  const fileTypes = await getFileTypes(dirPath);

  for (const [ext, filePaths] of Object.entries(fileTypes)) {
    const folderName = FILE_TYPE_MAP[ext] || `others-${ext.replace(".", "")}`;
    const folderPath = path.join(dirPath, folderName);

    if (!fs.existsSync(folderPath)) {
      await mkdir(folderPath);
    }

    for (const filePath of filePaths) {
      const fileName = path.basename(filePath);
      const newFilePath = path.join(folderPath, fileName);
      await rename(filePath, newFilePath);
    }
  }

  console.log(`Files in '${dirPath}' have been organized successfully.`);
}

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
