import { Button, ButtonProps, useTheme } from "@mui/material";
import React from "react";
import { keyframes } from "@emotion/react";
interface ActionButtonProps extends ButtonProps {
  onClick: () => void;
  label: string;
  isDisabled?: boolean;
  icon?: React.ReactNode;
  isWiggling: boolean;
}

export function WiggleActionButton({
  onClick,
  isDisabled,
  label,
  icon,
  isWiggling,
  children,
  ...props
}: ActionButtonProps) {
  const theme = useTheme();

  const wiggle = keyframes`
      0%,20%,40%,60%,80%,100% { transform: rotate(0deg); }
      5%,25%,45%,65%,85% { transform: rotate(10deg); }
      10%,30%,50%,70%,90% { transform: rotate(-10deg); }
      15%,35%,55%,75%,95% { transform: rotate(0deg); }
  `;
  return (
    <Button
      {...props}
      variant="contained"
      onClick={onClick}
      disabled={isDisabled}
      sx={{
        m: 1,
        borderRadius: theme.spacing(2),
        boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)",
        whiteSpace: "nowrap",
        width: theme.spacing(22),
        animation: isWiggling ? `${wiggle} 0.5s ease infinite` : undefined,
      }}
      startIcon={icon ?? undefined}
      fullWidth
    >
      {label}
      {children}
    </Button>
  );
}
