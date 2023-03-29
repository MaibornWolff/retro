import React from "react";
import { CircularProgress, Typography } from "@mui/material";
import { FlexBox } from "./FlexBox";

export function WaitingForApproval() {
  const message = "Waiting for approval...";

  return (
    <FlexBox
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      width="100%"
      height="100vh"
      gap="8rem"
    >
      <Typography variant="h2">{message}</Typography>
      <CircularProgress size="4rem" />
    </FlexBox>
  );
}
