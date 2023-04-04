import React, { Dispatch, SetStateAction, useContext, useState } from "react";

interface RoomContextProviderProps {
  children?: React.ReactNode;
}

export interface RoomContextValues {
  roomId: string;
  setRoomId: Dispatch<SetStateAction<string>>;
}

export const RoomContext = React.createContext<RoomContextValues>(undefined!);

export function RoomContextProvider(props: RoomContextProviderProps) {
  const [roomId, setRoomId] = useState("");

  const value: RoomContextValues = {
    roomId,
    setRoomId,
  };

  return <RoomContext.Provider value={value}>{props.children}</RoomContext.Provider>;
}

export function useRoomContext() {
  return useContext(RoomContext);
}
