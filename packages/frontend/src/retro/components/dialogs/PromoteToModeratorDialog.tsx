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

interface PromoteToModeratorDialogProps extends DialogProps {
  participant: User;
  handlePromoteToModerator: (userId: string) => void;
}

export function PromoteToModeratorDialog({
  isOpen,
  close,
  participant,
  handlePromoteToModerator,
}: PromoteToModeratorDialogProps) {
  const { user } = useUserContext();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  function handlePromoteToModeratorClick() {
    if (!isModerator(user) || isModerator(participant)) return;
    handlePromoteToModerator(participant.id);
    close();
  }

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      fullScreen={fullScreen}
      open={isOpen}
      onClose={close}
      aria-labelledby="promote-to-moderator-dialog"
    >
      <DialogTitle id="promote-to-moderator-dialog">Promote to moderator</DialogTitle>
      <DialogContent>
        <Typography>
          Do you really want promote <strong> {participant.name} </strong> to moderator?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        <CallToActionButton onClick={handlePromoteToModeratorClick}>
          Yes, promote
        </CallToActionButton>
      </DialogActions>
    </Dialog>
  );
}
