import { useMediaQuery, useTheme } from "@mui/material";

export function useFullscreen() {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down("sm"));
}
