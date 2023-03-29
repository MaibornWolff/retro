import React from "react";
import { Box, Typography } from "@mui/material";
import { AddModerator, LocalPolice, Person, RemoveCircle } from "@mui/icons-material";
import { TransferModeratorRoleDialog } from "../../retro/components/dialogs/TransferModeratorRoleDialog";
import { isModerator } from "../utils/participantsUtils";
import { useUserContext } from "../context/UserContext";
import { User } from "../types/commonTypes";
import { useDialog } from "../hooks/useDialog";
import { FlexBox } from "../components/FlexBox";
import { TooltipIconButton } from "../components/buttons/TooltipIconButton";

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
      <FlexBox alignItems="center" justifyContent="space-between" minHeight={5}>
        <FlexBox gap={2} alignItems="center" mb={1}>
          {isModerator(participant) ? <LocalPolice /> : <Person />}
          <Typography>{participant.name}</Typography>
        </FlexBox>
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
      </FlexBox>
      <TransferModeratorRoleDialog
        participant={participant}
        isOpen={isOpen}
        close={closeDialog}
        handleTransferModeratorRole={handleTransferModeratorRole}
      />
    </>
  );
}
