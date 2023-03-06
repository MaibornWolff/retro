import React from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Typography,
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
      <DialogContent>
        {!isEmpty(waitingList) && (
          <>
            <Typography variant={"h5"} pb={1}>
              Waiting for approval
            </Typography>
            <WaitingList
              waitingList={waitingList}
              handleAcceptJoinUser={handleAcceptJoinUser}
              handleRejectJoinUser={handleRejectJoinUser}
            />
          </>
        )}
        {isDividerVisible && <Divider sx={{ marginY: 2 }} />}
        {!isEmpty(participants) && (
          <>
            <Typography variant={"h5"} pb={1}>
              Participants
            </Typography>
            <Participants
              participants={participants}
              handleKickUser={handleKickUser}
              handleTransferModeratorRole={handleTransferModeratorRole}
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={close} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
