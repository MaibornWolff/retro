import React from "react";
import { useRetroContext } from "../../context/RetroContext";
import Participant from "./Participant";

export default function Participants() {
  const { retroState } = useRetroContext();

  return (
    <>
      {Object.values(retroState.participants).map((participant) => (
        <Participant key={participant.id} participant={participant} />
      ))}
    </>
  );
}
