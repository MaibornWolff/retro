import React from "react";
import { Typography } from "@material-ui/core";

function ColumnName(props) {
  const { classes, columnTitle } = props;

  return (
    <Typography className={classes.header} variant="subtitle2">
      {columnTitle}
    </Typography>
  );
}

export default ColumnName;
