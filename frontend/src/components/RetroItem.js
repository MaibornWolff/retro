import React from "react";
import io from "socket.io-client";
import EyeIcon from "@material-ui/icons/RemoveRedEye";
import {
  Avatar,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Typography,
  IconButton,
  withStyles
} from "@material-ui/core";

import EditItemDialog from "./dialogs/EditItemDialog";
import DeleteItemDialog from "./dialogs/DeleteItemDialog";
import UpvoteItemButton from "./UpvoteItemButton";
import DownvoteItemButton from "./DownvoteItemButton";
import { LOCAL_BACKEND_ENDPOINT } from "../utils";
import { UNBLUR_CARD } from "../events/event-names";
import { CardWrapper, CardContainer, Unblur } from "./styled";
import cookie from "react-cookies";

const unblur = (isBlurred, id, boardId) => {
  const socket = io(LOCAL_BACKEND_ENDPOINT);
  socket.emit(UNBLUR_CARD, isBlurred, id, boardId);
};

const getContent = content => {
  const separator = "===";

  if (content.includes(separator)) {
    const splitted = content.split(separator);
    return splitted.map(txt => {
      return (
        <Typography key={txt} component="p">
          {txt}
          <br />
          {separator}
          <br />
        </Typography>
      );
    });
  }
  return <Typography component="p">{content}</Typography>;
};

const isUpvoted = (id, boardId) => {
    var cookieResult = cookie.load(boardId + 'upvote' + id);
    return cookieResult ? true : false;
};

const RetroItem = props => {
  const { classes, id, author, content, points, boardId, isBlurred } = props;

  return (
    <CardWrapper isBlurred={isBlurred}>
      <CardContainer>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar className={classes.avatar} aria-label="Recipe">
                {points}
              </Avatar>
            }
            title={<Typography variant="subtitle2">{author}</Typography>}
          />
          <Divider />
          <CardContent>{getContent(content)}</CardContent>
          <Divider />
          <CardActions className={classes.actions}>
            <DeleteItemDialog id={id} boardId={boardId} />
            <EditItemDialog
              id={id}
              author={author}
              content={content}
              boardId={boardId}
            />
              { isUpvoted(id, boardId) ?
                  <DownvoteItemButton id={id} boardId={boardId} />
                  :
                  <UpvoteItemButton id={id} boardId={boardId} />
              }

          </CardActions>
        </Card>
      </CardContainer>

      {isBlurred ? (
        <Unblur>
          <IconButton
            color="secondary"
            onClick={() => unblur(!isBlurred, id, boardId)}
          >
            <EyeIcon fontSize="small" />
          </IconButton>
        </Unblur>
      ) : null}
    </CardWrapper>
  );
};

const styles = {
  avatar: {
    color: "#fff",
    backgroundColor: "#73a6ad"
  },
  actions: {
    display: "flex",
    justifyContent: "space-between"
  },
  card: {
    border: "1px solid lightgrey"
  }
};

export default withStyles(styles)(RetroItem);
