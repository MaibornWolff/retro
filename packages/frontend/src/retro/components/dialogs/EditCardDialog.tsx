import React, { useEffect } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useRetroContext } from "../../context/RetroContext";
import { useValidatedTextInput } from "../../../common/hooks/useValidatedTextInput";
import { TextInput } from "../../../common/components/TextInput";
import { RetroCard } from "../../types/retroTypes";
import { DialogProps } from "../../../common/types/commonTypes";
import { useFullscreen } from "../../hooks/useFullscreen";

interface EditCardDialogProps extends DialogProps {
  card: RetroCard;
  columnIndex: number;
}

export function EditCardDialog({ isOpen, close, card, columnIndex }: EditCardDialogProps) {
  const {
    value: content,
    setValue: setContent,
    isError,
    setIsError,
    isValid,
    handleChange,
  } = useValidatedTextInput({ minLength: 1, maxLength: 100000 });
  const { handleEditCard } = useRetroContext();
  const fullScreen = useFullscreen();

  useEffect(() => {
    setContent(card.content);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [card.content]);

  function handleSave() {
    if (!isValid) {
      setIsError(true);
      return;
    }

    handleEditCard({
      cardContent: content,
      columnIndex,
      cardIndex: card.index,
    });
    close();
  }

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      fullScreen={fullScreen}
      open={isOpen}
      onClose={close}
      aria-labelledby="edit-card-dialog"
    >
      <DialogTitle id="edit-card-dialog">Edit Card</DialogTitle>
      <DialogContent>
        <TextInput
          onSubmit={handleSave}
          autoFocus
          required
          multiline
          value={content}
          onChange={handleChange}
          error={isError}
          maxRows={Infinity}
          id="content-name"
          label="Content"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        <Button onClick={handleSave} disabled={!isValid}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
