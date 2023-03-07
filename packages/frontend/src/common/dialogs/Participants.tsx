import React from "react";
import Participant from "./Participant";
import { UserByUserId } from "../../retro/types/retroTypes";

interface ParticipantsProps {
  participants: UserByUserId;
  handleKickUser: (userId: string) => void;
  handleTransferModeratorRole: (userId: string) => void;
}

export default function Participants({
  participants,
  handleKickUser,
  handleTransferModeratorRole,
}: ParticipantsProps) {
  return (
    <>
      {Object.values(participants).map((participant) => (
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
