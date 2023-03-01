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
import TextInput from "../../../common/components/TextInput";
import React from "react";
import { DialogProps, User } from "../../../common/types/commonTypes";
import { useValidatedTextInput } from "../../../common/hooks/useValidatedTextInput";
import { useRoomContext } from "../../../common/context/RoomContext";
import { useUserContext } from "../../../common/context/UserContext";
import { useNavigate } from "react-router-dom";
import { generateId } from "../../../common/utils/generateId";
import { usePokerContext } from "../../context/PokerContext";

interface JoinPokerDialogProps extends DialogProps {
  roomId: string;
}

export default function JoinPokerDialog({ isOpen, close, roomId }: JoinPokerDialogProps) {
  const { handleAddToWaitingList } = usePokerContext();
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
  const navigate = useNavigate();

  function handleClose() {
    setName("");
    close();
    setIsError(false);
  }

  function handleSubmit() {
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
    handleAddToWaitingList({ userId: newUser.id, userName: name });
    navigate(`/poker/${roomId}`);
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
