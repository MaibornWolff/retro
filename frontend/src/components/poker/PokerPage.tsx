import React, { useContext, useEffect, useState } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { Redirect, useRouteMatch } from "react-router-dom";
import isEqual from "lodash/isEqual";

import PokerHeader from "./PokerHeader";
import PokerUser from "./PokerUser";
import PokerActionButtons from "./PokerActionButtons";
import {
  CONNECT,
  JOIN_POKER,
  JOIN_POKER_ERROR,
  POKER_ERROR,
  UPDATE_POKER_STATE,
  SHOW_POKER_RESULTS,
} from "../../constants/event.constants";
import { PokerContext } from "../../context/PokerContext";
import { Poker } from "../../types/common.types";
import { defaultPoker } from "../../utils";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

export default function PokerPage() {
  const [poker, setPoker] = useState<Poker>(defaultPoker);
  const [flip, setFlip] = useState(false);
  const { pokerId, socket } = useContext(PokerContext);
  const classes = useStyles();
  const match = useRouteMatch();

  useEffect(() => {
    document.title = "Retro | Planning Poker";

    return () => {
      document.title = "Retro";
    };
  });

  useEffect(() => {
    // pull state, when navigating back and forth
    if (isEqual(poker, defaultPoker) && match.isExact) {
      socket.emit(JOIN_POKER, pokerId);
    }

    socket.on(CONNECT, () => {
      socket.emit(JOIN_POKER, pokerId);
    });

    socket.on(JOIN_POKER, (pokerState: Poker) => {
      setPoker(pokerState);
    });

    socket.on(UPDATE_POKER_STATE, (newPokerState: Poker) => {
      setPoker(newPokerState);
    });

    socket.on(SHOW_POKER_RESULTS, () => {
      setFlip((prevFlip) => !prevFlip);
    });

    socket.on(POKER_ERROR, () => {
      setPoker({ ...poker, error: true });
    });

    socket.on(JOIN_POKER_ERROR, () => {
      setPoker({ ...poker, error: true });
    });

    return () => {
      socket.removeAllListeners();
    };
    // eslint-disable-next-line
  }, []);

  if (poker.error) {
    return <Redirect to={"/error"} />;
  }

  return (
    <>
      <PokerHeader />
      <Grid container className={classes.root} direction="column">
        <PokerActionButtons />
        <Grid item xs={12}>
          {/* story title big */}
          {/* story link */}
        </Grid>
        <Grid item xs={12}>
          <Grid container direction="row">
            {poker.participants.map((user, index) => {
              return (
                <PokerUser
                  key={user.name + index}
                  user={user}
                  isFlipped={flip}
                />
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
