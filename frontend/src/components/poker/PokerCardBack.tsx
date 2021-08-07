import React from "react";
import { Card, CardContent, makeStyles, Typography } from "@material-ui/core";

import { CardText } from "../styled-components";
import { usePokerStore } from "../../hooks/poker.hooks";
import { POKER_UNIT_TSHIRT } from "../../constants/poker.constants";

function getTShirtSizeFromValue(value: number): string {
  return ["XS", "S", "M", "L", "XL", "XXL"][value];
}

interface PokerCardBackProps {
  styleProps: { backgroundColor: string };
  userName: string;
  userVote: number;
}

const useStyles = makeStyles((theme) => ({
  root: (props: any) => ({
    margin: theme.spacing(1),
    backgroundColor: props.backgroundColor,
    width: "12em",
    height: "16rem",
  }),
  cardContent: {
    width: "100%",
    minHeight: "100%",
    margin: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    textAlign: "center",
  },
}));

export default function PokerCardBack(props: PokerCardBackProps) {
  const pokerUnitType = usePokerStore((state) => state.pokerUnit.unitType);
  const { styleProps, userName, userVote } = props;
  const classes = useStyles(styleProps);

  return (
    <Card className={classes.root} elevation={8}>
      <CardContent className={classes.cardContent}>
        <Typography
          color="secondary"
          className={classes.title}
          gutterBottom
          component="span"
        >
          <CardText>{userName}</CardText>
        </Typography>
        <Typography color="secondary" variant="h4" align="center">
          {pokerUnitType === POKER_UNIT_TSHIRT
            ? getTShirtSizeFromValue(userVote)
            : userVote}
        </Typography>
      </CardContent>
    </Card>
  );
}
