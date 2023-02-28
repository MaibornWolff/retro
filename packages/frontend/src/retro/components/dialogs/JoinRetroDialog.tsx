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
import { useRetroContext } from "../../context/RetroContext";

interface JoinRetroDialogProps extends DialogProps {
  roomId: string;
}

export default function JoinRetroDialog({ isOpen, close, roomId }: JoinRetroDialogProps) {
  const { handleAddToWaitingList } = useRetroContext();
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
    navigate(`/retro/${roomId}`);
    handleClose();
  }

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      fullScreen={fullScreen}
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="form-dialog-join-retro"
    >
      <DialogTitle id="form-dialog-join-retro">Join Retro Session</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          <DialogContentText>Please enter your name.</DialogContentText>
          <TextInput
            onSubmit={handleSubmit}
            required
            autoFocus
            value={name}
            onChange={handleChange}
            error={isError}
            id="user-name"
            label="Name"
          />
        </div>
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
