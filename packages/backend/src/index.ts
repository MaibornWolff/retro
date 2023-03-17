import { setupServer } from "./setupServer";
import { setupSignalingServer } from "./setupSignalingServer";
import { logger } from "@shared/logger";
import dotenv from "dotenv";
import { configuration } from "@shared/configuration";

dotenv.config();

const serverPort = configuration.backendUrl.port;
const signalingServerPort = configuration.signalingServerUrl.port;

const server = setupServer();
const signalingServer = setupSignalingServer();

server.listen(serverPort, () => {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  logger.info(`Server running on port ${serverPort}`);
});

signalingServer.listen(signalingServerPort, () => {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  logger.info(`Signaling server running on port ${signalingServerPort}`);
});
