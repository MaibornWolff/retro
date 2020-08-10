import fs from "fs";
import path from "path";
import chalk from "chalk";

const REGULAR_THRESHOLD = 604800; // one week
const PUBLIC_THRESHOLD = 21600; // six hours
const THRESHOLD = process.env.RETRO_PUBLIC
  ? PUBLIC_THRESHOLD
  : REGULAR_THRESHOLD;

export function cleanStorage(storagePath: string): void {
  const deletedFiles: string[] = [];

  fs.readdir(storagePath, (error, files) => {
    if (error) handleError(error);

    files.forEach((file) => {
      if (isJsonOrPng(file)) {
        const filePath = path.join(storagePath, file);
        fs.stat(filePath, (error, stats) => {
          if (error) handleError(error);

          const diff = getDiffInSeconds(new Date(), stats.mtime);
          if (diff >= THRESHOLD) {
            fs.unlink(filePath, (error) => {
              if (error) handleError(error);
              deletedFiles.push(filePath);
            });
          }
        });
      }
    });

    printCleanUpResults(deletedFiles);
  });
}

function isJsonOrPng(file: string): boolean {
  const fileTypes = [".json", ".png"];
  return fileTypes.includes(path.extname(file));
}

function handleError(errorObject: any): void {
  console.log(
    chalk`{red.bold [ERROR] Error while trying to clean up storage\n${JSON.stringify(
      errorObject
    )}}`
  );
}

function printCleanUpResults(deletedFiles: string[]): void {
  console.log(chalk`{blue.bold [INFO] Storage clean up results:}`);
  deletedFiles.forEach((file) => console.log(file));
}

function getDiffInSeconds(laterDate: Date, earlierDate: Date): number {
  const diff = (laterDate.getTime() - earlierDate.getTime()) / 1000;
  return diff > 0 ? Math.floor(diff) : Math.ceil(diff);
}
