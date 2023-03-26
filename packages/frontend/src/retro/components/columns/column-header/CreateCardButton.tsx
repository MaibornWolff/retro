import React from "react";
import { Add } from "@mui/icons-material";
import { RetroColumn } from "../../../types/retroTypes";
import { CreateCardDialog } from "../../dialogs/CreateCardDialog";
import { TooltipIconButton } from "../../../../common/TooltipIconButton";
import { useDialog } from "../../../../common/hooks/useDialog";

interface CreateCardButtonProps {
  column: RetroColumn;
}

export function CreateCardButton({ column }: CreateCardButtonProps) {
  const { isOpen, closeDialog, openDialog } = useDialog();

  return (
    <>
      <TooltipIconButton tooltipText="Create Card" onClick={openDialog}>
        <Add fontSize="small" />
      </TooltipIconButton>
      <CreateCardDialog isOpen={isOpen} close={closeDialog} columnIndex={column.index} />
    </>
  );
}
