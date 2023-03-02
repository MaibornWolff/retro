import React from "react";
import WaitingUser from "./WaitingUser";
import { UserByUserId } from "../../retro/types/retroTypes";

interface WaitingListProps {
  waitingList: UserByUserId;
  handleRejectJoinUser: (userId: string) => void;
  handleAcceptJoinUser: (userId: string) => void;
}

export function WaitingList({
  waitingList,
  handleRejectJoinUser,
  handleAcceptJoinUser,
}: WaitingListProps) {
  return (
    <>
      {Object.values(waitingList).map((waitingUser) => (
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
