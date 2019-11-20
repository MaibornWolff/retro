const proxy = require("http-proxy-middleware");
module.exports = function(app) {
  if (process.env.DEV_ENV === "DOCKER") {
    app.use("/*", proxy({ target: "http://host.docker.internal:3001", changeOrigin: true }));
  } else {
    app.use("/*", proxy({ target: "http://localhost:3001", changeOrigin: true }));
  }
};
