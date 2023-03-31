import express from "express";
import http from "http";
import { Namespace, Server, Socket } from "socket.io";
import cors from "cors";

import { ClientToServerEvents, ServerToClientEvents } from "@shared/socket";
import { ConnectionStore } from "./store/ConnectionStore";
import { logger } from "@shared/logger";
import RoomStore from "./store/RoomStore";
import { RoomConfigurationRequestBody } from "../../shared/types/types";

export function setupServer() {
  const app = express();
  const server = http.createServer(app);

  const connectionStore = new ConnectionStore();
  const roomStore = new RoomStore();

  const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
    cors: {
      origin: "*", // TODO: add proper CORS config
    },
    allowEIO3: true,
  });

  app.use(cors());
  app.use(express.json());

  app.get("/:namespace/rooms/:roomId", (req, res) => {
    const { roomId, namespace } = req.params;
    const roomExists = io.of(`/${namespace}`).adapter.rooms.has(roomId);
    if (roomExists) {
      const roomConfiguration = roomStore.getRoomConfiguration(roomId);
      return res.status(200).send(roomConfiguration);
    }
    return res.status(404).send();
  });

  app.put("/:namespace/rooms/:roomId/is-auto-accept-activated", (req, res) => {
    const { roomId, namespace } = req.params;
    const roomExists = io.of(`/${namespace}`).adapter.rooms.has(roomId);
    roomExists ? res.status(200) : res.status(404);
    if (roomExists) {
      const { isActivated }: RoomConfigurationRequestBody = req.body;
      roomStore.updateIsAutoAcceptActivated(roomId, isActivated);
    }
    return res.send();
  });

  const namespaces = ["/retro", "/poker"];

  namespaces.forEach((namespace) => {
    const ioNamespace = io.of(namespace);
    ioNamespace.on("connection", (socket: Socket) => {
      socket.on("createRoom", async ({ roomId, userId, isAutoAcceptActivated }) => {
        await socket.join(roomId);
        const waitingRoomId = getWaitingRoomId(roomId);
        await socket.join(waitingRoomId);

        roomStore.addRoom(roomId, { isAutoAcceptActivated });
        connectionStore.addConnection(socket.id, {
          userId,
          waitingRoomId,
          roomId,
        });
        logger.debug("Creating room", {
          userId,
          roomId,
          connectionStoreState: connectionStore.get(),
        });
      });

      socket.on("requestJoinRoom", async ({ roomId, userId, userName }) => {
        const waitingRoomId = getWaitingRoomId(roomId);
        await socket.join(waitingRoomId);
        connectionStore.addConnection(socket.id, { userId, waitingRoomId });
        logger.debug("requestJoinRoom", { waitingRoomId, userId, userName });
        const roomConfiguration = roomStore.getRoomConfiguration(roomId);
        if (roomConfiguration?.isAutoAcceptActivated) {
          await handleJoinRoom(socket, roomId, ioNamespace, userId);
        } else {
          socket.to(waitingRoomId).emit("requestedJoinRoom", { userId, userName });
        }
      });

      socket.on("acceptJoinRequest", ({ roomId, userId }) => {
        const waitingRoomId = getWaitingRoomId(roomId);
        logger.debug("acceptJoinRequest", { waitingRoomId, userId });
        ioNamespace.to(waitingRoomId).emit("acceptedJoinRequest", { userId });
      });

      socket.on("joinRoom", async ({ roomId, userId }) => {
        const waitingRoomId = getWaitingRoomId(roomId);
        await socket.join(waitingRoomId);
        await handleJoinRoom(socket, roomId, ioNamespace, userId);
      });

      socket.on("rejectJoinRequest", async ({ roomId, userId }) => {
        const waitingRoomId = getWaitingRoomId(roomId);
        logger.debug("rejectJoinRequest", { waitingRoomId, userId });
        ioNamespace.to(waitingRoomId).emit("rejectedJoinRequest", {
          userId,
        });
      });

      socket.on("dataListenerEstablished", ({ roomId, receiverUserId, senderUserId }) => {
        logger.debug("dataListenerEstablished", { receiverUserId, senderUserId });
        socket.to(roomId).emit("dataListenerReady", { receiverUserId, senderUserId });
      });

      socket.on("disconnect", (reason) => {
        const connection = connectionStore.getConnection(socket.id);
        if (!connection) return;

        const { userId, waitingRoomId, roomId } = connection;
        connectionStore.removeConnection(socket.id);
        logger.debug("User disconnected.", {
          reason,
          userId,
          roomId,
          connectionStoreState: connectionStore.get(),
        });
        if (roomId) socket.to(roomId).emit("userDisconnected", { disconnectedUserId: userId });
        socket.to(waitingRoomId).emit("userDisconnected", { disconnectedUserId: userId });
      });
    });
  });

  async function handleJoinRoom(
    socket: Socket,
    roomId: string,
    ioNamespace: Namespace<ClientToServerEvents, ServerToClientEvents>,
    userId: string
  ) {
    await socket.join(roomId);
    const waitingRoomId = getWaitingRoomId(roomId);
    const socketIdsInRoom = Array.from(ioNamespace.adapter.rooms.get(roomId) ?? []);

    connectionStore.addConnection(socket.id, {
      userId,
      waitingRoomId,
      roomId,
    });
    const connectedUserIds = connectionStore.getConnections(socketIdsInRoom);
    logger.debug("Joining room", {
      userId,
      roomId,
      connectionStoreState: connectionStore.get(),
    });
    ioNamespace.to(roomId).emit("userConnected", {
      connectedUserIds,
      connectedUserId: userId,
    });
  }

  return server;
}

function getWaitingRoomId(roomId: string) {
  return `${roomId}_waitingRoom`;
}
