import React from "react";
import { Typography } from "@material-ui/core";

class ColumnName extends React.PureComponent {
  render() {
    const { classes, columnTitle } = this.props;

    return (
      <Typography className={classes.header} variant="subtitle2">
        {columnTitle}
      </Typography>
    );
  }
}

export default ColumnName;
