import React from "react";
import { Grid, withStyles } from "@material-ui/core";

import ColumnName from "./ColumnName";
import ColumnMenu from "./ColumnMenu";
import CreateItemDialog from "./dialogs/CreateItemDialog";

const styles = theme => ({
  header: {
    padding: theme.spacing(1),
    backgroundColor: "#44777e",
    color: "#fff"
  }
});

function ColumnHeader(props) {
  const { classes, columnTitle, columnId, items } = props;

  return (
    <>
      <Grid
        className={classes.header}
        container
        direction="row"
        justify="space-between"
      >
        <Grid item>
          <ColumnName classes={classes} columnTitle={columnTitle} />
        </Grid>
        <Grid item>
          <CreateItemDialog columnId={columnId} />
          <ColumnMenu
            columnId={columnId}
            columnTitle={columnTitle}
            items={items}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default withStyles(styles)(ColumnHeader);
