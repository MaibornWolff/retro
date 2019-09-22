import React, { useState, useContext } from "react";
import MenuIcon from "@material-ui/icons/MoreVert";
import { IconButton, Menu } from "@material-ui/core";

import SortColumnButton from "./buttons/menuItems/SortColumnButton";
import EditColumnDialog from "./dialogs/EditColumnDialog";
import EditColumnMenuItem from "./buttons/menuItems/EditColumnMenuItem";
import DeleteColumnMenuItem from "./buttons/menuItems/DeleteColumnMenuItem";
import { UserContext } from "../context/UserContext";
import { DialogsContext } from "../context/DialogsContext";
import { ROLE_MODERATOR } from "../utils/userUtils";
import { COLUMN_MENU_BUTTON } from "../constants/testIds";

function ColumnMenu(props) {
  const { columnId, columnTitle, items } = props;
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { userState } = useContext(UserContext);
  const { openDeleteColumnDialog } = useContext(DialogsContext);

  const open = Boolean(anchorEl);

  function openMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function closeMenu() {
    setAnchorEl(null);
  }

  function openEditDialog() {
    setEditDialogOpen(true);
    closeMenu();
  }

  function closeEditDialog() {
    setEditDialogOpen(false);
  }

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="Column Menu"
        aria-owns={open ? "column-menu" : undefined}
        aria-haspopup="true"
        onClick={openMenu}
        disabled={userState.role !== ROLE_MODERATOR}
        data-testid={COLUMN_MENU_BUTTON + `__${columnTitle}`}
      >
        <MenuIcon fontSize="small" />
      </IconButton>
      <Menu
        id="column-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={closeMenu}
      >
        <DeleteColumnMenuItem
          openDialog={() => {
            openDeleteColumnDialog(columnId);
            closeMenu();
          }}
        />
        <EditColumnMenuItem openDialog={openEditDialog} />
        <SortColumnButton columnId={columnId} items={items} />
      </Menu>
      <EditColumnDialog
        isOpen={isEditDialogOpen}
        closeDialog={closeEditDialog}
        columnId={columnId}
        columnTitle={columnTitle}
      />
    </>
  );
}

export default ColumnMenu;
