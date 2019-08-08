import React, { useState, useContext } from "react";
import { IconButton, Menu } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/MoreVert";

import DeleteColumnDialog from "./dialogs/DeleteColumnDialog";
import SortColumnButton from "./buttons/SortColumnButton";
import { ROLE_MODERATOR } from "../utils/userUtils";
import { UserContext } from "../context/UserContext";
import { COLUMN_MENU_BUTTON } from "../constants/testIds";
import EditColumnDialog from "./dialogs/EditColumnDialog";
import EditColumnMenuItem from "./menuItems/EditColumnMenuItem";
import DeleteColumnMenuItem from "./menuItems/DeleteColumnMenuItem";

function ColumnMenu(props) {
  const { columnId, columnTitle, items } = props;
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { userState } = useContext(UserContext);

  const open = Boolean(anchorEl);

  function openMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function closeMenu() {
    setAnchorEl(null);
  }

  function openDeleteDialog() {
    setDeleteDialogOpen(true);
    closeMenu();
  }

  function closeDeleteDialog() {
    setDeleteDialogOpen(false);
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
        <DeleteColumnMenuItem openDialog={openDeleteDialog} />
        <EditColumnMenuItem openDialog={openEditDialog} />
        <SortColumnButton columnId={columnId} items={items} />
      </Menu>
      <DeleteColumnDialog
        isOpen={isDeleteDialogOpen}
        closeDialog={closeDeleteDialog}
        columnId={columnId}
      />
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
