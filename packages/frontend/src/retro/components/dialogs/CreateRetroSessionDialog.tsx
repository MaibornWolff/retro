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
import { DialogProps, User } from "../../../common/types/commonTypes";
import { generateId } from "../../../common/utils/generateId";
import { TextInput } from "../../../common/components/TextInput";
import { useValidatedTextInput } from "../../../common/hooks/useValidatedTextInput";
import { useRoomContext } from "../../../common/context/RoomContext";
import { useRouter } from "next/navigation";
import { LocalStorage } from "../../../common/utils/localStorage";
import { useLocalStorage } from "../../../common/hooks/useLocalStorage";
import { CallToActionButton } from "../../../common/components/buttons/CallToActionButton";

export function CreateRetroSessionDialog({ isOpen, close }: DialogProps) {
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
  const { retroState, handleChangeRetroFormat, handleSetRetroState, handleJoinSession } =
    useRetroContext();
  const { user, setUser } = useUserContext();
  const { setRoomId } = useRoomContext();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { push } = useRouter();

  useLocalStorage(() => {
    setName(LocalStorage.getUserName());
  });

  function handleClose() {
    setName("");
    setTitle("");
    close();
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
    LocalStorage.setUserName(name);
    handleJoinSession(newUser);
    handleChangeRetroFormat(format);
    push(`/retro/${roomId}`);
    handleClose();
  }

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      fullScreen={fullScreen}
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="form-dialog-create-retro"
    >
      <DialogTitle id="form-dialog-create-retro">Create Retro Session</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Box>
          <DialogContentText>Please enter your name</DialogContentText>
          <TextInput
            value={name}
            onSubmit={handleSubmit}
            onChange={handleNameChange}
            error={isNameError}
            id="user-name"
            label="Username"
            autoFocus
          />
        </Box>
        <Box>
          <DialogContentText>Please provide your name for this session</DialogContentText>
          <TextInput
            value={title}
            onSubmit={handleSubmit}
            onChange={handleTitleChange}
            error={isTitleError}
            id="retro-name"
            label="Retro Name"
          />
        </Box>
        <Box>
          <DialogContentText>Please choose a Retro Format</DialogContentText>
          <RetroFormatSelect onFormatChange={setFormat} format={format} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
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
