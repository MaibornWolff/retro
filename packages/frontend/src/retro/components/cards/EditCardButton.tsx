import React from "react";
import { Edit } from "@mui/icons-material";
import { IconButtonProps } from "@mui/material";
import { RetroCard } from "../../types/retroTypes";
import { useIsPrivileged } from "../../hooks/useIsPrivileged";
import { CardActionButton } from "./CardActionButton";
import { EditCardDialog } from "../dialogs/EditCardDialog";
import { useDialog } from "../../../common/hooks/useDialog";

interface EditCardButtonProps extends IconButtonProps {
  card: RetroCard;
  columnIndex: number;
}

export function EditCardButton({ columnIndex, card, ...props }: EditCardButtonProps) {
  const { isOpen, closeDialog, openDialog } = useDialog();
  const isPrivileged = useIsPrivileged(card);

  if (!isPrivileged) return null;

  function handleOpenEditCardDialog() {
    if (!isPrivileged) return;
    openDialog();
  }

  return (
    <>
      <CardActionButton
        {...props}
        tooltipText="Edit Card"
        onClick={handleOpenEditCardDialog}
        disabled={(props.disabled ?? false) || !isPrivileged}
      >
        <Edit />
      </CardActionButton>
      <EditCardDialog isOpen={isOpen} close={closeDialog} card={card} columnIndex={columnIndex} />
    </>
  );
}
