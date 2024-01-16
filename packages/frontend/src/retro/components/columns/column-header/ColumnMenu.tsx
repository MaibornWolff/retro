import React, { useState } from "react";
import { MoreVert } from "@mui/icons-material";
import { IconButton, Menu } from "@mui/material";

import { SortColumnMenuItem } from "./SortColumnMenuItem";
import { EditColumnMenuItem } from "./EditColumnMenuItem";
import { DeleteColumnMenuItem } from "./DeleteColumnMenuItem";
import { BlurColumnMenuItem } from "./BlurColumnMenuItem";
import { RetroColumn } from "../../../types/retroTypes";
import { useUserContext } from "../../../../common/context/UserContext";
import { isModerator } from "../../../../common/utils/participantsUtils";

interface ColumnMenuProps {
  column: RetroColumn;
}

export function ColumnMenu({ column }: ColumnMenuProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement>();
  const { user } = useUserContext();

  if (!isModerator(user)) return null;

  function openMenu(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    setAnchorEl(event.currentTarget);
  }

  function closeMenu() {
    setAnchorEl(undefined);
  }

  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton
        aria-label="Column Menu"
        aria-owns={open ? "column-menu" : undefined}
        aria-haspopup="true"
        onClick={openMenu}
      >
        <MoreVert fontSize="small" />
      </IconButton>
      <Menu
        keepMounted
        id="column-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={closeMenu}
        onClick={closeMenu}
      >
        <DeleteColumnMenuItem columnIndex={column.index} />
        <EditColumnMenuItem column={column} />
        <SortColumnMenuItem column={column} />
        <BlurColumnMenuItem column={column} />
      </Menu>
    </>
  );
}
