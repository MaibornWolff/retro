import React from "react";
import { Badge, Button, Typography } from "@mui/material";
import { People } from "@mui/icons-material";
import { UserByUserId } from "../../../retro/types/retroTypes";
import { useDialog } from "../../hooks/useDialog";
import { ParticipantsDialog } from "../../dialogs/ParticipantsDialog";

interface ParticipantButtonProps {
  participants: UserByUserId;
  waitingList: UserByUserId;
  handleKickUser: (userId: string) => void;
  onRejectJoinUser: (userId: string) => void;
  onAcceptJoinUser: (userId: string) => void;
  onTransferModeratorRole: (userId: string) => void;
}

export function ParticipantsButton({
  participants,
  waitingList,
  handleKickUser,
  onRejectJoinUser,
  onAcceptJoinUser,
  onTransferModeratorRole,
}: ParticipantButtonProps) {
  const { isOpen, openDialog, closeDialog } = useDialog();
  const waitingUsersCount = Object.values(waitingList).length;

  return (
    <>
      <Button
        variant="text"
        aria-label="Open Participants"
        onClick={openDialog}
        sx={{ mr: 1, textTransform: "none" }}
        startIcon={
          <>
            <Badge color="error" badgeContent={waitingUsersCount} max={99}>
              <People />
            </Badge>
          </>
        }
      >
        <Typography>Participants</Typography>
      </Button>
      <ParticipantsDialog
        isOpen={isOpen}
        close={closeDialog}
        participants={participants}
        waitingList={waitingList}
        onKickUser={handleKickUser}
        onAcceptJoinUser={onAcceptJoinUser}
        onRejectJoinUser={onRejectJoinUser}
        onTransferModeratorRole={onTransferModeratorRole}
      />
    </>
  );
}
