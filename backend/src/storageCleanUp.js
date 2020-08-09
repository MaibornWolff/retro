const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

const REGULAR_THRESHOLD = 604800; // one week
const PUBLIC_THRESHOLD = 21600; // six hours
const THRESHOLD = process.env.RETRO_PUBLIC
  ? PUBLIC_THRESHOLD
  : REGULAR_THRESHOLD;

function isJsonOrPng(file) {
  const fileTypes = [".json", ".png"];
  return fileTypes.includes(path.extname(file));
}

function handleError(errorObject) {
  console.log(
    chalk`{red.bold [ERROR] Error while trying to clean up storage\n${JSON.stringify(
      errorObject
    )}}`
  );
}

function printCleanUpResults(deletedFiles) {
  console.log(chalk`{blue.bold [INFO] Storage clean up results:}`);
  deletedFiles.forEach((file) => console.log(file));
}

function getDiffInSeconds(laterDate, earlierDate) {
  const diff = (laterDate.getTime() - earlierDate.getTime()) / 1000;
  return diff > 0 ? Math.floor(diff) : Math.ceil(diff);
}

function cleanStorage(storagePath) {
  let deletedFiles = [];

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

module.exports = { cleanStorage };
