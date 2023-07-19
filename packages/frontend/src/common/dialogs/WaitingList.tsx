import React from "react";
import { WaitingUser } from "./WaitingUser";
import { UserByUserId } from "../types/commonTypes";

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
    <ul style={{ margin: 0, padding: 0 }}>
      {Object.values(waitingList).map((waitingUser) => (
        <li key={waitingUser.id} style={{ listStyleType: "none" }}>
          <WaitingUser
            waitingUser={waitingUser}
            handleAcceptJoinUser={handleAcceptJoinUser}
            handleRejectJoinUser={handleRejectJoinUser}
          />
        </li>
      ))}
    </ul>
  );
}
