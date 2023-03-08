import express from "express";
import http from "http";
import cors from "cors";
import { ExpressPeerServer } from "peer";

export function setupSignalingServer() {
  const app = express();
  const server = http.createServer(app);

  const peerServer = ExpressPeerServer(server);

  app.use(cors());
  app.use("/", peerServer);

  return server;
}
