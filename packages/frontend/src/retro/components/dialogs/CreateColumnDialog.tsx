import React from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import TextInput from "../../../common/components/TextInput";
import { generateId } from "../../../common/utils/generateId";
import { RetroColumn } from "../../types/retroTypes";
import { useValidatedTextInput } from "../../../common/hooks/useValidatedTextInput";
import { useRetroContext } from "../../context/RetroContext";
import { DialogProps } from "../../../common/types/commonTypes";

export function CreateColumnDialog({ isOpen, close }: DialogProps) {
  const {
    value: columnTitle,
    setValue: setColumnTitle,
    isError,
    setIsError,
    handleChange,
    isValid,
  } = useValidatedTextInput({ minLength: 1, maxLength: 40 });
  const { retroState, handleCreateColumn } = useRetroContext();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  function closeDialog() {
    setColumnTitle("");
    setIsError(false);
    close();
  }

  function handleSubmit() {
    if (!isValid) {
      setIsError(true);
      return;
    }

    const id = generateId();
    const index = retroState.columns.length;
    const column: RetroColumn = { id, index, columnTitle, cards: [], isBlurred: false };

    handleCreateColumn(column);
    closeDialog();
  }

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      fullScreen={fullScreen}
      open={isOpen}
      onClose={closeDialog}
      aria-labelledby="new-column-dialog"
    >
      <DialogTitle id="new-column-dialog">Create New Column</DialogTitle>
      <DialogContent>
        <TextInput
          onSubmit={handleSubmit}
          required
          autoFocus
          value={columnTitle}
          onChange={handleChange}
          error={isError}
          id="column-name"
          label="Column Name"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" disabled={!isValid}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
