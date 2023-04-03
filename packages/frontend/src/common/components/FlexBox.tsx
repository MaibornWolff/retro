import { Box, BoxProps } from "@mui/material";
import React from "react";

interface FlexBoxProps extends BoxProps {
  children?: React.ReactNode;
}

export const FlexBox = React.forwardRef(({ children, ...props }: FlexBoxProps, ref: any) => {
  return (
    <Box {...props} ref={ref} display="flex">
      {children}
    </Box>
  );
});
