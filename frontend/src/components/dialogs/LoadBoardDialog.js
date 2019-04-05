import React from "react";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import { fetchGET } from "../../utils";
import {
  Button,
  Fab,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withMobileDialog,
  withStyles,
  Typography
} from "@material-ui/core";

class LoadBoardDialog extends React.Component {
  state = { open: false, boardId: "", error: false };

  handleOpen = () => this.setState({ open: true });

  handleClose = () => this.clearState();

  handleChange = e => this.setState({ boardId: e.target.value });

  handleSubmit = async history => {
    const { boardId } = this.state;
    const { ok } = await fetchGET(`/api/boards/validate/${boardId}`);

    if (ok) {
      history.push(`/boards/${boardId}`);
      this.clearState();
    } else {
      this.setState({ error: true });
    }
  };

  clearState() {
    this.setState({ open: false, boardId: "", error: false });
  }

  renderError() {
    if (this.state.error) {
      return (
        <Typography color="error" variant="subtitle1">
          Invalid Board-ID.
        </Typography>
      );
    }

    return null;
  }

  render() {
    const { open, boardId } = this.state;
    const { classes, fullScreen, history } = this.props;

    return (
      <>
        <Fab
          size="medium"
          variant="extended"
          color="primary"
          onClick={this.handleOpen}
          className={classes.button}
        >
          <ArrowUpwardIcon className={classes.icon} />
          Load Board
        </Fab>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={this.handleClose}
          aria-labelledby="load-board-dialog-title"
        >
          <DialogTitle id="load-board-dialog-title">Load Board</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please provide the Board-ID of your board.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Board-ID"
              type="text"
              value={boardId}
              onChange={this.handleChange}
              fullWidth
              autoComplete="off"
            />
            {this.renderError()}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={() => this.handleSubmit(history)} color="primary">
              Load
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  icon: {
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  }
});

export default compose(
  withRouter,
  withMobileDialog(),
  withStyles(styles)
)(LoadBoardDialog);
