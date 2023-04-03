import React from "react";
import { Card, CardContent, CardHeader, Typography, useTheme } from "@mui/material";
import { LocalPolice, Person } from "@mui/icons-material";

import { User } from "../../../common/types/commonTypes";
import { isModerator } from "../../../common/utils/participantsUtils";
import { CardText } from "./CardText";

interface PokerCardProps {
  voted: boolean;
  pokerUser: User;
  FooterComponent?: React.ReactNode;
  DialogComponent?: React.ReactNode;
}

export function PokerCard({ voted, pokerUser, FooterComponent, DialogComponent }: PokerCardProps) {
  const theme = useTheme();
  const backgroundColor = voted
    ? theme.palette.highlightColorSecondary
    : theme.palette.highlightColorPrimary;
  const fontColor = voted || theme.palette.mode === "light" ? "black" : "white";

  return (
    <>
      <Card
        sx={{
          m: 1,
          background: backgroundColor,
          color: fontColor,
          width: "12em",
          height: "16rem",
          display: "flex",
          flexDirection: "column",
          borderRadius: theme.spacing(2),
        }}
        elevation={5}
      >
        <CardHeader avatar={isModerator(pokerUser) ? <LocalPolice /> : <Person />} />
        <CardContent sx={{ flexGrow: "1" }}>
          <Typography align="center" variant="h6">
            <CardText text={pokerUser.name} isSelectable={false} withHyperlinks={false} />
          </Typography>
        </CardContent>
        {FooterComponent}
      </Card>
      {DialogComponent}
    </>
  );
}
