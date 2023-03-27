import React from "react";
import { Card, CardContent, CardHeader, Typography, useTheme } from "@mui/material";
import { LocalPolice } from "@mui/icons-material";

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
          margin: theme.spacing(1),
          background: backgroundColor,
          color: fontColor,
          width: "12em",
          height: "16rem",
          display: "flex",
          flexDirection: "column",
          borderRadius: "15px",
        }}
        elevation={5}
      >
        <CardHeader
          sx={{ height: "64px" }}
          avatar={<>{isModerator(pokerUser) && <LocalPolice />}</>}
        />
        <CardContent
          sx={{
            width: "100%",
            flexGrow: "1",
            padding: "0px",
            paddingX: "16px",
          }}
        >
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
