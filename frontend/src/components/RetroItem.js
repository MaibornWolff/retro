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
import { connectSocket } from "../utils";
import { VOTE_CARD } from "../utils/eventNames";
import { setVotedItem, setUser, getVotesLeft } from "../utils/roleHandlers";
import { BoardContext } from "./context/BoardContext";

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
  const boardId = useContext(BoardContext);

  function updateLocalStorage() {
    const votesLeft = getVotesLeft(boardId);
    setVotedItem(id, boardId, false);
    setUser("votesLeft", votesLeft + 1, boardId);
  }

  function downVote() {
    const socket = connectSocket(boardId);
    socket.emit(VOTE_CARD, id, boardId, false);
    updateLocalStorage();
    openSnackbar();
  }

  return (
    <CardWrapper isBlurred={isBlurred}>
      <CardContainer>
        <Card className={classes.card} raised>
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

export default withStyles(styles)(RetroItem);
