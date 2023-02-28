import React from "react";
import ReactCardFlip from "react-card-flip";

import PokerCardFront from "./cards/PokerCardFront";
import PokerCardBack from "./cards/PokerCardBack";
import { usePokerContext } from "../context/PokerContext";
import { PokerParticipant } from "../types/pokerTypes";

interface PokerUserProps {
  user: PokerParticipant;
}

export default function PokerUser({ user }: PokerUserProps) {
  const { pokerState } = usePokerContext();

  const { id, name, vote, voted, role } = user;
  const styleProps = voted ? { backgroundColor: "#48BB78" } : { backgroundColor: "#F56565" };

  return (
    <ReactCardFlip isFlipped={pokerState.showResults} flipDirection="horizontal">
      <PokerCardFront styleProps={styleProps} userName={name} userId={id} role={role} />
      <PokerCardBack
        styleProps={styleProps}
        userName={name}
        userVote={vote}
        userId={id}
        role={role}
      />
    </ReactCardFlip>
  );
}
