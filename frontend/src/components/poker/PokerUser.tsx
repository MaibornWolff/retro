import React from "react";
import ReactCardFlip from "react-card-flip";
import { Card, CardContent, makeStyles, Typography } from "@material-ui/core";

interface PokerUserProps {
  user: { name: string; vote: number; voted: boolean };
  isFlipped: boolean;
}

const useStyles = makeStyles((theme) => ({
  rootFront: (props: any) => ({
    margin: theme.spacing(1),
    backgroundColor: props.backgroundColor,
    minWidth: 200,
    maxWidth: 470,
  }),
  rootBack: (props: any) => ({
    margin: theme.spacing(1),
    backgroundColor: props.backgroundColor,
    minWidth: 200,
    maxWidth: 470,
  }),
  title: {
    fontSize: 14,
    textAlign: "center",
  },
}));

export default function PokerUser(props: PokerUserProps) {
  const styleProps = props.user.voted
    ? { backgroundColor: "#4caf50" }
    : { backgroundColor: "#f44336" };
  const classes = useStyles(styleProps);

  return (
    <ReactCardFlip isFlipped={props.isFlipped} flipDirection="vertical">
      <Card className={classes.rootFront}>
        <CardContent>
          <Typography variant="h6" align="center">
            {props.user.name}
          </Typography>
        </CardContent>
      </Card>

      <Card className={classes.rootBack}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {props.user.name}
          </Typography>
          <Typography variant="h6" align="center">
            {props.user.vote}
          </Typography>
        </CardContent>
      </Card>
    </ReactCardFlip>
  );
}
