import React from "react";
import { Card, CardContent, CardHeader, Typography, useTheme } from "@mui/material";
import { LocalPolice } from "@mui/icons-material";

import { CardText } from "../../../common/styled-components";
import { User } from "../../../common/types/commonTypes";
import { isModerator } from "../../../common/utils/participantsUtils";

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
  const fontColor = voted ? "black" : "white";

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
            <CardText>{pokerUser.name}</CardText>
          </Typography>
        </CardContent>
        {FooterComponent}
      </Card>
      {DialogComponent}
    </>
  );
}
