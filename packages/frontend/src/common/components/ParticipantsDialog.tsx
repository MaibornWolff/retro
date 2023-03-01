import React from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { isEmpty } from "lodash";
import { WaitingList } from "./WaitingList";
import { DialogProps } from "../types/commonTypes";
import Participants from "./Participants";
import { RetroState } from "../../retro/types/retroTypes";
import { PokerState } from "../../poker/types/pokerTypes";

interface ParticipantDialogProps extends DialogProps {
  state: RetroState | PokerState;
  handleKickUser: (userId: string) => void;
  handleRejectJoinUser: (userId: string) => void;
  handleAcceptJoinUser: (userId: string) => void;
  handleTransferModeratorRole: (userId: string) => void;
}

export function ParticipantsDialog({
  isOpen,
  close,
  state,
  handleKickUser,
  handleRejectJoinUser,
  handleAcceptJoinUser,
  handleTransferModeratorRole,
}: ParticipantDialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const isDividerVisible = !isEmpty(state.waitingList) && !isEmpty(state.participants);

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      fullScreen={fullScreen}
      open={isOpen}
      onClose={close}
      aria-labelledby="participants-dialog"
      PaperProps={{
        sx: {
          maxHeight: "60%",
        },
      }}
    >
      {!isEmpty(state.waitingList) && (
        <>
          <DialogTitle id="participants-dialog">Waiting for approval</DialogTitle>
          <DialogContent>
            <WaitingList
              state={state}
              handleAcceptJoinUser={handleAcceptJoinUser}
              handleRejectJoinUser={handleRejectJoinUser}
            />
          </DialogContent>
        </>
      )}
      {isDividerVisible && <Divider />}
      {!isEmpty(state.participants) && (
        <>
          <DialogTitle id="participants-dialog">Participants</DialogTitle>
          <DialogContent>
            <Participants
              state={state}
              handleKickUser={handleKickUser}
              handleTransferModeratorRole={handleTransferModeratorRole}
            />
          </DialogContent>
        </>
      )}
      <DialogActions>
        <Button onClick={close} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
