import React, { useEffect } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useRetroContext } from "../../context/RetroContext";
import { TextInput } from "../../../common/components/TextInput";
import { useValidatedTextInput } from "../../../common/hooks/useValidatedTextInput";
import { RetroColumn } from "../../types/retroTypes";
import { DialogProps } from "../../../common/types/commonTypes";
import { useFullscreen } from "../../hooks/useFullscreen";

interface EditColumnDialogProps extends DialogProps {
  column: RetroColumn;
}

export function EditColumnDialog({ isOpen, close, column }: EditColumnDialogProps) {
  const {
    value: title,
    setValue: setTitle,
    isError,
    setIsError,
    handleChange,
    isValid,
  } = useValidatedTextInput({ minLength: 1, maxLength: 40 });
  const { handleEditColumn } = useRetroContext();
  const fullScreen = useFullscreen();

  useEffect(() => {
    setTitle(column.columnTitle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [column.columnTitle]);

  function handleEdit() {
    if (!isValid) {
      setIsError(true);
      return;
    }
    handleEditColumn({ columnIndex: column.index, title });
    close();
  }

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      fullScreen={fullScreen}
      open={isOpen}
      onClose={close}
      aria-labelledby="edit-column-dialog"
    >
      <DialogTitle id="edit-column-dialog">Edit Column</DialogTitle>
      <DialogContent>
        <TextInput
          onSubmit={handleEdit}
          required
          autoFocus
          value={title}
          onChange={handleChange}
          error={isError}
          id="col-name-input-edit"
          label="Column Name"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        <Button onClick={handleEdit} disabled={!isValid}>
          Edit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
