import React from "react";
import { Card, CardContent, CardHeader, Typography, useTheme } from "@mui/material";
import { LocalPolice } from "@mui/icons-material";

import { CardText } from "../../../common/styled-components";
import { User } from "../../../common/types/commonTypes";
import { isModerator } from "../../../common/utils/participantsUtils";

interface PokerCardProps {
  styleProps: { backgroundColor: string };
  pokerUser: User;
  FooterComponent?: React.ReactNode;
  DialogComponent?: React.ReactNode;
}

export function PokerCard({
  styleProps,
  pokerUser,
  FooterComponent,
  DialogComponent,
}: PokerCardProps) {
  const theme = useTheme();

  return (
    <>
      <Card
        sx={{
          margin: theme.spacing(1),
          backgroundColor: styleProps.backgroundColor,
          width: "12em",
          height: "16rem",
          display: "flex",
          flexDirection: "column",
        }}
        elevation={8}
      >
        <CardHeader
          sx={{ height: "64px" }}
          avatar={<>{isModerator(pokerUser) && <LocalPolice color="secondary" />}</>}
        />
        <CardContent
          sx={{
            width: "100%",
            flexGrow: "1",
            padding: "0px",
            paddingX: "16px",
          }}
        >
          <Typography color="secondary" align="center" variant="h6">
            <CardText>{pokerUser.name}</CardText>
          </Typography>
        </CardContent>
        {FooterComponent}
      </Card>
      {DialogComponent}
    </>
  );
}
