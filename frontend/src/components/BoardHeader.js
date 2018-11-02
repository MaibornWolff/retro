import React from "react";
import { Grid, Typography } from "@material-ui/core";

import CreateColumnDialog from "./dialogs/CreateColumnDialog";

const BoardHeader = props => (
  <>
    <Grid item>
      <Typography variant="h6">{props.title}</Typography>
    </Grid>
    <Grid item>
      <CreateColumnDialog boardId={props.boardId} />
    </Grid>
  </>
);

export default BoardHeader;
