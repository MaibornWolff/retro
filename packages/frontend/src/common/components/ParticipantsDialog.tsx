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
import { UserByUserId } from "../../retro/types/retroTypes";

interface ParticipantDialogProps extends DialogProps {
  participants: UserByUserId;
  waitingList: UserByUserId;
  handleKickUser: (userId: string) => void;
  handleRejectJoinUser: (userId: string) => void;
  handleAcceptJoinUser: (userId: string) => void;
  handleTransferModeratorRole: (userId: string) => void;
}

export function ParticipantsDialog({
  isOpen,
  close,
  handleKickUser,
  handleRejectJoinUser,
  handleAcceptJoinUser,
  handleTransferModeratorRole,
  participants,
  waitingList,
}: ParticipantDialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const isDividerVisible = !isEmpty(waitingList) && !isEmpty(participants);

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
      {!isEmpty(waitingList) && (
        <>
          <DialogTitle id="participants-dialog">Waiting for approval</DialogTitle>
          <DialogContent>
            <WaitingList
              waitingList={waitingList}
              handleAcceptJoinUser={handleAcceptJoinUser}
              handleRejectJoinUser={handleRejectJoinUser}
            />
          </DialogContent>
        </>
      )}
      {isDividerVisible && <Divider />}
      {!isEmpty(participants) && (
        <>
          <DialogTitle id="participants-dialog">Participants</DialogTitle>
          <DialogContent>
            <Participants
              participants={participants}
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
