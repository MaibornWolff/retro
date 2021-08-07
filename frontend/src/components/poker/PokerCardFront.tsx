import React, { useContext, useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import HowToVoteIcon from "@material-ui/icons/HowToVote";
import MenuIcon from "@material-ui/icons/MoreVert";
import DeleteIcon from "@material-ui/icons/Delete";

import PokerVoteDialog from "./PokerVoteDialog";
import { CardText } from "../styled-components";
import { PokerContext } from "../../context/PokerContext";
import { POKER_ROLE_MODERATOR } from "../../utils/poker.utils";
import { REMOVE_POKER_USER } from "../../constants/event.constants";

interface PokerCardFrontProps {
  styleProps: { backgroundColor: string };
  userName: string;
  userId: string;
}

const useStyles = makeStyles((theme) => ({
  root: (props: any) => ({
    margin: theme.spacing(1),
    backgroundColor: props.backgroundColor,
    width: "12em",
    height: "16rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  }),
  cardContent: {
    width: "100%",
    minHeight: "10rem",
  },
  cardHeader: {
    padding: 0,
    paddingTop: "8px",
    marginLeft: "8rem",
  },
}));

export default function PokerCardFront(props: PokerCardFrontProps) {
  const { styleProps, userId, userName } = props;
  const { pokerState, socket, pokerId } = useContext(PokerContext);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles(styleProps);

  function openMenu(event: any) {
    setAnchorEl(event.currentTarget);
  }

  function closeMenu() {
    setAnchorEl(null);
  }

  function removeUser(userId: string) {
    socket.emit(REMOVE_POKER_USER, userId, pokerId);
  }

  return (
    <>
      <Card className={classes.root} elevation={8}>
        <CardHeader
          className={classes.cardHeader}
          action={
            <>
              <IconButton
                color="secondary"
                disabled={pokerState.role !== POKER_ROLE_MODERATOR}
                aria-label="card settings"
                onClick={openMenu}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="card-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={closeMenu}
              >
                <MenuItem onClick={() => removeUser(userId)}>
                  <ListItemIcon>
                    <DeleteIcon />
                  </ListItemIcon>
                  <ListItemText primary="Remove User" />
                </MenuItem>
              </Menu>
            </>
          }
        />
        <CardContent className={classes.cardContent}>
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
