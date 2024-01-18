import React, { PropsWithChildren } from "react";
import { Box } from "@mui/material";

export default function ArticleBox({ children }: PropsWithChildren) {
  return (
    <Box sx={{ justifyContent: "center", display: "flex", marginTop: "2rem" }}>
      <Box maxWidth="lg">{children}</Box>
    </Box>
  );
}
