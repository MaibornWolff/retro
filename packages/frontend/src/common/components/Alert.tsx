import React from "react";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

export function Alert(props: AlertProps) {
  return <MuiAlert elevation={5} variant="filled" {...props} />;
}
