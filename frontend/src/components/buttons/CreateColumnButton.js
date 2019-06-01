import React from "react";
import { Grid } from "@material-ui/core";

import CreateColumnDialog from "../dialogs/CreateColumnDialog";

function CreateColumnButton(props) {
  const { className } = props;

  return (
    <>
      <Grid item className={className}>
        <CreateColumnDialog />
      </Grid>
    </>
  );
}

export default CreateColumnButton;
