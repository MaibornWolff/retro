import React from "react";
import {
  Box,
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
import { PokerUnitInput } from "../PokerUnitInput";
import { usePokerUnit } from "../../hooks/usePokerUnit";

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
  const { pokerUnit, unitRange, handleUnitChange, handleFibRangeChange } = usePokerUnit();
  const { redirectBackToHome, redirectToRoom } = useRedirect();
  const { user, setUser } = useUserContext();
  const { handleJoinSession, handleSetPokerUnit } = usePokerContext();
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
    handleSetPokerUnit({ unitType: pokerUnit, unitRangeHigh: unitRange });
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
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Box>
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
        </Box>
        <Box>
          <DialogContentText>Choose a vote unit</DialogContentText>
          <PokerUnitInput
            pokerUnit={pokerUnit}
            unitRange={unitRange}
            onFibRangeChange={handleFibRangeChange}
            onUnitChange={handleUnitChange}
          />
        </Box>
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
