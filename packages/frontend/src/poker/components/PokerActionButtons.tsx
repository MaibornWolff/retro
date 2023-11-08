import React from "react";
import { ResetVotesButton } from "./buttons/ResetVotesButton";
import { PokerResultButton } from "./buttons/PokerResultButton";
import { usePokerContext } from "../context/PokerContext";

export function PokerActionButtons() {
  const { pokerState } = usePokerContext();

  if (pokerState.showResults) return <ResetVotesButton />;
  return <PokerResultButton />;
}
