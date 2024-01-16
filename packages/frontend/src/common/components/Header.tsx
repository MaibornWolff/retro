import React, { ReactNode } from "react";
import { AppBar, Toolbar, Typography, useTheme, Link } from "@mui/material";
import { useNamespace } from "../hooks/useNamespace";
import { ToggleThemeButton } from "./buttons/ToggleThemeButton";

export interface HeaderProps {
  children?: ReactNode;
}

export function Header({ children }: HeaderProps) {
  const theme = useTheme();
  const namespace = useNamespace();

  return (
    <AppBar
      position="static"
      enableColorOnDark={true}
      sx={{ backgroundColor: theme.palette.background.paper }}
    >
      <Toolbar>
        <Typography
          variant="h4"
          flexGrow={1}
          fontFamily="Permanent"
          sx={{ fontFamily: "Permanent Marker, cursive" }}
        >
          <Link href="/" style={{ textDecoration: "none", color: theme.palette.primary.main }}>
            {namespace === "poker" ? "Planning Poker" : "Retro"}
          </Link>
        </Typography>
        <ToggleThemeButton />
        {children}
      </Toolbar>
    </AppBar>
  );
}
