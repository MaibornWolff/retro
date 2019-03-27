const TEST = "TEST";
const DEVELOPMENT = "DEVELOPMENT";
const PRODUCTION = "PRODUCTION";

const env = process.env.NODE_ENV || DEVELOPMENT;

console.log(`[INFO] ENV is ${env}`);

if (env === DEVELOPMENT) {
  process.env.PORT = 8081;
} else if (env === TEST) {
  process.env.PORT = 3001;
} else if (env === PRODUCTION) {
  process.env.PORT = 80;
}
