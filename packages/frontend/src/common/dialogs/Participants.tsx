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
    <ul style={{ margin: 0, padding: 0 }}>
      {Object.values(participants).map((participant) => (
        <li key={participant.id} style={{ listStyleType: "none" }}>
          <Participant
            participant={participant}
            handleKickUser={handleKickUser}
            handleTransferModeratorRole={handleTransferModeratorRole}
          />
        </li>
      ))}
    </ul>
  );
}
