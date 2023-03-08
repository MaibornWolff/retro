import React from "react";

import { Typography } from "@mui/material";

interface ColumNameProps {
  columnTitle: string;
}

const ColumnName = ({ columnTitle }: ColumNameProps) => (
  <Typography variant="subtitle2">{columnTitle}</Typography>
);

export default ColumnName;
