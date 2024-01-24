import React from "react";
import { Link, Paper, useTheme } from "@mui/material";
import { FlexBox } from "./FlexBox";

export default function Footer() {
  const theme = useTheme();
  const links: { href: string; label: string }[] = [
    { href: "/privacy", label: "Privacy" },
    { href: "/terms-of-service", label: "Terms" },
    { href: "/impressum", label: "Impressum" },
    { href: "https://github.com/MaibornWolff/retro", label: "@Github" },
    { href: "https://github.com/MaibornWolff/retro/issues/new", label: "Report a Bug" },
    { href: "https://www.maibornwolff.de", label: "@MaibornWolff" },
  ];
  return (
    <footer>
      <Paper
        elevation={0}
        square
        sx={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          backgroundColor: theme.palette.background.paper,
          height: theme.spacing(4),
        }}
      >
        <FlexBox
          flexDirection="row"
          gap={1}
          justifyContent="center"
          marginBottom={theme.spacing(1)}
          marginTop={theme.spacing(1)}
          fontSize="0.8rem"
        >
          {links.map(({ href, label }, index) => (
            <>
              <Link href={href} underline="hover" target="_blank" rel="noopener">
                {label}
              </Link>
              {index !== links.length - 1 ? "." : undefined}
            </>
          ))}
        </FlexBox>
      </Paper>
    </footer>
  );
}