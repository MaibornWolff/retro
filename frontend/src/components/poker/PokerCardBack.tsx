import React from "react";
import { Card, CardContent, makeStyles, Typography } from "@material-ui/core";

import { CardText } from "../styled-components";

interface PokerCardBackProps {
  styleProps: { backgroundColor: string };
  userName: string;
  userVote: number;
}

const useStyles = makeStyles((theme) => ({
  root: (props: any) => ({
    margin: theme.spacing(1),
    backgroundColor: props.backgroundColor,
    width: "10em",
    height: "13em",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  }),
  title: {
    fontSize: 14,
    textAlign: "center",
  },
}));

export default function PokerCardBack(props: PokerCardBackProps) {
  const { styleProps, userName, userVote } = props;
  const classes = useStyles(styleProps);

  return (
    <Card className={classes.root} elevation={8}>
      <CardContent>
        <Typography variant="h4" align="center">
          {userVote}
        </Typography>
        <Typography className={classes.title} gutterBottom component="span">
          <CardText>{userName}</CardText>
        </Typography>
      </CardContent>
    </Card>
  );
}
