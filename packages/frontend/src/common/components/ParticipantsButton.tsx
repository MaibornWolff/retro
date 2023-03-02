import React from "react";
import { Badge, Button, Typography, useTheme } from "@mui/material";
import { People } from "@mui/icons-material";
import { useDialog } from "../../retro/hooks/useDialog";
import { ParticipantsDialog } from "./ParticipantsDialog";
import { UserByUserId } from "../../retro/types/retroTypes";

interface ParticipantButtonProps {
  participants: UserByUserId;
  waitingList: UserByUserId;
  handleKickUser: (userId: string) => void;
  handleRejectJoinUser: (userId: string) => void;
  handleAcceptJoinUser: (userId: string) => void;
  handleTransferModeratorRole: (userId: string) => void;
}

export default function ParticipantsButton({
  participants,
  waitingList,
  handleKickUser,
  handleRejectJoinUser,
  handleAcceptJoinUser,
  handleTransferModeratorRole,
}: ParticipantButtonProps) {
  const { isOpen, openDialog, closeDialog } = useDialog();
  const theme = useTheme();

  const waitingUsersCount = Object.values(waitingList).length;

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
      <ParticipantsDialog
        isOpen={isOpen}
        close={closeDialog}
        participants={participants}
        waitingList={waitingList}
        handleKickUser={handleKickUser}
        handleAcceptJoinUser={handleAcceptJoinUser}
        handleRejectJoinUser={handleRejectJoinUser}
        handleTransferModeratorRole={handleTransferModeratorRole}
      />
    </>
  );
}
