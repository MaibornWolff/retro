import React from "react";

import { Typography } from "@mui/material";

interface ColumNameProps {
  columnTitle: string;
}

export function ColumnName({ columnTitle }: ColumNameProps) {
  return <Typography variant="subtitle2">{columnTitle}</Typography>;
}
