import React from "react";
import { User } from "../../../common/types/commonTypes";
import { Box, IconButton, Typography } from "@mui/material";
import { AddModerator, LocalPolice, Person, RemoveCircle } from "@mui/icons-material";
import { useUserContext } from "../../../common/context/UserContext";
import { useRetroContext } from "../../context/RetroContext";
import { isModerator } from "../../../common/utils/participantsUtils";
import { useDialog } from "../../hooks/useDialog";
import { TransferModeratorRoleDialog } from "../dialogs/TransferModeratorRoleDialog";

interface ParticipantProps {
  participant: User;
}
export default function Participant({ participant }: ParticipantProps) {
  const { isOpen, openDialog, closeDialog } = useDialog();
  const { handleKickUser } = useRetroContext();
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
              <IconButton
                aria-label="Transfer Moderator Role"
                onClick={openDialog}
                disabled={isModerator(participant)}
              >
                <AddModerator />
              </IconButton>
              <IconButton
                color="error"
                aria-label="Kick user"
                onClick={handleKickUserClick}
                disabled={isModerator(participant)}
              >
                <RemoveCircle />
              </IconButton>
            </>
          )}
        </Box>
      </Box>
      <TransferModeratorRoleDialog participant={participant} isOpen={isOpen} close={closeDialog} />
    </>
  );
}

// 3d24h15min
