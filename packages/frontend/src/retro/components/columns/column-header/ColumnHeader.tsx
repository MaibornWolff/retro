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
  const secondaryColor = theme.palette.secondary.main;
  const { columnTitle } = column;
  const isDarkMode = theme.palette.mode === "dark";

  const headerGradientDark = `linear-gradient(19deg, ${secondaryColor} 0%, #302879 100%)`;
  const headerGradientLight = `linear-gradient(19deg, #E1E1DD 0%, ${secondaryColor} 100%)`;
  const headerGradient = isDarkMode ? headerGradientDark : headerGradientLight;

  return (
    <CardHeader
      sx={{
        backgroundImage: headerGradient,
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
