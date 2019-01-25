import React from "react";
import io from "socket.io-client";
import { Grid, Typography, Button, withStyles } from "@material-ui/core";

import CreateColumnDialog from "./dialogs/CreateColumnDialog";
import CreateBoardDialog from "./dialogs/CreateBoardDialog";
import { LOCAL_BACKEND_ENDPOINT } from "../utils";
import { EXPORT_BOARD, UNBLUR_CARDS } from "../events/event-names";

const handleExport = boardId => {
  const socket = io(LOCAL_BACKEND_ENDPOINT);
  const url = window.location.href;
  socket.emit(EXPORT_BOARD, url, boardId);
};

const handleUnblur = boardId => {
  const socket = io(LOCAL_BACKEND_ENDPOINT);
  socket.emit(UNBLUR_CARDS, boardId);
};

const BoardHeader = props => (
  <>
    <Grid container direction="row" justify="space-between">
      <Grid item>
        <Typography variant="h6">{props.title}</Typography>
      </Grid>
      <Grid>
        <CreateBoardDialog />
      </Grid>
    </Grid>
    <Grid container>
      <Grid item className={props.classes.button}>
        <CreateColumnDialog boardId={props.boardId} />
      </Grid>
      <Grid item className={props.classes.button}>
        <Button
          size="small"
          variant="outlined"
          aria-label="Export Board"
          color="primary"
          onClick={() => handleExport(props.boardId)}
        >
          Export Board
        </Button>
      </Grid>
      <Grid item className={props.classes.button}>
        <Button
          size="small"
          variant="outlined"
          aria-label="Unblur Cards"
          color="primary"
          onClick={() => handleUnblur(props.boardId)}
        >
          Unblur Cards
        </Button>
      </Grid>
    </Grid>
  </>
);

const styles = theme => ({
  button: {
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit
  }
});

export default withStyles(styles)(BoardHeader);
