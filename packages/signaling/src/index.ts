import dotenv from "dotenv";
import { getConfiguration } from "@shared/configuration";
import { spawn } from "child_process";
import { logger } from "@shared/logger";

dotenv.config();

const signalingServerPort = getConfiguration().signalingServerUrl.port;

const peerServer = spawn("peerjs", ["--port", String(signalingServerPort)], { shell: true });

peerServer.on("error", (error) => {
  logger.error("Error when spawning the process: ", error);
});

peerServer.stderr.on("data", (error) => {
  logger.error(error.toString());
});

peerServer.stdout.on("data", (data) => {
  logger.info(data.toString());
});

peerServer.on("close", (data) => {
  logger.error("Closing process: ", data?.toString());
  peerServer.kill();
});
