import React from "react";
import { GetApp } from "@mui/icons-material";
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { useUserContext } from "../../../common/context/UserContext";
import { useRetroContext } from "../../context/RetroContext";
import { RetroSchemaV1 } from "../../types/retroSchema";

export default function ExportRetroButton() {
  const { user } = useUserContext();
  const { retroState } = useRetroContext();

  // TODO: handle versions correctly
  function handleExport() {
    const { participants, waitingList, ...exportRetroState } = retroState;
    const exportBoard: RetroSchemaV1 = { ...exportRetroState, version: "1.0.0" };
    const date = new Date();
    const fileName = `retro-${date.toISOString()}.json`;

    const data = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportBoard));
    const downloadAnchorElement = document.createElement("a");
    downloadAnchorElement.setAttribute("href", data);
    downloadAnchorElement.setAttribute("download", fileName);
    downloadAnchorElement.click();
    downloadAnchorElement.remove();
  }

  return (
    <>
      <MenuItem
        aria-label="Export Retro"
        color="primary"
        onClick={handleExport}
        disabled={user.role !== "moderator"}
      >
        <ListItemIcon>
          <GetApp fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Retro Export" />
      </MenuItem>
    </>
  );
}