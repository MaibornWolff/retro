import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, makeStyles } from "@material-ui/core";

import ShareSessionButton from "../../common/ShareSessionButton";
import CreateColumnButton from "./CreateColumnButton";
import SettingsButton from "./SettingsButton";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  bar: {
    backgroundColor: theme.palette.primary.main,
  },
  brand: {
    flexGrow: 1,
    fontFamily: "Permanent Marker, cursive",
  },
  link: {
    textDecoration: "none",
    color: theme.palette.primary.contrastText,
  },
}));

export default function AppHeader() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.bar} position="static">
        <Toolbar>
          <Typography variant="h4" color="inherit" className={classes.brand}>
            <Link to="/" className={classes.link}>
              Retro
            </Link>
          </Typography>
          <ShareSessionButton />
          <CreateColumnButton />
          <SettingsButton />
        </Toolbar>
      </AppBar>
    </div>
  );
}
