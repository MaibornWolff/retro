import React from "react";
import { Grid } from "@material-ui/core";

import CreateColumnDialog from "../dialogs/CreateColumnDialog";

const CreateColumnButton = props => (
  <>
    <Grid item className={props.className}>
      <CreateColumnDialog boardId={props.boardId} />
    </Grid>
  </>
);

export default CreateColumnButton;
