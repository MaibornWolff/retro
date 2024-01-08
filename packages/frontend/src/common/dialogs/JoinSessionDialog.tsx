import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { useValidatedTextInput } from "../hooks/useValidatedTextInput";
import { useRoomContext } from "../context/RoomContext";
import { useUserContext } from "../context/UserContext";
import { User } from "../types/commonTypes";
import { generateId } from "../utils/generateId";

import { useBackendAdapter } from "../adapter/backendAdapter";
import { useNamespace } from "../hooks/useNamespace";
import { useErrorContext } from "../context/ErrorContext";
import { CallToActionButton } from "../components/buttons/CallToActionButton";
import { useDialog } from "../hooks/useDialog";
import { useRedirect } from "../hooks/useRedirect";
import { useRoomIdFromPath } from "../hooks/useRoomIdFromPath";
import UserNameInputField from "../../retro/components/dialogs/UsernameInputField";
import useLocalStorageName from "../../retro/hooks/useLocalStorageName";

interface JoinSessionDialogProps {
  onAddToWaitingList: ({ userId, userName }: { userId: string; userName: string }) => void;
}

export function JoinSessionDialog({ onAddToWaitingList }: JoinSessionDialogProps) {
  const { isOpen, closeDialog } = useDialog(true);
  const {
    value: name,
    setValue: setName,
    isError,
    setIsError,
    handleChange,
    isValid,
  } = useValidatedTextInput({ minLength: 1, maxLength: 40 });
  const { isStorageAllowed, saveNameLocally, handleAllowanceChange } = useLocalStorageName({
    setName,
  });
  const { redirectBackToHome, redirectToRoom } = useRedirect();
  const { setError } = useErrorContext();
  const { setRoomId } = useRoomContext();
  const roomId = useRoomIdFromPath();
  const { user, setUser } = useUserContext();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const namespace = useNamespace();
  const { roomIdExists } = useBackendAdapter();

  function handleClose() {
    setName("");
    closeDialog();
    setIsError(false);
  }

  function handleStorageAllowanceChange() {}

  async function handleSubmit() {
    const roomExists = await roomIdExists({ roomId, namespace });
    if (!roomExists || !roomId) {
      setError({ type: "ROOM_NOT_FOUND" });
      return;
    }
    if (!isValid || user.id) {
      setIsError(true);
      return;
    }

    const newUser: User = {
      ...user,
      id: generateId(),
      name,
      role: "participant",
    };
    setRoomId(roomId);
    setUser(newUser);
    saveNameLocally(name);
    onAddToWaitingList({ userId: newUser.id, userName: name });
    redirectToRoom(roomId);
    handleClose();
  }

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      fullScreen={fullScreen}
      open={isOpen}
      aria-labelledby="join-poker-dialog-title"
    >
      <DialogTitle id="join-poker-dialog-title">Join Session</DialogTitle>
      <DialogContent>
        <UserNameInputField
          userName={name}
          label="Please provide your name for this session"
          onSubmit={handleSubmit}
          onChange={handleChange}
          isError={isError}
          isStorageAllowed={isStorageAllowed}
          storagePermissionLabel="Allow local username storage"
          onStorageAllowanceChange={(event) => {
            handleAllowanceChange(event.target.checked);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={redirectBackToHome}>Back to Home</Button>
        <CallToActionButton onClick={handleSubmit} disabled={!isValid}>
          Join
        </CallToActionButton>
      </DialogActions>
    </Dialog>
  );
}
