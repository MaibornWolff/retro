const chalk = require("chalk");

const TEST = "TEST";
const DEVELOPMENT = "DEVELOPMENT";
const PRODUCTION = "PRODUCTION";

const env = process.env.NODE_ENV || DEVELOPMENT;

console.log(chalk`{blue.bold [INFO] ENV is ${env}}`);

if (env === DEVELOPMENT) {
  process.env.PORT = 3001;
  process.env.EXPORT_URL_PORT = 3000;
  process.env.EXPORT_URL_HOST = "localhost";
} else if (env === TEST) {
  process.env.PORT = 3002;
  process.env.EXPORT_URL_PORT = 3000;
  process.env.EXPORT_URL_HOST = "localhost";
} else if (env === PRODUCTION) {
  process.env.PORT = 80;
  process.env.EXPORT_URL_PORT = 80;
  process.env.EXPORT_URL_HOST = "retro-dev-01.mwea.de";
}
