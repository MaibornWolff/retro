import { setupServer } from "./setupServer";
import { logger } from "@shared/logger";
import dotenv from "dotenv";
import { getConfiguration } from "@shared/configuration";

dotenv.config();

const serverPort = getConfiguration().backendUrl.port;

const server = setupServer();

server.listen(serverPort, () => {
  logger.info(`Server running on port ${serverPort}`);
});
