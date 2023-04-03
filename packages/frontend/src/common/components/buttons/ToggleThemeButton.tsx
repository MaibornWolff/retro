import React, { useContext } from "react";
import { Brightness6 } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { ColorThemeContext } from "../../context/ColorThemeContext";

export function ToggleThemeButton() {
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
      sx={{ mr: 1, textTransform: "none" }}
      startIcon={<Brightness6 />}
    >
      <Typography>Change Theme</Typography>
    </Button>
  );
}
