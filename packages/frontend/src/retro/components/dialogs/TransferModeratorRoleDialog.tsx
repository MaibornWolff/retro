import React from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { DialogProps, User } from "../../../common/types/commonTypes";
import { useUserContext } from "../../../common/context/UserContext";
import { isModerator } from "../../../common/utils/participantsUtils";
import { CallToActionButton } from "../../../common/components/buttons/CallToActionButton";

interface TransferModeratorRoleDialogProps extends DialogProps {
  participant: User;
  handleTransferModeratorRole: (userId: string) => void;
}

export function TransferModeratorRoleDialog({
  isOpen,
  close,
  participant,
  handleTransferModeratorRole,
}: TransferModeratorRoleDialogProps) {
  const { user } = useUserContext();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  function handleTransferModeratorRoleClick() {
    if (!isModerator(user) || isModerator(participant)) return;
    handleTransferModeratorRole(participant.id);
    close();
  }

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      fullScreen={fullScreen}
      open={isOpen}
      onClose={close}
      aria-labelledby="transfer-moderator-role-dialog"
    >
      <DialogTitle id="transfer-moderator-role-dialog">Transfer moderator role</DialogTitle>
      <DialogContent>
        <Typography>
          Do you really want to lose your moderator role and transfer it to
          <strong> {participant.name}</strong>?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        <CallToActionButton onClick={handleTransferModeratorRoleClick}>
          Yes, transfer
        </CallToActionButton>
      </DialogActions>
    </Dialog>
  );
}
