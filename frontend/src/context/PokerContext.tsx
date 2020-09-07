import React, { useReducer } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

import { reducer } from "../reducers/poker.reducer";
import { PokerContextValues } from "../types/context.types";
import { SET_NAME, CREATE_POKER_ROLE } from "../actions/poker.actions";
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
  return {};
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
    dispatch({ type: CREATE_POKER_ROLE, payload: { role } });
    createPokerUser(pokerId, role);
  }

  function setPokerName(pokerId: string, name: string) {
    dispatch({ type: SET_NAME, payload: { name } });
    setPokerUser("name", name, pokerId);
  }

  const value = {
    pokerId,
    socket,
    pokerState,
    setPokerName,
    createPokerRole,
  };

  return (
    <PokerContext.Provider value={value}>
      {props.children}
    </PokerContext.Provider>
  );
}
