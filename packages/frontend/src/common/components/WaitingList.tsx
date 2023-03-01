import React from "react";
import WaitingUser from "./WaitingUser";
import { RetroState } from "../../retro/types/retroTypes";
import { PokerState } from "../../poker/types/pokerTypes";

interface WaitingListProps {
  state: RetroState | PokerState;
  handleRejectJoinUser: (userId: string) => void;
  handleAcceptJoinUser: (userId: string) => void;
}

export function WaitingList({
  state,
  handleRejectJoinUser,
  handleAcceptJoinUser,
}: WaitingListProps) {
  return (
    <>
      {Object.values(state.waitingList).map((waitingUser) => (
        <WaitingUser
          key={waitingUser.id}
          waitingUser={waitingUser}
          handleAcceptJoinUser={handleAcceptJoinUser}
          handleRejectJoinUser={handleRejectJoinUser}
        />
      ))}
    </>
  );
}
