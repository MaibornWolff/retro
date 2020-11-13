import "./config";
import chalk from "chalk";
import path from "path";
import http from "http";
import express from "express";
import { Server } from "socket.io";
import rateLimit from "express-rate-limit";
import { json } from "body-parser";
import cors from "cors";
import { CronJob } from "cron";

import apiRouter from "./routes/api-router";
import pokerRouter from "./routes/poker-router";
import { cleanStorage } from "./utils/storage-clean-up";
import { CONNECT, DISCONNECT } from "./events/event-names";
import { boardEvents, columnEvents, cardEvents, pokerEvents } from "./events";

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);
const port: number = +(process.env.PORT || 3001);

let publicDir = path.resolve(__dirname, "../public");
let storageDir = path.resolve(__dirname, "../storage");

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

if (process.env.NODE_ENV === "DEVELOPMENT") {
  app.use(cors());
}

if (process.env.NODE_ENV === "PRODUCTION") {
  publicDir = path.resolve(__dirname, "../../public");
  storageDir = path.resolve(__dirname, "../../storage");
  app.use(
    cors({
      origin: [
        "http://localhost:3001",
        "http://localhost:3000",
        process.env.MW_RETRO_DEV as string,
        process.env.MW_RETRO_PROD as string,
        process.env.RETRO_PUBLIC_PROD as string,
      ],
    })
  );
}

app.use(json());
app.use(express.static(publicDir));
app.use("/api/boards", apiLimiter);
app.use("/api/boards", apiRouter);
app.use("/api/poker", apiLimiter);
app.use("/api/poker", pokerRouter);

// https://bit.ly/2wMAs0i
if (process.env.NODE_ENV === "PRODUCTION") {
  app.get("/*", (req, res) => {
    res.sendFile(path.join(publicDir, "index.html"));
  });
}

// FIXME: io.on("connect") is not triggered anymore. No implicit connection to default namespace
// Needs to be changed to io.of(CONNECTION_STRING_FROM_FE).use((socket, next) => {})
io.on(CONNECT, socket => {
  const retroRoomId = socket.handshake.query.boardId;
  const pokerRoomId = socket.handshake.query.pokerId;

  if (retroRoomId) {
    socket.join(retroRoomId);
    boardEvents(io, socket, retroRoomId);
    columnEvents(io, socket, retroRoomId);
    cardEvents(io, socket, retroRoomId);
  } else if (pokerRoomId) {
    socket.join(pokerRoomId);
    pokerEvents(io, socket, pokerRoomId);
  }

  socket.on(DISCONNECT, () => {
    socket.leaveAll();
  });
});

const job = new CronJob("0 0 * * *", () => {
  console.log(chalk`{blue.bold [INFO] Running cronjob for storage clean up}`);
  cleanStorage(storageDir);
});

httpServer.listen(port, () => {
  console.log(chalk`{blue.bold [INFO] Listening on ${port}}`);
  job.start();
  console.log(chalk`{blue.bold [INFO] Started cronjob}`);
});
