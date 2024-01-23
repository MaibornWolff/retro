import React, { PropsWithChildren } from "react";
import { Box, useTheme } from "@mui/material";
import { FlexBox } from "./FlexBox";

export default function ArticleBox({ children }: PropsWithChildren) {
  const theme = useTheme();
  return (
    <FlexBox justifyContent="center" margin={theme.spacing(4)}>
      <Box maxWidth="lg">{children}</Box>
    </FlexBox>
  );
}
