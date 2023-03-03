import React from "react";
import { Card, CardContent, CardHeader, Typography, useTheme } from "@mui/material";
import { LocalPolice } from "@mui/icons-material";

import { CardText } from "../../../common/styled-components";

interface PokerCardProps {
  styleProps: { backgroundColor: string };
  userName: string;
  role: string;
  FooterComponent?: React.ReactNode;
  DialogComponent?: React.ReactNode;
}

export default function PokerCard({
  styleProps,
  userName,
  role,
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
          avatar={<>{role === "moderator" && <LocalPolice color="secondary" />}</>}
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
            <CardText>{userName}</CardText>
          </Typography>
        </CardContent>
        {FooterComponent}
      </Card>
      {DialogComponent}
    </>
  );
}
