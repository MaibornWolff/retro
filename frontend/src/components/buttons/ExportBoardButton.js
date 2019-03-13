import React from "react";
import { Grid } from "@material-ui/core";
import ExportBoardDialog from "../dialogs/ExportBoardDialog";

const ExportBoardButton = props => (
  <>
    <Grid item className={props.className}>
      <ExportBoardDialog />
    </Grid>
  </>
);

export default ExportBoardButton;
