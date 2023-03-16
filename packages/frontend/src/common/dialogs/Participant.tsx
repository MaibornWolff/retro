import React from "react";
import { Box, Typography } from "@mui/material";
import { AddModerator, LocalPolice, Person, RemoveCircle } from "@mui/icons-material";
import { TransferModeratorRoleDialog } from "../../retro/components/dialogs/TransferModeratorRoleDialog";
import { isModerator } from "../utils/participantsUtils";
import { useUserContext } from "../context/UserContext";
import { useDialog } from "../../retro/hooks/useDialog";
import { User } from "../types/commonTypes";
import { TooltipIconButton } from "../TooltipIconButton";

interface ParticipantProps {
  participant: User;
  handleKickUser: (userId: string) => void;
  handleTransferModeratorRole: (userId: string) => void;
}
export function Participant({
  participant,
  handleKickUser,
  handleTransferModeratorRole,
}: ParticipantProps) {
  const { isOpen, openDialog, closeDialog } = useDialog();

  const { user } = useUserContext();

  function handleKickUserClick() {
    if (!isModerator(user) || isModerator(participant)) return;
    handleKickUser(participant.id);
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          minHeight: "40px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {isModerator(participant) ? <LocalPolice /> : <Person />}
          <Typography>{participant.name}</Typography>
        </Box>
        <Box>
          {isModerator(user) && (
            <>
              <TooltipIconButton
                aria-label="Transfer Moderator Role"
                onClick={openDialog}
                disabled={isModerator(participant)}
                tooltipText="Transfer Moderator Role"
              >
                <AddModerator />
              </TooltipIconButton>
              <TooltipIconButton
                color="error"
                aria-label="Kick User"
                onClick={handleKickUserClick}
                disabled={isModerator(participant)}
                tooltipText="Kick User"
              >
                <RemoveCircle />
              </TooltipIconButton>
            </>
          )}
        </Box>
      </Box>
      <TransferModeratorRoleDialog
        participant={participant}
        isOpen={isOpen}
        close={closeDialog}
        handleTransferModeratorRole={handleTransferModeratorRole}
      />
    </>
  );
}
