import fs from "fs";
import { Server, Socket } from "socket.io";
import { PokerParticipant, PokerStory } from "src/models/PokerState";
import { getPath, logError, getPokerState, stringify } from "../utils";

import {
  JOIN_POKER,
  JOIN_POKER_ERROR,
  JOIN_POKER_SESSION,
  POKER_ERROR,
  UPDATE_POKER_STATE,
  SHOW_POKER_RESULTS,
  SET_POKER_STORY,
} from "./event-names";

const UTF8 = "utf8";

export function joinPoker(io: Server, client: Socket): void {
  client.on(JOIN_POKER, (pokerId: string) => {
    fs.readFile(getPath(pokerId), UTF8, (error, file) => {
      if (error) client.emit(JOIN_POKER_ERROR);
      const pokerState = getPokerState(file);

      if (pokerState === null) client.emit(POKER_ERROR);
      client.emit(JOIN_POKER, pokerState);
    });
  });
}

export function joinPokerSession(
  io: Server,
  client: Socket,
  roomId: string
): void {
  client.on(
    JOIN_POKER_SESSION,
    (newUser: PokerParticipant, pokerId: string) => {
      const path = getPath(pokerId);
      fs.readFile(path, UTF8, (error, file: string) => {
        if (error) logError(JOIN_POKER_SESSION, error);
        const pokerState = getPokerState(file);

        if (pokerState === null) {
          client.emit(POKER_ERROR);
        } else {
          pokerState.participants.push(newUser);

          fs.writeFile(path, stringify(pokerState), UTF8, (error) => {
            if (error) logError(JOIN_POKER_SESSION, error);
            io.to(roomId).emit(UPDATE_POKER_STATE, pokerState);
          });
        }
      });
    }
  );
}

export function setPokerStory(
  io: Server,
  client: Socket,
  roomId: string
): void {
  client.on(SET_POKER_STORY, (newStory: PokerStory, pokerId: string) => {
    const path = getPath(pokerId);
    fs.readFile(path, UTF8, (error, file: string) => {
      if (error) logError(SET_POKER_STORY, error);
      const pokerState = getPokerState(file);

      if (pokerState === null) {
        client.emit(POKER_ERROR);
      } else {
        const { storyTitle, storyUrl } = newStory;
        pokerState.story.storyTitle = storyTitle;
        pokerState.story.storyUrl = storyUrl;

        fs.writeFile(path, stringify(pokerState), UTF8, (error) => {
          if (error) logError(SET_POKER_STORY, error);
          io.to(roomId).emit(UPDATE_POKER_STATE, pokerState);
        });
      }
    });
  });
}

export function showPokerResults(
  io: Server,
  client: Socket,
  roomId: string
): void {
  client.on(SHOW_POKER_RESULTS, () => {
    io.to(roomId).emit(SHOW_POKER_RESULTS);
  });
}
