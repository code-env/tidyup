import * as fs from 'fs';

import { promisify } from "util";
const mkdir = promisify(fs.mkdir);
const rename = promisify(fs.rename);

class Operation {
    private dryRun: boolean;
    private summary: Record<string, string>;
    /**
     * 
     * @param dryRun - If true, operations will be simulated without making changes.
     */
    constructor(dryRun: boolean) {
        this.dryRun = dryRun;
        this.summary = {};
     
    }

    async rename(oldPath: string, newPath: string): Promise<void> {
        if (this.dryRun) {
            this.summary[this.extractFileName(oldPath)] = this.extractFileWithParentDir(newPath);
        } else {
           await rename(oldPath, newPath);
            console.log(`Renamed: ${oldPath} -> ${newPath}`);
        }
    }

    async mkdir(dirPath: string): Promise<void> {
        if (this.dryRun) {
            console.log(`[Dry Run] directory will be create ${dirPath}`);
        } else {
           await mkdir(dirPath);
        }
    }
    getSummary() {
        return this.summary;
    }
    private extractFileName(filePath: string): string {
        const parts = filePath.split("/");
        return parts[parts.length - 1];
    }
    private extractFileWithParentDir(filePath: string): string {
        const parts = filePath.split("/");
        return parts[parts.length - 2] + "/" + parts[parts.length - 1];
    }
}

export default Operation;