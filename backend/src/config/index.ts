import chalk from "chalk";
import { resolve } from "path";
import { config } from "dotenv";

const DEVELOPMENT = "DEVELOPMENT";
const PRODUCTION = "PRODUCTION";

const env = process.env.NODE_ENV || DEVELOPMENT;

console.log(chalk`{blue.bold [INFO] ENV is ${env}}`);

if (env === DEVELOPMENT) {
  config({ path: resolve(__dirname, "./env/dev.env") });
} else if (env === PRODUCTION) {
  config({ path: resolve(__dirname, "./env/prod.env") });
}
