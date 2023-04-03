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
import { DialogProps } from "../types/commonTypes";
import { Participants } from "./Participants";
import { UserByUserId } from "../../retro/types/retroTypes";
import { WaitingList } from "./WaitingList";
import { useRoomContext } from "../context/RoomContext";
import { useNamespace } from "../hooks/useNamespace";
import { AutoAcceptSwitch } from "../components/AutoAcceptSwitch";
import { isModerator } from "../utils/participantsUtils";
import { useUserContext } from "../context/UserContext";
import { putIsAutoAcceptActivated } from "../adapter/backendAdapter";

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

  async function toggleSwitch() {
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
      {isModerator(user) && (
        <DialogContent>
          <Typography variant="h5" pb={1}>
            Moderator Options
          </Typography>
          <AutoAcceptSwitch
            isSwitchActivated={isAutoAcceptActivated}
            toggleSwitch={toggleSwitch}
            label={"Automatically accept joining users"}
          />
        </DialogContent>
      )}
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
        {isDividerVisible && <Divider sx={{ my: 2 }} />}
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
      <DialogActions>
        <Button onClick={close}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
