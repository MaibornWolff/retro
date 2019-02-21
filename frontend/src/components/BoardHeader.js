import React from "react";
import { Grid, Typography, withStyles } from "@material-ui/core";

import CreateBoardDialog from "./dialogs/CreateBoardDialog";
import CreateColumnButton from "./buttons/CreateColumnButton";
import UnblurCardsButton from "./buttons/UnblurCardsButton";
import VoteCountButton from "./buttons/VoteCountButton";
import ExportBoardButton from "./buttons/ExportBoardButton";

const BoardHeader = props => (
  <>
    <Grid container direction="row" justify="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h5">{props.title}</Typography>
      </Grid>
      <Grid item>
        <CreateBoardDialog />
      </Grid>
    </Grid>
    <Grid container direction="row" alignItems="center">
      <CreateColumnButton
        className={props.classes.button}
        boardId={props.boardId}
      />

      <UnblurCardsButton
        className={props.classes.button}
        boardId={props.boardId}
      />

      <VoteCountButton
        className={props.classes.button}
        boardId={props.boardId}
      />

      <ExportBoardButton
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
