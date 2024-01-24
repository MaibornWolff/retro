import React, { PropsWithChildren, ReactNode } from "react";
import { AppBar, Toolbar, Typography, useTheme, Link } from "@mui/material";
import { useNamespace } from "../hooks/useNamespace";
import { ToggleThemeButton } from "./buttons/ToggleThemeButton";

export function Header({ children }: PropsWithChildren) {
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
