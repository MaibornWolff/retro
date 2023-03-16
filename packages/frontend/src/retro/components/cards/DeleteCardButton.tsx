import React from "react";
import { Delete } from "@mui/icons-material";
import { IconButtonProps } from "@mui/material";
import { RetroCard } from "../../types/retroTypes";
import { useIsPrivileged } from "../../hooks/useIsPrivileged";
import { CardActionButton } from "./CardActionButton";
import { useDialog } from "../../hooks/useDialog";
import { DeleteCardDialog } from "../dialogs/DeleteCardDialog";

interface DeleteItemButtonProps extends IconButtonProps {
  card: RetroCard;
  columnIndex: number;
}

export function DeleteCardButton({ card, columnIndex, ...props }: DeleteItemButtonProps) {
  const { isOpen, openDialog, closeDialog } = useDialog();
  const isPrivileged = useIsPrivileged(card);

  if (!isPrivileged) return null;

  function handleOpenDeleteCardDialog() {
    if (!isPrivileged) return;
    openDialog();
  }

  return (
    <>
      <CardActionButton
        tooltipText={"Delete Card"}
        onClick={handleOpenDeleteCardDialog}
        disabled={(props.disabled ?? false) || !isPrivileged}
      >
        <Delete color="error" />
      </CardActionButton>
      <DeleteCardDialog
        isOpen={isOpen}
        close={closeDialog}
        columnIndex={columnIndex}
        cardIndex={card.index}
      />
    </>
  );
}
