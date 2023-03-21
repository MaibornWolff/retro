import React from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  FormControlLabel,
  Switch,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { isEmpty } from "lodash";
import { DialogProps } from "../types/commonTypes";
import Participants from "./Participants";
import { UserByUserId } from "../../retro/types/retroTypes";
import { WaitingList } from "./WaitingList";
import { useRoomContext } from "../context/RoomContext";
import { useUserContext } from "../context/UserContext";
import { isModerator } from "../utils/participantsUtils";
import { putIsAutoAcceptActivated } from "../adapter/backendAdapter";
import { useNamespace } from "../hooks/useNamespace";

interface ParticipantDialogProps extends DialogProps {
  participants: UserByUserId;
  waitingList: UserByUserId;
  onKickUser: (userId: string) => void;
  onRejectJoinUser: (userId: string) => void;
  onAcceptJoinUser: (userId: string) => void;
  onTransferModeratorRole: (userId: string) => void;
}

export function ParticipantsDialog({
  isOpen,
  close,
  onKickUser,
  onRejectJoinUser,
  onAcceptJoinUser,
  onTransferModeratorRole,
  participants,
  waitingList,
}: ParticipantDialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { isAutoAcceptActivated, setIsAutoAcceptActivated, roomId } = useRoomContext();
  const namespace = useNamespace();
  const isDividerVisible = !isEmpty(waitingList) && !isEmpty(participants);
  const { user } = useUserContext();

  async function toggleChecked() {
    const toggledValue = !isAutoAcceptActivated;
    setIsAutoAcceptActivated(toggledValue);
    await putIsAutoAcceptActivated({ roomId, namespace, isActivated: toggledValue });
  }

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
              handleAcceptJoinUser={onAcceptJoinUser}
              handleRejectJoinUser={onRejectJoinUser}
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
              handleKickUser={onKickUser}
              handleTransferModeratorRole={onTransferModeratorRole}
            />
          </>
        )}
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-between" }}>
        {isModerator(user) && (
          <FormControlLabel
            labelPlacement="start"
            control={<Switch checked={isAutoAcceptActivated} onChange={toggleChecked} />}
            label="Auto-Accept"
          />
        )}
        <Button onClick={close} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
