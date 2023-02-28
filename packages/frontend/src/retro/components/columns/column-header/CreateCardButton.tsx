import React from "react";
import { Add } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { RetroColumn } from "../../../types/retroTypes";
import CreateCardDialog from "../../dialogs/CreateCardDialog";
import { useDialog } from "../../../hooks/useDialog";

interface CreateCardButtonProps {
  column: RetroColumn;
}

export default function CreateCardButton({ column }: CreateCardButtonProps) {
  const { isOpen, closeDialog, openDialog } = useDialog();

  return (
    <>
      <IconButton color="inherit" onClick={openDialog}>
        <Add fontSize="small" />
      </IconButton>
      <CreateCardDialog isOpen={isOpen} close={closeDialog} columnIndex={column.index} />
    </>
  );
}
