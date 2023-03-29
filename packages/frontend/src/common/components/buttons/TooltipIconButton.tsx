import { IconButton, IconButtonProps, Tooltip } from "@mui/material";
import React from "react";

interface TooltipIconButtonProps extends IconButtonProps {
  tooltipText: string;
}

export function TooltipIconButton({
  tooltipText,
  onClick,
  children,
  ...props
}: TooltipIconButtonProps) {
  return (
    <Tooltip title={tooltipText}>
      <span>
        <IconButton {...props} size="small" onClick={onClick}>
          {children}
        </IconButton>
      </span>
    </Tooltip>
  );
}
