import React from "react";
import { useNavigate } from "react-router-dom";
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

import { useUserContext } from "../../../common/context/UserContext";
import { DialogProps, User } from "../../../common/types/commonTypes";
import { generateId } from "../../../common/utils/generateId";
import TextInput from "../../../common/components/TextInput";
import { useValidatedTextInput } from "../../../common/hooks/useValidatedTextInput";
import { useRoomContext } from "../../../common/context/RoomContext";
import { usePokerContext } from "../../context/PokerContext";

export default function CreatePokerDialog({ isOpen, close }: DialogProps) {
  const {
    value: name,
    setValue: setName,
    isError,
    setIsError,
    handleChange,
    isValid,
  } = useValidatedTextInput({ minLength: 1, maxLength: 40 });
  const { handleJoinSession } = usePokerContext();
  const { user, setUser } = useUserContext();
  const { setRoomId } = useRoomContext();
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
      setIsError(!isValid);
      return;
    }
    const roomId = generateId();
    const newUser: User = {
      ...user,
      id: generateId(),
      name,
      role: "moderator",
    };
    setRoomId(roomId);
    setUser(newUser);
    handleJoinSession(newUser);
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
