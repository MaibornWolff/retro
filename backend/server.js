require("./src/config/config");

const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const bodyParser = require("body-parser");

// middlewares
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

const port = process.env.PORT;
http.listen(port, () => {
  console.log(`>>> [INFO] Listening on ${port}`);
});
