import React from "react";
import { Box, Link, Paper, useTheme } from "@mui/material";
import { FlexBox } from "./FlexBox";

export default function Footer() {
  const theme = useTheme();
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
          <Link href="/privacy" underline="hover" target="_blank" rel="noopener">
            Privacy
          </Link>
          ·
          <Link href="/terms-of-service" underline="hover" target="_blank" rel="noopener">
            Terms
          </Link>
          ·
          <Link href="/impressum" underline="hover" target="_blank" rel="noopener">
            Impressum
          </Link>
          ·
          <Link
            href="https://github.com/MaibornWolff/retro"
            underline="hover"
            target="_blank"
            rel="noopener"
          >
            @GitHub
          </Link>
          ·
          <Link
            href="https://github.com/MaibornWolff/retro/issues/new"
            underline="hover"
            target="_blank"
            rel="noopener"
          >
            Report a Bug
          </Link>
          ·
          <Link href="https://www.maibornwolff.de" underline="hover" target="_blank" rel="noopener">
            @MaibornWolff
          </Link>
        </FlexBox>
      </Paper>
    </footer>
  );
}
