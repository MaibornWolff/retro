import React, { Dispatch, SetStateAction, useContext, useState } from "react";

interface RoomContextProviderProps {
  children?: React.ReactNode;
}

export interface RoomContextValues {
  roomId: string;
  setRoomId: Dispatch<SetStateAction<string>>;
  isAutoAcceptActivated: boolean;
  setIsAutoAcceptActivated: Dispatch<SetStateAction<boolean>>;
}

export const RoomContext = React.createContext<RoomContextValues>(undefined!);

export default function RoomContextProvider(props: RoomContextProviderProps) {
  const [roomId, setRoomId] = useState("");
  const [isAutoAcceptActivated, setIsAutoAcceptActivated] = useState(false);

  const value: RoomContextValues = {
    roomId,
    setRoomId,
    isAutoAcceptActivated,
    setIsAutoAcceptActivated,
  };

  return <RoomContext.Provider value={value}>{props.children}</RoomContext.Provider>;
}

export function useRoomContext() {
  return useContext(RoomContext);
}
