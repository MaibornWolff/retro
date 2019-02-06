import React from "react";
import { Grid, Button } from "@material-ui/core";

const endpoint = "/api/boards/export/";
const port = "8081";
const exportURL = `http://${window.location.hostname}:${port}${endpoint}`;

const ExportBoardButton = props => (
  <>
    <Grid item className={props.className}>
      <Button
        size="small"
        variant="contained"
        aria-label="Export Board"
        color="primary"
        href={exportURL + props.boardId}
      >
        Export Board
      </Button>
    </Grid>
  </>
);

export default ExportBoardButton;
