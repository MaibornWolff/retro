import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Switch,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { usePokerContext } from "../../context/PokerContext";
import { useRoomContext } from "../../../common/context/RoomContext";
import { useUserContext } from "../../../common/context/UserContext";
import { useValidatedTextInput } from "../../../common/hooks/useValidatedTextInput";
import { generateId } from "../../../common/utils/generateId";
import { DialogProps, User } from "../../../common/types/commonTypes";
import TextInput from "../../../common/components/TextInput";
import { useNavigate } from "react-router-dom";

export default function CreatePokerSessionDialog({ isOpen, close }: DialogProps) {
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
  const { setRoomId, isAutoAcceptActivated, setIsAutoAcceptActivated } = useRoomContext();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const [isSwitchActivated, setIsSwitchActivated] = useState(isAutoAcceptActivated);

  const toggleChecked = () => {
    setIsSwitchActivated((prev) => !prev);
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
    const roomId = generateId();
    const newUser: User = {
      ...user,
      id: generateId(),
      name,
      role: "moderator",
    };
    setRoomId(roomId);
    setIsAutoAcceptActivated(isSwitchActivated);
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
      <DialogTitle id="create-session-dialog-title">Create Session</DialogTitle>
      <DialogContent>
        <div>
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
        </div>
        <div style={{ marginTop: "1rem" }}>
          <DialogContentText>Automatically accept all joining users</DialogContentText>
          <FormControlLabel
            labelPlacement="start"
            control={<Switch checked={isSwitchActivated} onChange={toggleChecked} />}
            label="Auto-Accept"
            sx={{ justifyContent: "flex-end", marginLeft: 0 }}
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
