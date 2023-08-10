import React from "react";
import { PhotoCamera } from "@mui/icons-material";
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { useUserContext } from "../../../common/context/UserContext";
import { useExportRetroContext } from "../../context/ExportRetroContext";
import { isModerator } from "../../../common/utils/participantsUtils";
import { isClientSide } from "../../../common/utils/isClientSide";

export function ExportRetroImageMenuItem() {
  const { user } = useUserContext();
  const { boardRef } = useExportRetroContext();

  async function handleExport() {
    if (!isClientSide()) return;
    const date = new Date();
    const fileName = `retro-${date.toISOString()}.png`;

    await import("react-component-export-image").then(({ exportComponentAsPNG }) => {
      void exportComponentAsPNG(boardRef, { fileName });
    });
  }

  return (
    <>
      <MenuItem aria-label="Export Retro" onClick={handleExport} disabled={!isModerator(user)}>
        <ListItemIcon>
          <PhotoCamera fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Image Export" />
      </MenuItem>
    </>
  );
}
