import React from "react";
import { Typography } from "@mui/material";

interface ErrorHelperTextProps {
  isError?: boolean;
  message?: string;
}

export function ErrorHelperText({ isError, message }: ErrorHelperTextProps) {
  if (!isError || !message) return null;

  return (
    <Typography variant="caption" color="error">
      {message}
    </Typography>
  );
}
