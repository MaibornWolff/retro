import "./config";
import chalk from "chalk";
import path from "path";
import http from "http";
import express from "express";
import socketio from "socket.io";
import rateLimit from "express-rate-limit";
import { json } from "body-parser";
import cors from "cors";
import { CronJob } from "cron";

import apiRouter from "./routes/api-router";
import pokerRouter from "./routes/poker-router";
import { cleanStorage } from "./storage-clean-up";
import { CONNECT, DISCONNECT } from "./events/event-names";
import { boardEvents, columnEvents, cardEvents, pokerEvents } from "./events";

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const publicDir = path.resolve(__dirname, "../public");
const storageDir = path.resolve(__dirname, "../storage");
const port = process.env.PORT;

const job = new CronJob("0 0 * * *", () => {
  console.log(chalk`{blue.bold [INFO] Running cronjob for storage clean up}`);
  cleanStorage(storageDir);
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

if (process.env.NODE_ENV === "DEVELOPMENT") {
  app.use(cors());
}

if (process.env.NODE_ENV === "PRODUCTION") {
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
app.use("/api/poker", pokerRouter);

// https://bit.ly/2wMAs0i
if (process.env.NODE_ENV === "PRODUCTION") {
  app.get("/*", (req, res) => {
    res.sendFile(path.join(publicDir, "index.html"));
  });
}

io.on(CONNECT, (client) => {
  const retroRoomId = client.handshake.query.boardId;
  const pokerRoomId = client.handshake.query.pokerId;

  if (retroRoomId) {
    client.join(retroRoomId);
    boardEvents(io, client, retroRoomId);
    columnEvents(io, client, retroRoomId);
    cardEvents(io, client, retroRoomId);
  } else if (pokerRoomId) {
    client.join(pokerRoomId);
    pokerEvents(io, client, pokerRoomId);
  }

  client.on(DISCONNECT, () => {
    client.leaveAll();
  });
});

server.listen(port, () => {
  console.log(chalk`{blue.bold [INFO] Listening on ${port}}`);
  job.start();
  console.log(chalk`{blue.bold [INFO] Started cronjob}`);
});
