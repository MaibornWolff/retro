import React from "react";
import Participant from "./Participant";
import { RetroState } from "../../retro/types/retroTypes";
import { PokerState } from "../../poker/types/pokerTypes";

interface ParticipantsProps {
  state: RetroState | PokerState;
  handleKickUser: (userId: string) => void;
  handleTransferModeratorRole: (userId: string) => void;
}

export default function Participants({
  state,
  handleKickUser,
  handleTransferModeratorRole,
}: ParticipantsProps) {
  return (
    <>
      {Object.values(state.participants).map((participant) => (
        <Participant
          key={participant.id}
          participant={participant}
          handleKickUser={handleKickUser}
          handleTransferModeratorRole={handleTransferModeratorRole}
        />
      ))}
    </>
  );
}
