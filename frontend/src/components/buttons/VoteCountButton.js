import React from "react";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import {
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  withMobileDialog
} from "@material-ui/core";

class VoteCountButton extends React.Component {
  state = { open: false };

  openDialog = () => this.setState({ open: true });

  closeDialog = () => this.setState({ open: false });

  render() {
    const { open } = this.state;
    const { boardId, className, fullScreen } = this.props;

    return (
      <>
        <Grid item className={className}>
          <Button
            size="small"
            variant="outlined"
            aria-label="Vote Count"
            color="primary"
            onClick={this.openDialog}
          >
            <ThumbUpIcon style={{ marginRight: 5 }} />
            Vote Count
          </Button>
          <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={this.closeDialog}
            aria-labelledby="vote-count-dialog"
          >
            <DialogTitle id="vote-count-dialog">
              Set Maximum Vote Count
            </DialogTitle>
            <DialogContent>
              <DialogContentText>Some Content</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.closeDialog} color="primary">
                Cancel
              </Button>
              <Button onClick={this.closeDialog} color="primary">
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </>
    );
  }
}

export default withMobileDialog()(VoteCountButton);
