import React from "react";
import { IconButton, Menu, Tooltip } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/MoreVert";

import DeleteColumnDialog from "./dialogs/DeleteColumnDialog";
import EditColumnNameDialog from "./dialogs/EditColumnNameDialog";
import SortColumnButton from "./buttons/SortColumnButton";

class ColumnMenu extends React.Component {
  state = {
    anchorEl: null
  };

  handleClick = event => this.setState({ anchorEl: event.currentTarget });

  handleClose = () => this.setState({ anchorEl: null });

  render() {
    const { anchorEl } = this.state;
    const { columnId, boardId, columnTitle, items } = this.props;
    const open = Boolean(anchorEl);

    return (
      <>
        <Tooltip title="Column Actions" aria-label="Column Actions">
          <IconButton
            color="inherit"
            aria-label="Column Menu"
            aria-owns={open ? "column-menu" : undefined}
            aria-haspopup="true"
            onClick={this.handleClick}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Menu
          id="column-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
        >
          <DeleteColumnDialog columnId={columnId} boardId={boardId} />
          <EditColumnNameDialog
            columnId={columnId}
            boardId={boardId}
            columnTitle={columnTitle}
          />
          <SortColumnButton
            columnId={columnId}
            boardId={boardId}
            items={items}
          />
        </Menu>
      </>
    );
  }
}

export default ColumnMenu;
