import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  makeStyles,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import PeopleIcon from "@material-ui/icons/People";
import { nanoid } from "nanoid";
import { useHistory } from "react-router-dom";
import { postData } from "../../utils";
import { POKER_UNIT_FIBONACCI } from "../../constants/poker.constants";
import { Poker } from "../../types/common.types";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    minWidth: "11rem",
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}));

export default function PlanningPokerDialog() {
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const classes = useStyles();
  const fullScreen = useMediaQuery(useTheme().breakpoints.down("sm"));

  function openDialog() {
    setOpen(true);
  }

  function closeDialog() {
    setOpen(false);
  }

  function resetState() {
    setOpen(false);
  }

  function navigateToPokerPage(response: Response, pokerId: string) {
    if (response.ok) {
      history.push({
        pathname: `/poker/${pokerId}`,
        state: { isModerator: true },
      });
    }
  }

  async function handleSubmit() {
    const pokerId = nanoid();
    const newPokerState: Poker = {
      pokerId,
      story: { storyTitle: "", storyUrl: "" },
      pokerUnit: {
        unitType: POKER_UNIT_FIBONACCI,
        unitRangeHigh: 34,
      },
      participants: [],
      error: false,
      chartData: {
        data: [],
      },
    };
    const response = await postData("/api/poker/", newPokerState);
    resetState();
    navigateToPokerPage(response, pokerId);
  }

  return (
    <>
      <Fab
        size="large"
        variant="extended"
        color="primary"
        onClick={openDialog}
        className={classes.button}
      >
        <PeopleIcon className={classes.icon} />
        Planning Poker
      </Fab>
      <Dialog
        fullWidth
        maxWidth="xs"
        fullScreen={fullScreen}
        open={open}
        onClose={closeDialog}
        aria-labelledby="planning-poker-dialog-title"
      >
        <DialogTitle id="planning-poker-dialog-title">
          Planning Poker Time!
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            You are about to start a planning poker session. After clicking
            start you can share the link with your team in order to estimate
            stories.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Start
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
