import React from "react";
import { IconButtonProps } from "@mui/material";
import { TooltipIconButton } from "../../../common/TooltipIconButton";

interface CardActionButtonProps extends IconButtonProps {
  onClick: () => void;
  tooltipText: string;
}

export function CardActionButton({
  tooltipText,
  onClick,
  children,
  ...props
}: CardActionButtonProps) {
  return (
    <TooltipIconButton tooltipText={tooltipText} {...props} size="small" onClick={onClick}>
      {children}
    </TooltipIconButton>
  );
}
