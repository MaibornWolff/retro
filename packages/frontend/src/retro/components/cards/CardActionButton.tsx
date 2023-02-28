import React from "react";
import { IconButton, IconButtonProps } from "@mui/material";

interface CardActionButtonProps extends IconButtonProps {
  onClick: () => void;
}

export default function CardActionButton({ onClick, children, ...props }: CardActionButtonProps) {
  return (
    <IconButton {...props} color="inherit" size="small" onClick={onClick}>
      {children}
    </IconButton>
  );
}
