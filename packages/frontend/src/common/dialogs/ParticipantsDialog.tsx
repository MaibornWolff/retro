import React, { useState } from "react";

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
import { DialogProps } from "../types/commonTypes";
import { Participants } from "./Participants";
import { UserByUserId } from "../../retro/types/retroTypes";
import { WaitingList } from "./WaitingList";
import { useRoomContext } from "../context/RoomContext";
import { putIsAutoAcceptActivated } from "../adapter/backendAdapter";
import { useNamespace } from "../hooks/useNamespace";
import { AutoAcceptSwitch } from "../components/AutoAcceptSwitch";

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
  const [isSwitchDisabled, setIsSwitchDisabled] = useState(false);

  async function toggleChecked() {
    setIsSwitchDisabled(true);
    const toggledValue = !isAutoAcceptActivated;
    setIsAutoAcceptActivated(toggledValue);
    await putIsAutoAcceptActivated({ roomId, namespace, isActivated: toggledValue });
    setIsSwitchDisabled(false);
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
            <Typography variant="h5" pb={1}>
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
            <Typography variant="h5" pb={1}>
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
        <AutoAcceptSwitch
          isSwitchActivated={isAutoAcceptActivated}
          toggleChecked={toggleChecked}
          isDisabled={isSwitchDisabled}
        />
        <Button onClick={close}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
