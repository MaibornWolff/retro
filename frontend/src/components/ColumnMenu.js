import React, { useState, useContext } from "react";
import { IconButton, Menu } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/MoreVert";

import DeleteColumnDialog from "./dialogs/DeleteColumnDialog";
import EditColumnNameDialog from "./dialogs/EditColumnNameDialog";
import SortColumnButton from "./buttons/SortColumnButton";
import { ROLE_MODERATOR } from "../utils/userUtils";
import { UserContext } from "../context/UserContext";

function ColumnMenu(props) {
  const { columnId, columnTitle, items } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const { userState } = useContext(UserContext);

  const open = Boolean(anchorEl);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="Column Menu"
        aria-owns={open ? "column-menu" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        disabled={userState.role !== ROLE_MODERATOR}
      >
        <MenuIcon fontSize="small" />
      </IconButton>
      <Menu
        id="column-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <DeleteColumnDialog columnId={columnId} />
        <EditColumnNameDialog columnId={columnId} columnTitle={columnTitle} />
        <SortColumnButton columnId={columnId} items={items} />
      </Menu>
    </>
  );
}

export default ColumnMenu;
