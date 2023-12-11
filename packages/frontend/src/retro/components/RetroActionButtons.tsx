import React from "react";
import { ToggleRetroBlurButton } from "./buttons/ToggleRetroBlurButton";
import { CreateColumnButton } from "./buttons/CreateColumnButton";
import { FlexBox } from "../../common/components/FlexBox";
import { ToggleRetroVotingButton } from "./buttons/ToggleRetroVotingButton";
import { OpenTimerDialogButton } from "./buttons/OpenTimerDialogButton";

export function RetroActionButtons() {
  return (
    <FlexBox flexDirection="row" p={1}>
      <CreateColumnButton />
      <ToggleRetroBlurButton />
      <ToggleRetroVotingButton />
      <OpenTimerDialogButton />
    </FlexBox>
  );
}
