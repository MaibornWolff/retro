import React from "react";
import { CardHeader } from "@mui/material";

import { ColumnName } from "../ColumnName";
import { ColumnMenu } from "./ColumnMenu";
import { RetroColumn } from "../../../types/retroTypes";
import { CreateCardButton } from "./CreateCardButton";

interface ColumnHeaderProps {
  column: RetroColumn;
}

export function ColumnHeader({ column }: ColumnHeaderProps) {
  const { columnTitle } = column;

  return (
    <CardHeader
      title={<ColumnName columnTitle={columnTitle} />}
      action={
        <>
          <CreateCardButton column={column} />
          <ColumnMenu column={column} />
        </>
      }
    />
  );
}
