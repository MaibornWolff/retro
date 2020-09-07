import React from "react";
import ReactCardFlip from "react-card-flip";

import PokerCardFront from "./PokerCardFront";
import PokerCardBack from "./PokerCardBack";
import { PokerUserState } from "../../types/context.types";

interface PokerUserProps {
  user: PokerUserState;
  isFlipped: boolean;
}

export default function PokerUser(props: PokerUserProps) {
  const { user, isFlipped } = props;
  const { id, name, vote, voted } = user;
  const styleProps = voted
    ? { backgroundColor: "#48BB78" }
    : { backgroundColor: "#F56565" };

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <PokerCardFront styleProps={styleProps} userName={name} userId={id} />
      <PokerCardBack styleProps={styleProps} userName={name} userVote={vote} />
    </ReactCardFlip>
  );
}
