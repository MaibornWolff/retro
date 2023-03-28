import { Box, BoxProps } from "@mui/material";
import React from "react";

interface FlexBoxProps extends BoxProps {
  children?: React.ReactNode;
}

export function FlexBox({ children, ...props }: FlexBoxProps) {
  return (
    <Box {...props} style={{ display: "flex" }}>
      {children}
    </Box>
  );
}
