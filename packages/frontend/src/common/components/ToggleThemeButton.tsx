import React, { useContext } from "react";
import { Brightness6 } from "@mui/icons-material";
import { Button, Typography, useTheme } from "@mui/material";
import { ColorThemeContext } from "../context/ColorThemeContext";

export default function ToggleThemeButton() {
  const theme = useTheme();
  const { currentTheme, setDarkTheme, setLightTheme } = useContext(ColorThemeContext);

  function toggleTheme() {
    if (currentTheme.palette.mode === "dark") {
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
      sx={{ marginRight: theme.spacing(1), textTransform: "none", color: "white" }}
      startIcon={<Brightness6 />}
    >
      <Typography color="inherit">Change Theme</Typography>
    </Button>
  );
}
