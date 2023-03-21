import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

import RetroFormatSelect from "../RetroFormatSelect";
import { defaultFormat } from "../../config/formatConfig";
import { useUserContext } from "../../../common/context/UserContext";
import { useRetroContext } from "../../context/RetroContext";
import { DialogProps, User } from "../../../common/types/commonTypes";
import { generateId } from "../../../common/utils/generateId";
import TextInput from "../../../common/components/TextInput";
import { useValidatedTextInput } from "../../../common/hooks/useValidatedTextInput";
import { useRoomContext } from "../../../common/context/RoomContext";

export default function CreateRetroSessionDialog({ isOpen, close }: DialogProps) {
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
  const { setRoomId, isAutoAcceptActivated, setIsAutoAcceptActivated } = useRoomContext();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const [isSwitchActive, setIsSwitchActive] = useState(isAutoAcceptActivated);

  function handleClose() {
    setName("");
    setTitle("");
    close();
    setIsNameError(false);
    setIsTitleError(false);
  }

  function toggleChecked() {
    setIsSwitchActive((prevState) => !prevState);
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
    setIsAutoAcceptActivated(isSwitchActive);
    handleSetRetroState({ ...retroState, title });
    setUser(newUser);
    handleJoinSession(newUser);
    handleChangeRetroFormat(format);
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
      aria-labelledby="form-dialog-create-retro"
    >
      <DialogTitle id="form-dialog-create-retro">Create Retro Session</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          <DialogContentText>Please enter your name.</DialogContentText>
          <TextInput
            value={name}
            onSubmit={handleSubmit}
            onChange={handleNameChange}
            error={isNameError}
            id="user-name"
            label="Name"
            autoFocus
          />
        </div>
        <div>
          <DialogContentText>Please provide a name for your new retro.</DialogContentText>
          <TextInput
            value={title}
            onSubmit={handleSubmit}
            onChange={handleTitleChange}
            error={isTitleError}
            id="retro-name"
            label="Retro Name"
          />
        </div>
        <RetroFormatSelect onFormatChange={setFormat} format={format} />
        <FormControlLabel
          control={<Switch checked={isSwitchActive} onChange={toggleChecked} />}
          label="Activate Auto-Accept"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          disabled={!isNameValid || !isTitleValid || !format}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
