import React from "react";
import ReactCardFlip from "react-card-flip";

import PokerCardFront from "./cards/PokerCardFront";
import PokerCardBack from "./cards/PokerCardBack";
import { usePokerContext } from "../context/PokerContext";
import { User } from "../../common/types/commonTypes";
import { VoteByUserId } from "../types/pokerTypes";
import { hasVoted } from "../utils/pokerUtils";

interface PokerUserProps {
  user: User;
  votes: VoteByUserId;
}

export default function PokerUser({ user, votes }: PokerUserProps) {
  const { pokerState } = usePokerContext();

  const { id, name, role } = user;
  const styleProps = hasVoted(votes, id)
    ? { backgroundColor: "#48BB78" }
    : { backgroundColor: "#F56565" };

  return (
    <ReactCardFlip isFlipped={pokerState.showResults} flipDirection="horizontal">
      <PokerCardFront styleProps={styleProps} userName={name} userId={id} role={role} />
      <PokerCardBack styleProps={styleProps} userName={name} userVote={votes[id]} role={role} />
    </ReactCardFlip>
  );
}
