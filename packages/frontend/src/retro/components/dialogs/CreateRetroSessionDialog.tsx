import React, { useState } from "react";
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

import { RetroFormatSelect } from "../RetroFormatSelect";
import { defaultFormat } from "../../config/formatConfig";
import { useUserContext } from "../../../common/context/UserContext";
import { useRetroContext } from "../../context/RetroContext";
import { User } from "../../../common/types/commonTypes";
import { generateId } from "../../../common/utils/generateId";
import { TextInput } from "../../../common/components/TextInput";
import { useValidatedTextInput } from "../../../common/hooks/useValidatedTextInput";
import { useRoomContext } from "../../../common/context/RoomContext";
import { CallToActionButton } from "../../../common/components/buttons/CallToActionButton";
import { useDialog } from "../../../common/hooks/useDialog";
import { useRedirect } from "../../../common/hooks/useRedirect";
import UserNameInputField from "./UsernameInputField";
import useLocalStorageName from "../../hooks/useLocalStorageName";

export function CreateRetroSessionDialog() {
  const { isOpen, closeDialog } = useDialog(true);

  const {
    value: title,
    setValue: setTitle,
    isError: isTitleError,
    setIsError: setIsTitleError,
    handleChange: handleTitleChange,
    isValid: isTitleValid,
  } = useValidatedTextInput({ minLength: 1, maxLength: 40 });
  const {
    value: name,
    setValue: setName,
    isError: isNameError,
    setIsError: setIsNameError,
    handleChange: handleNameChange,
    isValid: isNameValid,
  } = useValidatedTextInput({ minLength: 1, maxLength: 40 });
  const [format, setFormat] = useState(defaultFormat);
  const { redirectBackToHome, redirectToRoom } = useRedirect();
  const { retroState, handleChangeRetroFormat, handleSetRetroState, handleJoinSession } =
    useRetroContext();
  const { user, setUser } = useUserContext();
  const { isStorageAllowed, trySavingNameLocally, handleAllowanceChange } = useLocalStorageName({
    setName,
  });
  const { setRoomId } = useRoomContext();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  function handleClose() {
    setName("");
    setTitle("");
    closeDialog();
    setIsNameError(false);
    setIsTitleError(false);
  }

  function handleSubmit() {
    if (!isNameValid || !isTitleValid || !format || user.id) {
      setIsNameError(!isNameValid);
      setIsTitleError(!isTitleValid);
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
    handleSetRetroState({ ...retroState, title });
    setUser(newUser);
    trySavingNameLocally(name);
    handleJoinSession(newUser);
    handleChangeRetroFormat(format);
    redirectToRoom(roomId);
    handleClose();
  }

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      fullScreen={fullScreen}
      open={isOpen}
      aria-labelledby="form-dialog-create-retro"
    >
      <DialogTitle id="form-dialog-create-retro">Create Retro Session</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Box>
          <UserNameInputField
            userName={name}
            id="user-name"
            onSubmit={handleSubmit}
            onChange={handleNameChange}
            error={isNameError}
            isStorageAllowed={isStorageAllowed}
            onStorageAllowanceChange={(event) => {
              handleAllowanceChange(event.target.checked);
            }}
          />
        </Box>
        <Box>
          <DialogContentText>Please provide a name for this session</DialogContentText>
          <TextInput
            value={title}
            onSubmit={handleSubmit}
            onChange={handleTitleChange}
            error={isTitleError}
            id="retro-name"
            label="Retro Name"
            autoFocus
          />
        </Box>
        <Box>
          <DialogContentText>Please choose a Retro Format</DialogContentText>
          <RetroFormatSelect onFormatChange={setFormat} format={format} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={redirectBackToHome}>Back to Home</Button>
        <CallToActionButton
          onClick={handleSubmit}
          disabled={!isNameValid || !isTitleValid || !format}
        >
          Create
        </CallToActionButton>
      </DialogActions>
    </Dialog>
  );
}
