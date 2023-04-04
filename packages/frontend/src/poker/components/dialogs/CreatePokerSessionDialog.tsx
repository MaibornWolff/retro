import React, { useState } from "react";
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
import { usePokerContext } from "../../context/PokerContext";
import { useRoomContext } from "../../../common/context/RoomContext";
import { useUserContext } from "../../../common/context/UserContext";
import { useValidatedTextInput } from "../../../common/hooks/useValidatedTextInput";
import { generateId } from "../../../common/utils/generateId";
import { DialogProps, User } from "../../../common/types/commonTypes";
import { TextInput } from "../../../common/components/TextInput";
import { useNavigate } from "react-router-dom";
import { AutoAcceptCheckbox } from "../../../common/components/AutoAcceptCheckbox";

export function CreatePokerSessionDialog({ isOpen, close }: DialogProps) {
  const {
    value: name,
    setValue: setName,
    isError,
    setIsError,
    handleChange,
    isValid,
  } = useValidatedTextInput({ minLength: 1, maxLength: 40 });
  const { user, setUser } = useUserContext();
  const { pokerState, handleJoinSession, handleIsAutoAcceptEnabledChanged } = usePokerContext();
  const { setRoomId } = useRoomContext();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const [isCheckboxActivated, setIsCheckboxActivated] = useState(pokerState.isAutoAcceptEnabled);

  const toggleChecked = () => {
    setIsCheckboxActivated((prev) => !prev);
  };

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
    handleIsAutoAcceptEnabledChanged(isCheckboxActivated);
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
      aria-labelledby="create-session-dialog-title"
    >
      <DialogTitle id="create-session-dialog-title">Create Planning Poker Session</DialogTitle>
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
        <AutoAcceptCheckbox
          isCheckboxActivated={isCheckboxActivated}
          toggleChecked={toggleChecked}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} disabled={!isValid}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
