import React from "react";
import { FlexBox } from "../../common/components/FlexBox";
import { ResetVotesButton } from "./buttons/ResetVotesButton";
import { PokerResultButton } from "./buttons/PokerResultButton";

export function PokerActionButtons() {
  return (
    <FlexBox flexDirection="row" p={1}>
      <ResetVotesButton />
      <PokerResultButton />
    </FlexBox>
  );
}
