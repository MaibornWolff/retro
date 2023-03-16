import React from "react";
import { CardHeader, useTheme } from "@mui/material";

import { ColumnName } from "../ColumnName";
import { ColumnMenu } from "./ColumnMenu";
import { RetroColumn } from "../../../types/retroTypes";
import { CreateCardButton } from "./CreateCardButton";

interface ColumnHeaderProps {
  column: RetroColumn;
}

export function ColumnHeader({ column }: ColumnHeaderProps) {
  const theme = useTheme();

  const { columnTitle } = column;

  return (
    <CardHeader
      sx={{
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
      }}
      title={<ColumnName columnTitle={columnTitle} />}
      action={
        <div>
          <CreateCardButton column={column} />
          <ColumnMenu column={column} />
        </div>
      }
    />
  );
}
