import { Checkbox, FormControlLabel } from "@mui/material";
import React from "react";

interface AutoAcceptCheckboxProps {
  isCheckboxActivated: boolean;
  toggleChecked: () => void;
}

export function AutoAcceptCheckbox({
  isCheckboxActivated,
  toggleChecked,
}: AutoAcceptCheckboxProps) {
  return (
    <FormControlLabel
      label="Automatically accept all joining users"
      control={<Checkbox checked={isCheckboxActivated} onChange={toggleChecked} />}
    />
  );
}
