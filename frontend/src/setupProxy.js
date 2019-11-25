const proxy = require("http-proxy-middleware");
module.exports = function(app) {
  if (process.env.DEV_ENV === "DOCKER") {
    const dockerHostIp = process.env.DOCKER_HOST;
    app.use("/api/*", proxy({ target: `http://${dockerHostIp}:3001`, changeOrigin: true }));
  } else {
    app.use("/api/*", proxy({ target: "http://localhost:3001", changeOrigin: true }));
  }
};
