import { BoxProps, FormControlLabel, Switch } from "@mui/material";
import React from "react";
import { isModerator } from "../utils/participantsUtils";
import { useUserContext } from "../context/UserContext";
import { FlexBox } from "./FlexBox";

interface AutoAcceptSwitchProps extends BoxProps {
  isSwitchActivated: boolean;
  toggleChecked: () => void;
  isDisabled?: boolean;
}

export function AutoAcceptSwitch({
  isSwitchActivated,
  toggleChecked,
  isDisabled,
  ...props
}: AutoAcceptSwitchProps) {
  const { user } = useUserContext();

  return (
    <FlexBox {...props}>
      {isModerator(user) && (
        <FormControlLabel
          labelPlacement="start"
          label="Auto-Accept"
          control={
            <Switch checked={isSwitchActivated} onChange={toggleChecked} disabled={isDisabled} />
          }
        />
      )}
    </FlexBox>
  );
}
