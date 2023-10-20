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
import { DialogProps, User } from "../../../common/types/commonTypes";
import { TextInput } from "../../../common/components/TextInput";
import { useRouter } from "next/navigation";
import { LocalStorage } from "../../../common/utils/localStorage";
import { useLocalStorage } from "../../../common/hooks/useLocalStorage";
import { CallToActionButton } from "../../../common/components/buttons/CallToActionButton";

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
  const { handleJoinSession } = usePokerContext();
  const { setRoomId } = useRoomContext();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { push } = useRouter();

  useLocalStorage(() => {
    setName(LocalStorage.getUserName());
  });

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
    LocalStorage.setUserName(name);
    handleJoinSession(newUser);
    push(`/poker/${roomId}`);
    handleClose();
  }
  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      fullScreen={fullScreen}
      open={isOpen}
      onClose={handleClose}
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
        <Button onClick={handleClose}>Cancel</Button>
        <CallToActionButton onClick={handleSubmit} disabled={!isValid}>
          Join
        </CallToActionButton>
      </DialogActions>
    </Dialog>
  );
}
