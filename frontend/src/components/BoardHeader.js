import React from "react";
import { Grid, Typography } from "@material-ui/core";

import CreateColumnButton from "./CreateColumnButton";

const BoardHeader = props => (
  <>
    <Grid item>
      <Typography variant="h6">{props.title}</Typography>
    </Grid>
    <Grid item>
      <CreateColumnButton boardId={props.boardId} />
    </Grid>
  </>
);

export default BoardHeader;
