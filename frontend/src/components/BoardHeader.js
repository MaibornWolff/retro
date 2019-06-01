import React, { useContext } from "react";
import { Grid, Typography, withStyles } from "@material-ui/core";

import NameInput from "./NameInput";
import CreateColumnButton from "./buttons/CreateColumnButton";
import UnblurCardsButton from "./buttons/UnblurCardsButton";
import ExportBoardButton from "./buttons/ExportBoardButton";
import ShowQrCodeButton from "./buttons/ShowQrCodeButton";
import VoteCountButton from "./buttons/VoteCountButton";
import { BoardContext } from "./context/BoardContext";

const styles = theme => ({
  button: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    "& button": {
      width: "100%"
    }
  }
});

// TODO: line 50
function BoardHeader(props) {
  const { title, maxVoteCount, classes } = props;
  const boardId = useContext(BoardContext);

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
          <NameInput />
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="center"
      >
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
        <Grid item xs={12} sm={3}>
          <ShowQrCodeButton className={props.classes.button} />
        </Grid>
      </Grid>
    </>
  );
}

export default withStyles(styles)(BoardHeader);
