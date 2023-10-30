import React from "react";
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
import { User } from "../../../common/types/commonTypes";
import { TextInput } from "../../../common/components/TextInput";
import { LocalStorage } from "../../../common/utils/localStorage";
import { useLocalStorage } from "../../../common/hooks/useLocalStorage";
import { CallToActionButton } from "../../../common/components/buttons/CallToActionButton";
import { useDialog } from "../../../common/hooks/useDialog";
import { useRedirect } from "../../../common/hooks/useRedirect";

export function CreatePokerSessionDialog() {
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
  const { user, setUser } = useUserContext();
  const { handleJoinSession } = usePokerContext();
  const { setRoomId } = useRoomContext();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useLocalStorage(() => {
    setName(LocalStorage.getUserName());
  });

  function handleClose() {
    setName("");
    closeDialog();
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
    LocalStorage.setUserName(name);
    handleJoinSession(newUser);
    redirectToRoom(roomId);
    handleClose();
  }
  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      fullScreen={fullScreen}
      open={isOpen}
      aria-labelledby="join-session-dialog-title"
    >
      <DialogTitle id="join-session-dialog-title">Create Planning Poker Session</DialogTitle>
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
          Create
        </CallToActionButton>
      </DialogActions>
    </Dialog>
  );
}
