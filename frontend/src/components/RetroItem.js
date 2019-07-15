import React, { useContext } from "react";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import {
  Avatar,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Typography,
  withStyles,
  IconButton
} from "@material-ui/core";

import EditItemDialog from "./dialogs/EditItemDialog";
import DeleteItemDialog from "./dialogs/DeleteItemDialog";
import UpvoteItemButton from "./buttons/UpvoteItemButton";
import { CardWrapper, CardContainer, CardText, CardAuthor } from "./styled";
import { ROLE_MODERATOR } from "../utils/userUtils";
import { BoardContext } from "../context/BoardContext";
import { UserContext } from "../context/UserContext";
import { CARD_CONTAINER } from "../constants/testIds";
import {
  VOTE_CARD,
  FOCUS_CARD,
  REMOVE_FOCUS_CARD
} from "../constants/eventNames";

const styles = {
  avatar: {
    color: "#fff",
    backgroundColor: "#73a6ad"
  },
  avatarVoted: {
    color: "#fff",
    backgroundColor: "#535a5b"
  },
  actions: {
    display: "flex",
    justifyContent: "space-between"
  },
  card: {
    border: "1px solid lightgrey"
  },
  cardFocused: {
    border: "4px solid red"
  },
  contentBody: {
    whiteSpace: "pre-line"
  }
};

function RetroItem(props) {
  const {
    id,
    author,
    content,
    points,
    isBlurred,
    isVoted,
    openSnackbar,
    classes
  } = props;
  const { boardId, boardState, socket } = useContext(BoardContext);
  const { userState, downvoteCard } = useContext(UserContext);

  function downVote() {
    const votesLeft = userState.votesLeft;
    socket.emit(VOTE_CARD, id, boardId, false);
    downvoteCard(boardId, id, votesLeft);
    openSnackbar();
  }

  function handleFocus(isFocus) {
    const role = userState.role;

    if (role === ROLE_MODERATOR) {
      if (isFocus) {
        socket.emit(FOCUS_CARD, id);
      } else if (boardState.focusedCard !== "") {
        socket.emit(REMOVE_FOCUS_CARD);
      }
    }
  }

  return (
    <CardWrapper isBlurred={isBlurred}>
      <CardContainer data-testid={CARD_CONTAINER}>
        <Card
          className={
            boardState.focusedCard === id ? classes.cardFocused : classes.card
          }
          raised
        >
          <div
            onAuxClick={() => handleFocus(false)}
            onDoubleClick={() => handleFocus(true)}
          >
            <CardHeader
              avatar={
                <Avatar
                  className={isVoted ? classes.avatarVoted : classes.avatar}
                  aria-label="number of votes"
                >
                  {points}
                </Avatar>
              }
              title={
                <Typography variant="body2" component={"span"}>
                  <CardAuthor>{author}</CardAuthor>
                </Typography>
              }
              action={
                isVoted ? (
                  <IconButton color="primary" onClick={downVote}>
                    <ThumbDownIcon fontSize="small" />
                  </IconButton>
                ) : null
              }
            />
            <Divider />
            <CardContent>
              <Typography
                variant="body2"
                className={classes.contentBody}
                component={"span"}
              >
                <CardText>{content}</CardText>
              </Typography>
            </CardContent>
            <Divider />
          </div>
          <CardActions className={classes.actions}>
            <DeleteItemDialog id={id} />
            <EditItemDialog id={id} author={author} content={content} />
            <UpvoteItemButton id={id} openSnackbar={openSnackbar} />
          </CardActions>
        </Card>
      </CardContainer>
    </CardWrapper>
  );
}

export default withStyles(styles)(React.memo(RetroItem));
