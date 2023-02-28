import React from "react";
import { Badge, Button, Typography, useTheme } from "@mui/material";
import { People } from "@mui/icons-material";
import { useDialog } from "../../hooks/useDialog";
import { ParticipantsDialog } from "../dialogs/ParticipantsDialog";
import { useRetroContext } from "../../context/RetroContext";

export default function ParticipantsButton() {
  const { isOpen, openDialog, closeDialog } = useDialog();
  const theme = useTheme();
  const { retroState } = useRetroContext();

  const waitingUsersCount = Object.values(retroState.waitingList).length;

  return (
    <>
      <Button
        variant="text"
        aria-label="Open Participants"
        onClick={openDialog}
        sx={{ marginRight: theme.spacing(1), textTransform: "none", color: "white" }}
        startIcon={
          <>
            <Badge color="error" badgeContent={waitingUsersCount} max={99}>
              <People />
            </Badge>
          </>
        }
      >
        <Typography color="inherit">Participants</Typography>
      </Button>
      <ParticipantsDialog isOpen={isOpen} close={closeDialog} />
    </>
  );
}
