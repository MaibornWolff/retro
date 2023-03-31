import { FormControlLabel, Switch } from "@mui/material";
import React from "react";

interface AutoAcceptSwitchProps {
  isSwitchActivated: boolean;
  toggleChecked: () => void;
  label?: string;
}

export function AutoAcceptSwitch({
  isSwitchActivated,
  toggleChecked,
  label,
}: AutoAcceptSwitchProps) {
  return (
    <FormControlLabel
      sx={{ ml: 0, width: "100%", justifyContent: "space-between" }}
      labelPlacement="start"
      label={label ?? "Auto-Accept"}
      control={<Switch color="success" checked={isSwitchActivated} onChange={toggleChecked} />}
    />
  );
}
