import { Button, ButtonProps } from "@mui/material";
import React from "react";

export function CallToActionButton({ ...props }: ButtonProps) {
  return (
    <Button {...props} variant="contained" color="secondary">
      {props.children}
    </Button>
  );
}
