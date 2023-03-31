import React from "react";
import { Add } from "@mui/icons-material";
import { RetroColumn } from "../../../types/retroTypes";
import { CreateCardDialog } from "../../dialogs/CreateCardDialog";
import { useDialog } from "../../../../common/hooks/useDialog";
import { TooltipIconButton } from "../../../../common/components/buttons/TooltipIconButton";

interface CreateCardButtonProps {
  column: RetroColumn;
}

export function CreateCardButton({ column }: CreateCardButtonProps) {
  const { isOpen, closeDialog, openDialog } = useDialog();

  return (
    <>
      <TooltipIconButton tooltipText="Add Card" onClick={openDialog}>
        <Add fontSize="small" />
      </TooltipIconButton>
      <CreateCardDialog isOpen={isOpen} close={closeDialog} columnIndex={column.index} />
    </>
  );
}
