import React from "react";
import { Grid } from "@material-ui/core";
import QrCodeDialog from "../dialogs/QrCodeDialog";

const ShowQrCodeButton = props => (
  <>
    <Grid item className={props.className}>
      <QrCodeDialog />
    </Grid>
  </>
);

export default ShowQrCodeButton;
