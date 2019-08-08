import React from "react";
import { Grid } from "@material-ui/core";
import QrCodeDialog from "../dialogs/QrCodeDialog";

function ShowQrCodeButton(props) {
  const { className } = props;

  return (
    <>
      <Grid item className={className}>
        <QrCodeDialog />
      </Grid>
    </>
  );
}

export default ShowQrCodeButton;
