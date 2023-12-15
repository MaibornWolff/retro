import { Button, ButtonProps, useTheme } from "@mui/material";
import React, { MouseEventHandler } from "react";

interface ActionButtonProps extends ButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  label: string;
  icon?: React.ReactNode;
}

export function ActionButton({ onClick, label, icon, ...props }: ActionButtonProps) {
  const theme = useTheme();

  return (
    <Button
      {...props}
      variant="contained"
      onClick={onClick}
      sx={{
        m: 1,
        borderRadius: theme.spacing(2),
        boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)",
        whiteSpace: "nowrap",
        width: theme.spacing(22),
        ...props.sx,
      }}
      startIcon={icon}
      fullWidth
    >
      {label}
    </Button>
  );
}
