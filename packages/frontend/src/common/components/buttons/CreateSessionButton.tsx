import React from "react";
import { useUserContext } from "../../context/UserContext";
import { useNamespace } from "../../hooks/useNamespace";
import { CreatePokerSessionDialog } from "../../../poker/components/dialogs/CreatePokerSessionDialog";
import { CreateRetroSessionDialog } from "../../../retro/components/dialogs/CreateRetroSessionDialog";
import { useDialog } from "../../hooks/useDialog";
import { ActionButton } from "./ActionButton";

export function CreateSessionButton() {
  const { isOpen, closeDialog, openDialog } = useDialog(true);
  const { user } = useUserContext();
  const namespace = useNamespace();

  return (
    <>
      {!isOpen && !user.id && (
        <ActionButton onClick={openDialog} label="Create Session" isDisabled={Boolean(user.name)} />
      )}

      {namespace === "poker" && <CreatePokerSessionDialog isOpen={isOpen} close={closeDialog} />}
      {namespace === "retro" && <CreateRetroSessionDialog isOpen={isOpen} close={closeDialog} />}
    </>
  );
}
