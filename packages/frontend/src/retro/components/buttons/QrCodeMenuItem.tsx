import React from "react";
import { CropFree } from "@mui/icons-material";
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { useDialog } from "../../../common/hooks/useDialog";
import { QrCodeDialog } from "../dialogs/QrCodeDialog";

export function QrCodeMenuItem() {
  const { isOpen, openDialog, closeDialog } = useDialog();

  return (
    <>
      <MenuItem aria-label="QR Code" onClick={openDialog}>
        <ListItemIcon>
          <CropFree fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="QR Code" />
      </MenuItem>
      <QrCodeDialog isOpen={isOpen} close={closeDialog} />
    </>
  );
}
