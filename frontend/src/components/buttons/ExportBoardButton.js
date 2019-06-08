import React from "react";
import { Grid } from "@material-ui/core";
import ExportBoardDialog from "../dialogs/ExportBoardDialog";

function ExportBoardButton(props) {
  const { className } = props;

  return (
    <>
      <Grid item className={className}>
        <ExportBoardDialog />
      </Grid>
    </>
  );
}

export default ExportBoardButton;
