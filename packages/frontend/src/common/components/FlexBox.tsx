import { Box, BoxProps } from "@mui/material";
import React, { Ref } from "react";

interface FlexBoxProps extends BoxProps {
  children?: React.ReactNode;
}

export const FlexBox = React.forwardRef(
  ({ children, ...props }: FlexBoxProps, ref: Ref<HTMLElement>) => {
    return (
      <Box {...props} ref={ref} display="flex">
        {children}
      </Box>
    );
  },
);
