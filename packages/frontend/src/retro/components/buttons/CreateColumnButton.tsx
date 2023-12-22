import React from "react";
import { Add } from "@mui/icons-material";
import { useUserContext } from "../../../common/context/UserContext";
import { CreateColumnDialog } from "../dialogs/CreateColumnDialog";
import { isModerator } from "../../../common/utils/participantsUtils";
import { useDialog } from "../../../common/hooks/useDialog";
import { ActionButton } from "../../../common/components/buttons/ActionButton";

export function CreateColumnButton() {
  const { isOpen, openDialog, closeDialog } = useDialog();
  const { user } = useUserContext();
  if (!isModerator(user)) return null;

  return (
    <>
      <ActionButton onClick={openDialog} disabled={!isModerator(user)} icon={<Add />}>
        Add Column
      </ActionButton>
      <CreateColumnDialog isOpen={isOpen} close={closeDialog} />
    </>
  );
}
