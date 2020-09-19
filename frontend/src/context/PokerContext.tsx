import React, { useReducer } from "react";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import { nanoid } from "nanoid";

import { reducer } from "../reducers/poker.reducer";
import { PokerContextValues } from "../types/context.types";
import {
  SET_NAME,
  CREATE_POKER_ROLE,
  SET_VOTE,
  RESET_VOTES,
} from "../actions/poker.actions";
import { BACKEND_ENDPOINT } from "../utils";
import {
  createPokerUser,
  getPokerUser,
  setPokerUser,
} from "../utils/poker.utils";

let socket: SocketIOClient.Socket;

type PokerContextProviderProps = {
  children?: React.ReactNode;
};

interface ParamTypes {
  pokerId: string;
}

function getInitialState(pokerId: string) {
  const user = getPokerUser(pokerId);

  if (user !== null) {
    return user;
  }

  return {
    id: "",
    name: "",
    role: "",
    vote: -1,
    voted: false,
  };
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const PokerContext = React.createContext<PokerContextValues>(undefined!);
export default function PokerContextProvider(props: PokerContextProviderProps) {
  const { pokerId } = useParams<ParamTypes>();
  const [pokerState, dispatch] = useReducer(reducer, getInitialState(pokerId));

  if (!socket) {
    socket = io(BACKEND_ENDPOINT, { query: "pokerId=" + pokerId });
  }

  function createPokerRole(pokerId: string, role: string) {
    const userId = nanoid();
    dispatch({ type: CREATE_POKER_ROLE, payload: { role, id: userId } });
    createPokerUser(pokerId, userId, role);
  }

  function setPokerName(pokerId: string, name: string) {
    dispatch({ type: SET_NAME, payload: { name } });
    setPokerUser("name", name, pokerId);
  }

  function setPokerVote(pokerId: string, vote: number) {
    dispatch({ type: SET_VOTE, payload: { vote } });
    setPokerUser("vote", vote, pokerId);
    setPokerUser("voted", true, pokerId);
  }

  function resetPokerVotes(pokerId: string) {
    dispatch({ type: RESET_VOTES });
    setPokerUser("vote", -1, pokerId);
    setPokerUser("voted", false, pokerId);
  }

  const value = {
    pokerId,
    socket,
    pokerState,
    setPokerName,
    createPokerRole,
    setPokerVote,
    resetPokerVotes,
  };

  return (
    <PokerContext.Provider value={value}>
      {props.children}
    </PokerContext.Provider>
  );
}
