import React from "react";
import ReactCardFlip from "react-card-flip";
import { Card, CardContent, makeStyles, Typography } from "@material-ui/core";
import { CardText } from "../styled-components";

interface PokerUserProps {
  user: { name: string; vote: number; voted: boolean };
  isFlipped: boolean;
}

const useStyles = makeStyles((theme) => ({
  rootFront: (props: any) => ({
    margin: theme.spacing(1),
    backgroundColor: props.backgroundColor,
    width: "10em",
    height: "13em",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  }),
  rootBack: (props: any) => ({
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

export default function PokerUser(props: PokerUserProps) {
  const styleProps = props.user.voted
    ? { backgroundColor: "#48BB78" }
    : { backgroundColor: "#F56565" };
  const classes = useStyles(styleProps);

  return (
    <ReactCardFlip isFlipped={props.isFlipped} flipDirection="horizontal">
      <Card className={classes.rootFront} elevation={8}>
        <CardContent>
          <Typography align="center" variant="h6" component="span">
            <CardText>{props.user.name}</CardText>
          </Typography>
        </CardContent>
      </Card>

      <Card className={classes.rootBack} elevation={8}>
        <CardContent>
          <Typography variant="h4" align="center">
            {props.user.vote}
          </Typography>
          <Typography className={classes.title} gutterBottom component="span">
            <CardText>{props.user.name}</CardText>
          </Typography>
        </CardContent>
      </Card>
    </ReactCardFlip>
  );
}
