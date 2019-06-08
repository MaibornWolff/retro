import React from "react";
import { Grid, Typography, withStyles } from "@material-ui/core";

import NameInput from "./NameInput";
import CreateColumnButton from "./buttons/CreateColumnButton";
import UnblurCardsButton from "./buttons/UnblurCardsButton";
import ExportBoardButton from "./buttons/ExportBoardButton";
import ShowQrCodeButton from "./buttons/ShowQrCodeButton";
import VoteCountButton from "./buttons/VoteCountButton";

const styles = theme => ({
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    "& button": {
      width: "100%"
    }
  },
  buttonGroup: {
    marginTop: theme.spacing(1)
  }
});

function BoardHeader(props) {
  const { title, classes } = props;

  return (
    <>
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
      >
        <Grid item xs={12} sm={6} md={9}>
          <Typography variant="h5">{title}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <NameInput />
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
        className={classes.buttonGroup}
      >
        <Grid item xs={12} sm={2}>
          <CreateColumnButton className={classes.button} />
        </Grid>
        <Grid item xs={12} sm={2}>
          <UnblurCardsButton className={classes.button} />
        </Grid>
        <Grid item xs={12} sm={2}>
          <ExportBoardButton className={classes.button} />
        </Grid>
        <Grid item xs={12} sm={2}>
          <VoteCountButton className={classes.button} />
        </Grid>
        <Grid item xs={12} sm={2}>
          <ShowQrCodeButton className={classes.button} />
        </Grid>
        <Grid item xs={12} sm={2} />
      </Grid>
    </>
  );
}

export default withStyles(styles)(BoardHeader);
