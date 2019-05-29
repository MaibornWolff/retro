import React from "react";
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

class RetroItem extends React.PureComponent {
  handleDownVote = () => {
    const { id, boardId, openSnackbar } = this.props;
    const socket = connectSocket(boardId);
    const votesLeft = getVotesLeft(boardId);

    socket.emit(VOTE_CARD, id, boardId, false);
    setVotedItem(id, boardId, false);
    setUser("votesLeft", votesLeft + 1, boardId);
    openSnackbar();
  };

  render() {
    const {
      classes,
      id,
      author,
      content,
      points,
      boardId,
      isBlurred,
      isVoted,
      openSnackbar
    } = this.props;

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
                  <IconButton color="default" onClick={this.handleDownVote}>
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
              <DeleteItemDialog id={id} boardId={boardId} />
              <EditItemDialog
                id={id}
                author={author}
                content={content}
                boardId={boardId}
              />
              <UpvoteItemButton
                id={id}
                boardId={boardId}
                openSnackbar={openSnackbar}
              />
            </CardActions>
          </Card>
        </CardContainer>
      </CardWrapper>
    );
  }
}

const styles = {
  avatar: {
    color: "#fff",
    backgroundColor: "#73a6ad"
  },
  avatarVoted: {
    color: "#fff",
    backgroundColor: "#2a3132"
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

export default withStyles(styles)(RetroItem);
