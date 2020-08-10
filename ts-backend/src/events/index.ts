import { Server, Socket } from "socket.io";

import {
  updateBoard,
  joinBoard,
  unblurCards,
  setMaxVotes,
  resetVotes,
  toggleContinueDiscussion,
  voteYes,
  voteNo,
  voteAbstain,
} from "./board-events";
import {
  createColumn,
  deleteColumn,
  sortColumn,
  editColumn,
} from "./column-events";

export function boardEvents(io: Server, client: Socket, roomId: string): void {
  joinBoard(io, client);
  updateBoard(io, client, roomId);
  unblurCards(io, client, roomId);
  setMaxVotes(io, client, roomId);
  resetVotes(io, client, roomId);
  toggleContinueDiscussion(io, client, roomId);
  voteYes(io, client, roomId);
  voteNo(io, client, roomId);
  voteAbstain(io, client, roomId);
}

export function columnEvents(io: Server, client: Socket, roomId: string): void {
  createColumn(io, client, roomId);
  deleteColumn(io, client, roomId);
  sortColumn(io, client, roomId);
  editColumn(io, client, roomId);
}
