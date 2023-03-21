import { FormControlLabel, Switch } from "@mui/material";
import React from "react";

interface AutoAcceptSwitchProps {
  isSwitchActivated: boolean;
  toggleChecked: () => void;
}

export function AutoAcceptSwitch({ isSwitchActivated, toggleChecked }: AutoAcceptSwitchProps) {
  console.log("isSwitchActivated", isSwitchActivated);
  return (
    <FormControlLabel
      labelPlacement="start"
      control={<Switch checked={isSwitchActivated} onChange={toggleChecked} />}
      label="Auto-Accept"
    />
  );
}
