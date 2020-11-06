import React, { useContext } from "react";
import ThemeIcon from "@material-ui/icons/Brightness6";
import { Button, makeStyles } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { ColorThemeContext } from "../../context/ColorThemeContext";

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
    textTransform: "none",
    color: "white",
  },
}));

export default function ToggleThemeButton() {
  const classes = useStyles();
  const { currentTheme, setDarkTheme, setLightTheme } = useContext(
    ColorThemeContext
  );

  function toggleTheme() {
    if (currentTheme.palette.type === "dark") {
      setLightTheme();
    } else {
      setDarkTheme();
    }
  }

  return (
    <Button
      variant="text"
      aria-label="Share this session"
      onClick={toggleTheme}
      className={classes.button}
      startIcon={<ThemeIcon />}
    >
      <Typography color="inherit">Change Theme</Typography>
    </Button>
  );
}
