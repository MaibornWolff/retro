import { ButtonProps } from "@mui/material";
import React from "react";
import { keyframes } from "@emotion/react";
import { ActionButton } from "./ActionButton";
interface WiggleActionButtonProps extends ButtonProps {
  onClick: () => void;
  label: string;
  isDisabled?: boolean;
  icon?: React.ReactNode;
  isWiggling: boolean;
}

export function WiggleActionButton({
  onClick,
  label,
  icon,
  isWiggling,
  ...props
}: WiggleActionButtonProps) {
  const wiggle = keyframes`
      0%,20%,40%,60%,80%,100% { transform: rotate(0deg); }
      5%,25%,45%,65%,85% { transform: rotate(5deg); }
      10%,30%,50%,70%,90% { transform: rotate(-5deg); }
      15%,35%,55%,75%,95% { transform: rotate(0deg); }
  `;
  return (
    <ActionButton
      label={label}
      onClick={onClick}
      icon={icon}
      sx={{ animation: isWiggling ? `${wiggle} 0.5s ease infinite` : undefined }}
      {...props}
    ></ActionButton>
  );
}
