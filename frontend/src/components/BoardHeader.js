import React from "react";
import io from "socket.io-client";
import { Grid, Typography, Button, withStyles } from "@material-ui/core";

import CreateColumnDialog from "./dialogs/CreateColumnDialog";
import { LOCAL_BACKEND_ENDPOINT } from "../utils";
import { EXPORT_BOARD } from "../events/event-names";

const handleExport = boardId => {
  const socket = io(LOCAL_BACKEND_ENDPOINT);
  const url = window.location.href;
  socket.emit(EXPORT_BOARD, url, boardId);
};

const BoardHeader = props => (
  <>
    <Grid item>
      <Typography variant="h6">{props.title}</Typography>
    </Grid>
    <Grid container>
      <Grid item className={props.classes.button}>
        <CreateColumnDialog boardId={props.boardId} />
      </Grid>
      <Grid item className={props.classes.button}>
        <Button
          size="small"
          variant="outlined"
          aria-label="Add Column"
          color="primary"
          onClick={() => handleExport(props.boardId)}
        >
          Export
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
