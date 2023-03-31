import React from "react";
import { PokerUser } from "./PokerUser";
import { usePokerContext } from "../context/PokerContext";
import { FlexBox } from "../../common/components/FlexBox";

export function PokerUsers() {
  const { pokerState } = usePokerContext();
  return (
    <FlexBox justifyContent="center" alignItems="center">
      {Object.values(pokerState.participants).map((user) => {
        return <PokerUser key={user.id} user={user} votes={pokerState.votes} />;
      })}
    </FlexBox>
  );
}
