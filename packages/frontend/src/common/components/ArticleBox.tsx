import React, { PropsWithChildren } from "react";
import { Box, useTheme } from "@mui/material";

export default function ArticleBox({ children }: PropsWithChildren) {
  const theme = useTheme();
  return (
    <Box sx={{ justifyContent: "center", display: "flex", marginTop: theme.spacing(4) }}>
      <Box maxWidth="lg">{children}</Box>
    </Box>
  );
}
