import React from "react";
import { Grid, Typography, withStyles } from "@material-ui/core";

import CreateBoardDialog from "./dialogs/CreateBoardDialog";
import Settings from "./Settings";
import CreateColumnButton from "./buttons/CreateColumnButton";
import ExportBoardButton from "./buttons/ExportBoardButton";
import UnblurCardsButton from "./buttons/UnblurCardsButton";

const BoardHeader = props => (
  <>
    <Grid container direction="row" justify="space-between">
      <Grid item>
        <Typography variant="h6">{props.title}</Typography>
      </Grid>
      <Grid>
        <CreateBoardDialog />
        <Settings boardId={props.boardId} />
      </Grid>
    </Grid>
    <Grid container>
      <CreateColumnButton
        className={props.classes.button}
        boardId={props.boardId}
      />

      <ExportBoardButton
        className={props.classes.button}
        boardId={props.boardId}
      />

      <UnblurCardsButton
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
