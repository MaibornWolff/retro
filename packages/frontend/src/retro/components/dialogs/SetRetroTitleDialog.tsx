import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { DialogProps } from "../../../common/types/commonTypes";
import { TextInput } from "../../../common/components/TextInput";
import { useFullscreen } from "../../hooks/useFullscreen";
import { useValidatedTextInput } from "../../../common/hooks/useValidatedTextInput";
import { CallToActionButton } from "../../../common/components/buttons/CallToActionButton";
import { useRetroContext } from "../../context/RetroContext";

export function SetRetroTitleDialog({ isOpen, close }: DialogProps) {
  const { handleSetRetroState, retroState } = useRetroContext();
  const fullScreen = useFullscreen();
  const {
    value: retroTitle,
    setValue: setRetroTitle,
    isError: isRetroTitleError,
    setIsError: setIsRetroTitleError,
    handleChange: handleRetroTitleChange,
    isValid: isRetroTitleValid,
  } = useValidatedTextInput({
    minLength: 1,
    maxLength: 40,
    initialValue: retroState.title,
  });

  function closeDialog() {
    close();
    setRetroTitle(retroState.title);
    setIsRetroTitleError(false);
  }

  function handleSubmit() {
    if (!isRetroTitleValid) {
      setIsRetroTitleError(true);
      return;
    }

    handleSetRetroState({ ...retroState, title: retroTitle });
    closeDialog();
  }

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      fullScreen={fullScreen}
      open={isOpen}
      onClose={closeDialog}
      aria-labelledby="set-retro-title-dialog-title"
    >
      <DialogTitle id="set-retro-title-dialog-title">Set a retro title</DialogTitle>
      <DialogContent>
        <TextInput
          required
          autoFocus
          value={retroTitle}
          onChange={handleRetroTitleChange}
          onSubmit={handleSubmit}
          error={isRetroTitleError}
          id="retro-title"
          label="Retro title"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>Cancel</Button>
        <CallToActionButton onClick={handleSubmit} disabled={!isRetroTitleValid}>
          Set retro title
        </CallToActionButton>
      </DialogActions>
    </Dialog>
  );
}
