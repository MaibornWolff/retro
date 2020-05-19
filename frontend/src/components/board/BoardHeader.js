import React from "react";
import { Grid, Typography } from "@material-ui/core";

import CreateColumnButton from "../columns/CreateColumnButton";

export default function BoardHeader(props) {
  const { title } = props;

  return (
    <>
      <Grid container direction="row" justify="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h5">{title}</Typography>
        </Grid>
        <Grid item>
          <CreateColumnButton />
        </Grid>
      </Grid>
    </>
  );
}
