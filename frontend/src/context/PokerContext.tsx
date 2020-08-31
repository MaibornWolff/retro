import React, { useReducer } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { SET_NAME } from "../actions/poker.actions";

import { reducer } from "../reducers/poker.reducer";
import { PokerContextValues } from "../types/context.types";
import { BACKEND_ENDPOINT } from "../utils";
import { createPokerUser, getPokerUser } from "../utils/poker.utils";

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

  function setPokerName(pokerId: string, name: string) {
    dispatch({ type: SET_NAME, payload: { name } });
    createPokerUser(pokerId, name);
  }

  const value = {
    pokerId,
    socket,
    pokerState,
    setPokerName,
  };

  return (
    <PokerContext.Provider value={value}>
      {props.children}
    </PokerContext.Provider>
  );
}
