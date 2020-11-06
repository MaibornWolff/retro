import React, { useContext, useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import HowToVoteIcon from "@material-ui/icons/HowToVote";

import PokerVoteDialog from "./PokerVoteDialog";
import { CardText } from "../styled-components";
import { PokerContext } from "../../context/PokerContext";

interface PokerCardFrontProps {
  styleProps: { backgroundColor: string };
  userName: string;
  userId: string;
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
}));

export default function PokerCardFront(props: PokerCardFrontProps) {
  const { styleProps, userId, userName } = props;
  const [open, setOpen] = useState(false);
  const { pokerState } = useContext(PokerContext);
  const classes = useStyles(styleProps);

  return (
    <>
      <Card className={classes.root} elevation={8}>
        <CardContent>
          <Typography
            color="secondary"
            align="center"
            variant="h6"
            component="span"
          >
            <CardText>{userName}</CardText>
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton
            color="secondary"
            aria-label="vote"
            disabled={userId !== pokerState.id}
            onClick={() => setOpen(true)}
          >
            <HowToVoteIcon />
          </IconButton>
        </CardActions>
      </Card>
      <PokerVoteDialog open={open} setOpen={setOpen} userId={pokerState.id} />
    </>
  );
}
