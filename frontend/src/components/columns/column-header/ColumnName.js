import React from "react";

import { Typography } from "@material-ui/core";
import { COLUMN_NAME } from "../../../constants/testIds";

function ColumnName(props) {
  const { classes, columnTitle } = props;

  return (
    <Typography className={classes.header} variant="subtitle2" data-testid={COLUMN_NAME}>
      {columnTitle}
    </Typography>
  );
}

export default ColumnName;
