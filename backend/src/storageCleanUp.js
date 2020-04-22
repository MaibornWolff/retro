const chalk = require("chalk");
const findRemoveSync = require("find-remove");

// delete all files older than one week
const THRESHOLD = 604800;

const clean = (storagePath) => {
  const jsonResult = findRemoveSync(storagePath, {
    age: { seconds: THRESHOLD },
    extensions: ".json",
  });

  const pngResult = findRemoveSync(storagePath, {
    age: { seconds: THRESHOLD },
    extensions: ".png",
  });

  console.log(
    chalk`{blue.bold [INFO] Delete results for JSON files\n${JSON.stringify(
      jsonResult
    )}}`
  );
  console.log(
    chalk`{blue.bold [INFO] Delete results for PNG files\n${JSON.stringify(
      pngResult
    )}}`
  );
};

module.exports = { clean };
