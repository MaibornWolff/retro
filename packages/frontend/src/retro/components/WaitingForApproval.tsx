import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

export function WaitingForApproval() {
  const message = "Waiting for approval...";

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: "100%",
        height: "100vh",
        gap: "8rem",
      }}
    >
      <Typography variant="h2">{message}</Typography>
      <CircularProgress size="4rem" />
    </Box>
  );
}
