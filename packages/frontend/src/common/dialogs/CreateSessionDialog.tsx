import React from "react";
import { useNamespace } from "../hooks/useNamespace";
import { CreatePokerSessionDialog } from "../../poker/components/dialogs/CreatePokerSessionDialog";
import { CreateRetroSessionDialog } from "../../retro/components/dialogs/CreateRetroSessionDialog";

export function CreateSessionDialog() {
  const namespace = useNamespace();

  return (
    <>
      {namespace === "poker" && <CreatePokerSessionDialog />}
      {namespace === "retro" && <CreateRetroSessionDialog />}
    </>
  );
}
