import React from "react";
import { Box, Link, Paper } from "@mui/material";

export default function Footer() {
  return (
    <Paper elevation={0} sx={{ position: "absolute", bottom: 0, width: "100%" }}>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 1, justifyContent: "center" }}>
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms-of-service">Terms</Link>
        <Link href="/impressum">Impressum</Link>
        <Link href="https://www.maibornwolff.de">@MaibornWolff</Link>
      </Box>
    </Paper>
  );
}
