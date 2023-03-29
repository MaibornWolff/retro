import React from "react";
import ReactCardFlip from "react-card-flip";

import { PokerCardFront } from "./cards/PokerCardFront";
import { PokerCardBack } from "./cards/PokerCardBack";
import { usePokerContext } from "../context/PokerContext";
import { User } from "../../common/types/commonTypes";
import { VoteByUserId } from "../types/pokerTypes";
import { hasVoted } from "../utils/pokerUtils";

interface PokerUserProps {
  user: User;
  votes: VoteByUserId;
}

export function PokerUser({ user, votes }: PokerUserProps) {
  const { pokerState } = usePokerContext();

  return (
    <ReactCardFlip isFlipped={pokerState.showResults} flipDirection="horizontal">
      <PokerCardFront voted={hasVoted(votes, user.id)} pokerUser={user} />
      <PokerCardBack voted={hasVoted(votes, user.id)} pokerUser={user} userVote={votes[user.id]} />
    </ReactCardFlip>
  );
}
