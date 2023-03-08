import { setupServer } from "./setupServer";
import { setupSignalingServer } from "./setupSignalingServer";
import { logger } from "@shared/logger";

const serverPort = 3001;
const signalingServerPort = 3002;

const server = setupServer();
const signalingServer = setupSignalingServer();

server.listen(3001, () => {
  logger.info(`Server running on port ${serverPort}`);
});

signalingServer.listen(3002, () => {
  logger.info(`Signaling server running on port ${signalingServerPort}`);
});
