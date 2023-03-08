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

  const styleProps = hasVoted(votes, user.id)
    ? { backgroundColor: "#48BB78" }
    : { backgroundColor: "#F56565" };

  return (
    <ReactCardFlip isFlipped={pokerState.showResults} flipDirection="horizontal">
      <PokerCardFront styleProps={styleProps} pokerUser={user} />
      <PokerCardBack styleProps={styleProps} pokerUser={user} userVote={votes[user.id]} />
    </ReactCardFlip>
  );
}
