import { Button, useTheme } from "@mui/material";
import React from "react";

interface ActionButtonProps {
  onClick: () => void;
  label: string;
  isDisabled?: boolean;
  icon?: React.ReactNode;
}

export function ActionButton({ onClick, isDisabled, label, icon }: ActionButtonProps) {
  const theme = useTheme();

  return (
    <Button
      variant="contained"
      onClick={onClick}
      disabled={isDisabled}
      sx={{
        margin: theme.spacing(1),
        borderRadius: "10px",
        boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)",
      }}
      startIcon={icon ?? undefined}
      fullWidth
    >
      {label}
    </Button>
  );
}
