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
import TextInput from "./TextInput";
import { roomIdExists } from "../adapter/backendAdapter";
import { useNamespace } from "../hooks/useNamespace";

interface JoinSessionDialogProps extends DialogProps {
  roomId: string;
  handleAddToWaitingList: ({ userId, userName }: { userId: string; userName: string }) => void;
  navigateToRoom: () => void;
}

export default function JoinSessionDialog({
  isOpen,
  close,
  roomId,
  handleAddToWaitingList,
  navigateToRoom,
}: JoinSessionDialogProps) {
  const {
    value: name,
    setValue: setName,
    isError,
    setIsError,
    handleChange,
    isValid,
  } = useValidatedTextInput({ minLength: 1, maxLength: 40 });
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
    const roomExists = await roomIdExists({ roomId, namespace });
    if (!isValid || user.id || !roomExists) {
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
    handleAddToWaitingList({ userId: newUser.id, userName: name });
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
      <DialogTitle id="join-poker-dialog-title">Join Poker Session</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please provide a name, so that your team can recognize your estimation.
        </DialogContentText>
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
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" disabled={!isValid}>
          Join
        </Button>
      </DialogActions>
    </Dialog>
  );
}
