import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

import ColumnName from "./ColumnName";
import ColumnMenu from "./ColumnMenu";
import CreateItemButton from "../../items/CreateItemButton";

const useStyles = makeStyles((theme) => ({
  header: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
  },
}));

export default function ColumnHeader(props) {
  const { columnTitle, columnId, items } = props;
  const classes = useStyles();

  return (
    <div>
      <Grid className={classes.header} container direction="row" justify="space-between">
        <Grid item>
          <ColumnName classes={classes} columnTitle={columnTitle} />
        </Grid>
        <Grid item>
          <CreateItemButton columnId={columnId} />
          <ColumnMenu columnId={columnId} columnTitle={columnTitle} items={items} />
        </Grid>
      </Grid>
    </div>
  );
}
