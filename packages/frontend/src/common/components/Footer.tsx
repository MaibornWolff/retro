import React from "react";
import { Box, Link, Paper } from "@mui/material";

interface FooterProps {
  isTransparent?: boolean;
}
export default function Footer({ isTransparent = false }: FooterProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        position: "absolute",
        bottom: 0,
        width: "100%",
        backgroundColor: isTransparent ? "transparent" : undefined,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1,
          justifyContent: "center",
        }}
      >
        <Link href="/privacy" color={isTransparent ? "#000000" : undefined}>
          Privacy
        </Link>
        <Link href="/terms-of-service" color={isTransparent ? "#000000" : undefined}>
          Terms
        </Link>
        <Link href="/impressum" color={isTransparent ? "#000000" : undefined}>
          Impressum
        </Link>
        <Link href="https://www.maibornwolff.de" color={isTransparent ? "#000000" : undefined}>
          @MaibornWolff
        </Link>
      </Box>
    </Paper>
  );
}
