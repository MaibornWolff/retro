import { Button, useTheme } from "@mui/material";
import React from "react";

interface ActionButtonProps {
  onClick: () => void;
  label: string;
  isDisabled: boolean;
}

export function ActionButton({ onClick, isDisabled, label }: ActionButtonProps) {
  const theme = useTheme();

  return (
    <Button
      color="primary"
      variant="outlined"
      onClick={onClick}
      disabled={isDisabled}
      sx={{
        margin: theme.spacing(1),
      }}
      fullWidth
    >
      {label}
    </Button>
  );
}
