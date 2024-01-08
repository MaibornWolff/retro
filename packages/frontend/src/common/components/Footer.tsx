import React from "react";
import { Box, Link } from "@mui/material";

export default function Footer() {
  return (
    <Box>
      <Link href="/impressum">Impressum</Link>
      <Link href="/terms_of_service">Terms of Service</Link>
    </Box>
  );
}
