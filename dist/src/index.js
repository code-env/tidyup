#!/usr/bin/env ts-node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const util_1 = require("util");
const readdir = (0, util_1.promisify)(fs_1.default.readdir);
const mkdir = (0, util_1.promisify)(fs_1.default.mkdir);
const rename = (0, util_1.promisify)(fs_1.default.rename);
const stat = (0, util_1.promisify)(fs_1.default.stat);
// Define mappings for file types to folder names
const FILE_TYPE_MAP = {
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
async function getFileTypes(dirPath) {
    const files = await readdir(dirPath);
    const fileTypes = {};
    for (const file of files) {
        const filePath = path_1.default.join(dirPath, file);
        const fileStat = await stat(filePath);
        if (fileStat.isFile()) {
            const ext = path_1.default.extname(file).toLowerCase();
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
async function organizeFiles(dirPath) {
    const fileTypes = await getFileTypes(dirPath);
    const summary = [];
    for (const [ext, filePaths] of Object.entries(fileTypes)) {
        const folderName = FILE_TYPE_MAP[ext] || `others-${ext.replace(".", "")}`;
        const folderPath = path_1.default.join(dirPath, folderName);
        let folderCreated = false;
        if (!fs_1.default.existsSync(folderPath)) {
            await mkdir(folderPath);
            folderCreated = true;
        }
        let filesAdded = 0;
        for (const filePath of filePaths) {
            const fileName = path_1.default.basename(filePath);
            let newFilePath = path_1.default.join(folderPath, fileName);
            // Check if file already exists and resolve conflicts
            if (fs_1.default.existsSync(newFilePath)) {
                const fileBase = path_1.default.parse(fileName).name;
                const fileExt = path_1.default.extname(fileName);
                let counter = 1;
                while (fs_1.default.existsSync(newFilePath)) {
                    const newFileName = `${fileBase}(${counter})${fileExt}`;
                    newFilePath = path_1.default.join(folderPath, newFileName);
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
        const absDirPath = path_1.default.resolve(dirPath);
        const dirStat = await stat(absDirPath);
        if (!dirStat.isDirectory()) {
            console.error(`The provided path is not a directory: ${absDirPath}`);
            process.exit(1);
        }
        await organizeFiles(absDirPath);
    }
    catch (error) {
        console.error("An error occurred:", error.message);
        process.exit(1);
    }
})();