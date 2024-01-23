import React, { PropsWithChildren } from "react";
import { useTheme } from "@mui/material";

export default function MainContainer({ children }: PropsWithChildren) {
  const theme = useTheme();
  return <main style={{ paddingBottom: theme.spacing(4), minHeight: "100vh" }}>{children}</main>;
}
