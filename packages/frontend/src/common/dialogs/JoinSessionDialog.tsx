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
import React from "react";
import { useValidatedTextInput } from "../hooks/useValidatedTextInput";
import { useRoomContext } from "../context/RoomContext";
import { useUserContext } from "../context/UserContext";
import { DialogProps, User } from "../types/commonTypes";
import { generateId } from "../utils/generateId";
import { getRoomConfiguration } from "../adapter/backendAdapter";
import { useNamespace } from "../hooks/useNamespace";
import { TextInput } from "../components/TextInput";
import { useErrorContext } from "../context/ErrorContext";

interface JoinSessionDialogProps extends DialogProps {
  roomId: string;
  onAddToWaitingList: ({ userId, userName }: { userId: string; userName: string }) => void;
  navigateToRoom: () => void;
  isAutoAcceptEnabled: boolean;
}

export function JoinSessionDialog({
  isOpen,
  close,
  roomId,
  onAddToWaitingList,
  navigateToRoom,
  isAutoAcceptEnabled,
}: JoinSessionDialogProps) {
  const {
    value: name,
    setValue: setName,
    isError,
    setIsError,
    handleChange,
    isValid,
  } = useValidatedTextInput({ minLength: 1, maxLength: 40 });
  const { setError } = useErrorContext();
  const { setRoomId } = useRoomContext();
  const { user, setUser } = useUserContext();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const namespace = useNamespace();

  function handleClose() {
    setName("");
    close();
    setIsError(false);
  }

  async function handleSubmit() {
    const roomConfiguration = await getRoomConfiguration({ roomId, namespace });
    if (!roomConfiguration) {
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
    if (!isAutoAcceptEnabled) {
      onAddToWaitingList({ userId: newUser.id, userName: name });
    }
    navigateToRoom();
    handleClose();
  }

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      fullScreen={fullScreen}
      open={isOpen}
      onClose={handleClose}
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
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} disabled={!isValid}>
          Join
        </Button>
      </DialogActions>
    </Dialog>
  );
}
