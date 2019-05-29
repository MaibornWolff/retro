import React from "react";
import { Grid, Typography, withStyles } from "@material-ui/core";

import NameInput from "./NameInput";
import CreateColumnButton from "./buttons/CreateColumnButton";
import UnblurCardsButton from "./buttons/UnblurCardsButton";
import ExportBoardButton from "./buttons/ExportBoardButton";
import VoteCountButton from "./buttons/VoteCountButton";

const BoardHeader = props => {
  const { classes, boardId, title, maxVoteCount } = props;

  return (
    <>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item xs={12} sm={6} md={9}>
          <Typography variant="h4">{title}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <NameInput boardId={boardId} />
        </Grid>
        <Grid item xs={12} sm={3}>
          <CreateColumnButton className={classes.button} boardId={boardId} />
        </Grid>
        <Grid item xs={12} sm={3}>
          <UnblurCardsButton className={classes.button} boardId={boardId} />
        </Grid>
        <Grid item xs={12} sm={3}>
          <ExportBoardButton className={classes.button} boardId={boardId} />
        </Grid>
        <Grid item xs={12} sm={3}>
          <VoteCountButton
            className={classes.button}
            boardId={boardId}
            maxVoteCount={maxVoteCount}
          />
        </Grid>
      </Grid>
      <Grid container direction="row" alignItems="center">
        
      </Grid>
    </>
  );
};

const styles = theme => ({
  button: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    '& button': {
      width: '100%'
    }
  }
});

export default withStyles(styles)(BoardHeader);
