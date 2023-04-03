import { Box, Snackbar } from "@mui/material";
import { Alert } from "./Alert";
import React from "react";

interface NewParticipantSnackbarProps {
  isSnackbarOpen: boolean;
  handleCloseSnackbar: () => void;
}

export function NewParticipantSnackbar({
  isSnackbarOpen,
  handleCloseSnackbar,
}: NewParticipantSnackbarProps) {
  return (
    <Snackbar open={isSnackbarOpen} autoHideDuration={5000} onClose={handleCloseSnackbar}>
      <Box>
        <Alert onClose={handleCloseSnackbar} severity="info">
          There is a new participant waiting to be accepted.
        </Alert>
      </Box>
    </Snackbar>
  );
}
