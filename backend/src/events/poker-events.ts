import fs from "fs";
import { Server, Socket } from "socket.io";
import {
  PokerParticipant,
  PokerState,
  PokerStory,
} from "src/models/PokerState";
import { getPath, logError, getPokerState, stringify } from "../utils";

import {
  JOIN_POKER,
  JOIN_POKER_ERROR,
  JOIN_POKER_SESSION,
  POKER_ERROR,
  UPDATE_POKER_STATE,
  SHOW_POKER_RESULTS,
  SET_POKER_STORY,
  SET_POKER_VOTE,
  POKER_RESET,
  UPDATE_AND_RESET_POKER_STATE,
  SET_POKER_UNIT,
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
        resetVotes(pokerState);

        fs.writeFile(path, stringify(pokerState), UTF8, (error) => {
          if (error) logError(SET_POKER_STORY, error);
          io.to(roomId).emit(UPDATE_AND_RESET_POKER_STATE, pokerState);
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

export function setPokerVote(io: Server, client: Socket, roomId: string): void {
  client.on(SET_POKER_VOTE, (pokerId: string, userId: string, vote: number) => {
    const path = getPath(pokerId);
    fs.readFile(path, UTF8, (error, file: string) => {
      if (error) logError(SET_POKER_VOTE, error);
      const pokerState = getPokerState(file);

      if (pokerState === null) {
        client.emit(POKER_ERROR);
      } else {
        pokerState.participants.forEach((user) => {
          if (user.id === userId) {
            user.vote = vote;
            user.voted = true;
          }
        });

        fs.writeFile(path, stringify(pokerState), UTF8, (error) => {
          if (error) logError(SET_POKER_VOTE, error);
          io.to(roomId).emit(UPDATE_POKER_STATE, pokerState);
        });
      }
    });
  });
}

export function resetPoker(io: Server, client: Socket, roomId: string): void {
  client.on(POKER_RESET, (pokerId: string) => {
    const path = getPath(pokerId);
    fs.readFile(path, UTF8, (error, file: string) => {
      if (error) logError(SET_POKER_VOTE, error);
      const pokerState = getPokerState(file);

      if (pokerState === null) {
        client.emit(POKER_ERROR);
      } else {
        resetVotes(pokerState);
        fs.writeFile(path, stringify(pokerState), UTF8, (error) => {
          if (error) logError(SET_POKER_VOTE, error);
          io.to(roomId).emit(UPDATE_AND_RESET_POKER_STATE, pokerState);
        });
      }
    });
  });
}

export function setPokerUnit(io: Server, client: Socket, roomId: string): void {
  client.on(
    SET_POKER_UNIT,
    (pokerUnit: string, unitRange: number, pokerId: string) => {
      const path = getPath(pokerId);
      fs.readFile(path, UTF8, (error, file: string) => {
        if (error) logError(SET_POKER_UNIT, error);
        const pokerState = getPokerState(file);

        if (pokerState === null) {
          client.emit(POKER_ERROR);
        } else {
          pokerState.pokerUnit.unitType = pokerUnit;
          pokerState.pokerUnit.unitRangeHigh = unitRange;

          fs.writeFile(path, stringify(pokerState), UTF8, (error) => {
            if (error) logError(SET_POKER_UNIT, error);
            io.to(roomId).emit(UPDATE_POKER_STATE, pokerState);
          });
        }
      });
    }
  );
}

function resetVotes(pokerState: PokerState) {
  pokerState.participants.forEach((user) => {
    user.vote = -1;
    user.voted = false;
  });
}
