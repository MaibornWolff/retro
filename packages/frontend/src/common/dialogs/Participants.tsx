import React from "react";
import { Participant } from "./Participant";
import { UserByUserId } from "../../retro/types/retroTypes";

interface ParticipantsProps {
  participants: UserByUserId;
  handleKickUser: (userId: string) => void;
  handlePromoteToModerator: (userId: string) => void;
}

export function Participants({
  participants,
  handleKickUser,
  handlePromoteToModerator,
}: ParticipantsProps) {
  return (
    <ul style={{ margin: 0, padding: 0 }}>
      {Object.values(participants).map((participant) => (
        <li key={participant.id} style={{ listStyleType: "none" }}>
          <Participant
            participant={participant}
            handleKickUser={handleKickUser}
            handlePromoteToModerator={handlePromoteToModerator}
          />
        </li>
      ))}
    </ul>
  );
}
