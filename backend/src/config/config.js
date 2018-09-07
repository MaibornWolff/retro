const TEST = "TEST";
const DEVELOPMENT = "DEVELOPMENT";
const PRODUCTION = "PRODUCTION";

const env = process.env.NODE_ENV || DEVELOPMENT;

console.log(`>>> [INFO] Your environment is ${env}`);

// TODO: SET MONGODB URI
if (env === DEVELOPMENT) {
  process.env.PORT = 8081;
  process.env.MONGODB_URI = "";
} else if (env === TEST) {
  process.env.PORT = 3001;
  process.env.MONGODB_URI = "";
} else if (env === PRODUCTION) {
  process.env.PORT = 80;
  process.env.MONGODB_URI = "";
}