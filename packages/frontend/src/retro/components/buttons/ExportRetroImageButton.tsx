import React from "react";
import { exportComponentAsPNG } from "react-component-export-image";
import { PhotoCamera } from "@mui/icons-material";
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { useUserContext } from "../../../common/context/UserContext";
import { useExportRetroContext } from "../../context/ExportRetroContext";
import { isModerator } from "../../../common/utils/participantsUtils";

export default function ExportRetroImageButton() {
  const { user } = useUserContext();
  const { boardRef } = useExportRetroContext();

  async function handleExport() {
    const date = new Date();
    const fileName = `retro-${date.toISOString()}.png`;
    await exportComponentAsPNG(boardRef, { fileName });
  }

  return (
    <>
      <MenuItem
        aria-label="Export Retro"
        color="primary"
        onClick={handleExport}
        disabled={!isModerator(user)}
      >
        <ListItemIcon>
          <PhotoCamera fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Image Export" />
      </MenuItem>
    </>
  );
}
