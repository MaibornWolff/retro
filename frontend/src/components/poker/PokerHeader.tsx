import React from "react";
import { Link } from "react-router-dom";
import { AppBar, makeStyles, Toolbar, Typography } from "@material-ui/core";

import ToggleThemeButton from "../common/ToggleThemeButton";
import ShareSessionButton from "../common/ShareSessionButton";
import PokerSettingsButton from "./PokerSettingsButton";

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

export default function PokerHeader() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.bar} position="static">
        <Toolbar>
          <Typography variant="h4" color="inherit" className={classes.brand}>
            <Link to="/" className={classes.link}>
              Planning Poker
            </Link>
          </Typography>
          <ToggleThemeButton />
          <ShareSessionButton />
          <PokerSettingsButton />
        </Toolbar>
      </AppBar>
    </div>
  );
}
