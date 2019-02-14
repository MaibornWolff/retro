import React from "react";
import { Grid, Typography, withStyles } from "@material-ui/core";

import CreateBoardDialog from "./dialogs/CreateBoardDialog";
import SettingsButton from "./buttons/SettingsButton";
import CreateColumnButton from "./buttons/CreateColumnButton";

const BoardHeader = props => (
  <>
    <Grid container direction="row" justify="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h5">{props.title}</Typography>
      </Grid>
      <Grid item>
        <CreateBoardDialog />
        <SettingsButton boardId={props.boardId} />
      </Grid>
    </Grid>
    <Grid container direction="row" alignItems="center">
      <CreateColumnButton
        className={props.classes.button}
        boardId={props.boardId}
      />
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
