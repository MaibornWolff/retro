import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, makeStyles } from "@material-ui/core";

import ToggleThemeButton from "../../common/ToggleThemeButton";
import ShareSessionButton from "../../common/ShareSessionButton";
import CreateColumnButton from "./CreateColumnButton";
import SettingsButton from "./SettingsButton";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  bar: {
    backgroundColor: theme.palette.secondary.main,
  },
  brand: {
    flexGrow: 1,
    fontFamily: "Permanent Marker, cursive",
  },
  link: {
    textDecoration: "none",
    color: "white",
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
          <ToggleThemeButton />
          <ShareSessionButton />
          <CreateColumnButton />
          <SettingsButton />
        </Toolbar>
      </AppBar>
    </div>
  );
}
