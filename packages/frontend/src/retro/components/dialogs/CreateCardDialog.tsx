import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

import { RetroCard } from "../../types/retroTypes";
import { useRetroContext } from "../../context/RetroContext";
import { useUserContext } from "../../../common/context/UserContext";
import { generateId } from "../../../common/utils/generateId";
import TextInput from "../../../common/components/TextInput";
import { useValidatedTextInput } from "../../../common/hooks/useValidatedTextInput";
import { DialogProps } from "../../../common/types/commonTypes";
import { useFullscreen } from "../../hooks/useFullscreen";

interface CreateCardDialogProps extends DialogProps {
  columnIndex: number;
}

export default function CreateCardDialog({ isOpen, close, columnIndex }: CreateCardDialogProps) {
  const {
    value: content,
    setValue: setContent,
    isError,
    setIsError,
    handleChange,
    isValid,
  } = useValidatedTextInput();
  const { retroState, handleCreateCard } = useRetroContext();
  const { user } = useUserContext();
  const fullScreen = useFullscreen();

  function handleClose() {
    setContent("");
    setIsError(false);
    close();
  }

  function handleSubmit() {
    if (!isValid) {
      setIsError(true);
      return;
    }
    const id = generateId();
    const column = retroState.columns[columnIndex];
    if (!column) return;
    const card: RetroCard = {
      id,
      owners: [user],
      index: column.cards.length,
      content,
      votes: {},
      isDiscussed: false,
    };
    handleCreateCard({ card, columnIndex });
    handleClose();
  }

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      fullScreen={fullScreen}
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="new-card-dialog"
    >
      <DialogTitle id="new-card-dialog">New Card</DialogTitle>
      <DialogContent>
        <TextInput
          onSubmit={handleSubmit}
          required
          multiline
          autoFocus
          value={content}
          onChange={handleChange}
          error={isError}
          maxRows={Infinity}
          id="content-name"
          label="Content"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="inherit" disabled={!isValid}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
