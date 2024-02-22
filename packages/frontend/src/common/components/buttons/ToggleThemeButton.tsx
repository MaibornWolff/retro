import React, { useContext } from "react";
import { Brightness6 } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { ThemeContext } from "../../context/ThemeContext";
import { LocalStorage, ThemeStatus } from "../../utils/localStorage";

export function ToggleThemeButton() {
  const { currentTheme, setDarkTheme, setLightTheme } = useContext(ThemeContext);

  function toggleTheme() {
    if (currentTheme.palette.mode === "dark") {
      LocalStorage.setThemePreference(ThemeStatus.light);
      setLightTheme();
    } else {
      LocalStorage.setThemePreference(ThemeStatus.dark);
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
