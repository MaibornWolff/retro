import React from "react";
import ReactCardFlip from "react-card-flip";

import { PokerCardFront } from "./cards/PokerCardFront";
import { PokerCardBack } from "./cards/PokerCardBack";
import { usePokerContext } from "../context/PokerContext";
import { User } from "../../common/types/commonTypes";
import { VoteByUserId } from "../types/pokerTypes";
import { hasVoted } from "../utils/pokerUtils";
import { useTheme } from "@mui/material";

interface PokerUserProps {
  user: User;
  votes: VoteByUserId;
}

export function PokerUser({ user, votes }: PokerUserProps) {
  const { pokerState } = usePokerContext();

  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === "dark";
  const votedGradientDark = `linear-gradient(19deg, #4e6423 0%, #9ac14d 60%)`;
  const notVotedGradientDark = `linear-gradient(19deg, #4b1631 0%, #972d63 60%)`;
  const votedGradientLight = `linear-gradient(19deg, #a1d68b 0%, #82c864 80%)`;
  const notVotedGradientLight = `linear-gradient(19deg, #f483b0 0%, #f05a96 80%)`;

  let gradient: string;
  if (hasVoted(votes, user.id)) {
    gradient = isDarkTheme ? votedGradientDark : votedGradientLight;
  } else {
    gradient = isDarkTheme ? notVotedGradientDark : notVotedGradientLight;
  }

  const styleProps = {
    backgroundImage: gradient,
  };

  return (
    <ReactCardFlip isFlipped={pokerState.showResults} flipDirection="horizontal">
      <PokerCardFront styleProps={styleProps} pokerUser={user} />
      <PokerCardBack styleProps={styleProps} pokerUser={user} userVote={votes[user.id]} />
    </ReactCardFlip>
  );
}
