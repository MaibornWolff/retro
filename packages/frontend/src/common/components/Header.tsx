import React, { PropsWithChildren } from "react";
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
        <Typography variant="menuTitle" flexGrow={1}>
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
