const chalk = require("chalk");
const findRemoveSync = require("find-remove");

const REGULAR_THRESHOLD = 604800; // one week
const PUBLIC_THRESHOLD = 21600; // six hours
const THRESHOLD = process.env.RETRO_PUBLIC
  ? PUBLIC_THRESHOLD
  : REGULAR_THRESHOLD;

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
