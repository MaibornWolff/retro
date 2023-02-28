import { useRetroContext } from "../../context/RetroContext";
import React from "react";
import WaitingUser from "../header/WaitingUser";

export function WaitingList() {
  const { retroState } = useRetroContext();

  return (
    <>
      {Object.values(retroState.waitingList).map((waitingUser) => (
        <WaitingUser key={waitingUser.id} waitingUser={waitingUser} />
      ))}
    </>
  );
}
