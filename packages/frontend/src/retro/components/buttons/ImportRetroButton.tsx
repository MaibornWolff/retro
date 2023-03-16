import React, { ChangeEvent, useRef } from "react";
import { Publish } from "@mui/icons-material";
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { useUserContext } from "../../../common/context/UserContext";
import { RetroSchemaV1 } from "../../types/retroSchema";
import { RetroState } from "../../types/retroTypes";
import { useRetroContext } from "../../context/RetroContext";
import { isModerator } from "../../../common/utils/participantsUtils";

export default function ImportRetroButton() {
  const inputFile = useRef<HTMLInputElement>(null);
  const { user } = useUserContext();
  const { handleSetRetroState } = useRetroContext();

  function openFileBrowser() {
    inputFile.current?.click();
  }

  // TODO: add proper error handling
  async function handleFileImport(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const [file] = event.target.files ?? [];
    if (!file) return;

    const retroJson = await file.text();
    const importedRetro: RetroSchemaV1 = JSON.parse(retroJson);
    const retro: RetroState = {
      ...importedRetro,
      participants: {},
      waitingList: {},
      isAutoAllowActivated: false,
    };
    handleSetRetroState(retro);
  }

  return (
    <>
      <MenuItem
        aria-label="Import Retro"
        color="primary"
        onClick={openFileBrowser}
        disabled={!isModerator(user)}
      >
        <ListItemIcon>
          <Publish fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Retro Import" />
      </MenuItem>
      <input
        type="file"
        id="file"
        ref={inputFile}
        style={{ display: "none" }}
        onChange={handleFileImport}
      />
    </>
  );
}
