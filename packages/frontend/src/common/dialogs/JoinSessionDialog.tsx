import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useValidatedTextInput } from "../hooks/useValidatedTextInput";
import { useRoomContext } from "../context/RoomContext";
import { useUserContext } from "../context/UserContext";
import { User } from "../types/commonTypes";
import { generateId } from "../utils/generateId";

import { useBackendAdapter } from "../adapter/backendAdapter";
import { useNamespace } from "../hooks/useNamespace";
import { TextInput } from "../components/TextInput";
import { useErrorContext } from "../context/ErrorContext";
import { LocalStorage } from "../utils/localStorage";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { CallToActionButton } from "../components/buttons/CallToActionButton";
import { useDialog } from "../hooks/useDialog";
import { useRedirect } from "../hooks/useRedirect";
import { useRoomIdFromPath } from "../hooks/useRoomIdFromPath";

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
  const { redirectBackToHome, redirectToRoom } = useRedirect();
  const { setError } = useErrorContext();
  const { setRoomId } = useRoomContext();
  const roomId = useRoomIdFromPath();
  const { user, setUser } = useUserContext();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const namespace = useNamespace();
  const { roomIdExists } = useBackendAdapter();
  const [isRoomIdReady, setIsRoomIdReady] = useState(false);
  const isRoomExistend = roomIdExists({ roomId, namespace }).then((response) => {
    setIsRoomIdReady(response);
  });

  useEffect(() => {
    console.log("Rooms is Ready!", isRoomExistend);
  }, [isRoomIdReady]);
  useLocalStorage(() => {
    setName(LocalStorage.getUserName());
  });

  function handleClose() {
    setName("");
    closeDialog();
    setIsError(false);
  }

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
    LocalStorage.setUserName(name);
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
        <DialogContentText>Please provide your name for this session</DialogContentText>
        <TextInput
          onSubmit={handleSubmit}
          required
          autoFocus
          fullWidth
          value={name}
          onChange={handleChange}
          error={isError}
          id="user-name"
          label="Name"
          type="text"
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
