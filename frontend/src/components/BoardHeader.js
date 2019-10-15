import React from "react";
import { Grid, Typography, withStyles } from "@material-ui/core";

import NameInput from "./NameInput";
import CreateColumnButton from "./buttons/boardHeader/CreateColumnButton";
import UnblurCardsButton from "./buttons/boardHeader/UnblurCardsButton";
import ExportBoardButton from "./buttons/boardHeader/ExportBoardButton";
import QrCodeButton from "./buttons/boardHeader/QrCodeButton";
import VoteCountButton from "./buttons/boardHeader/VoteCountButton";

const styles = theme => ({
  buttonGroup: {
    marginTop: theme.spacing(1)
  }
});

function BoardHeader(props) {
  const { title, classes } = props;

  return (
    <>
      <Grid container direction="row" justify="space-around" alignItems="center">
        <Grid item xs={12} sm={6} md={9}>
          <Typography variant="h5">{title}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <NameInput />
        </Grid>
      </Grid>
      <Grid container direction="row" spacing={1} className={classes.buttonGroup}>
        <Grid item xs={12} sm={2}>
          <CreateColumnButton />
        </Grid>
        <Grid item xs={12} sm={2}>
          <UnblurCardsButton />
        </Grid>
        <Grid item xs={12} sm={2}>
          <ExportBoardButton />
        </Grid>
        <Grid item xs={12} sm={2}>
          <VoteCountButton />
        </Grid>
        <Grid item xs={12} sm={2}>
          <QrCodeButton />
        </Grid>
        <Grid item xs={12} sm={2} />
      </Grid>
    </>
  );
}

export default withStyles(styles)(BoardHeader);
