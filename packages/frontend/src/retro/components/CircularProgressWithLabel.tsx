import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

function normalise(value: number, min = 0, max: number) {
  return ((value - min) * 100) / (max - min);
}

interface CircularProgressWithLabelProps {
  maxValue: number;
  currentValue: number;
}

export function CircularProgressWithLabel({
  maxValue,
  currentValue,
}: CircularProgressWithLabelProps) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={normalise(maxValue - currentValue, maxValue, 0)}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6" component="div" color="text.primary">
          {currentValue}
        </Typography>
      </Box>
    </Box>
  );
}
