import React, { ReactNode } from "react";
import { Box } from "@mui/material";

interface ArticleBoxProps {
  children: ReactNode;
}
export default function ArticleBox({ children }: ArticleBoxProps) {
  return (
    <Box sx={{ justifyContent: "center", display: "flex" }}>
      <Box maxWidth="lg">{children}</Box>
    </Box>
  );
}
