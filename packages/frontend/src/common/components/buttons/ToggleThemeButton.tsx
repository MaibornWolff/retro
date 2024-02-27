import React, { useContext } from "react";
import { Brightness6 } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { ThemeContext } from "../../context/ThemeContext";

export function ToggleThemeButton() {
  const { currentTheme, setTheme } = useContext(ThemeContext);

  function toggleTheme() {
    if (currentTheme.palette.mode === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
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
