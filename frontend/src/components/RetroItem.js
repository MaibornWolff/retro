import React from "react";
import {
  Avatar,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Typography,
  withStyles
} from "@material-ui/core";

import EditItemDialog from "./dialogs/EditItemDialog";
import DeleteItemDialog from "./dialogs/DeleteItemDialog";
import UpvoteItemButton from "./buttons/UpvoteItemButton";
import { CardWrapper, CardContainer, CardText, CardAuthor } from "./styled";

class RetroItem extends React.PureComponent {
  render() {
    const {
      classes,
      id,
      author,
      content,
      points,
      boardId,
      isBlurred
    } = this.props;

    return (
      <CardWrapper isBlurred={isBlurred}>
        <CardContainer>
          <Card className={classes.card} raised>
            <CardHeader
              avatar={
                <Avatar className={classes.avatar} aria-label="number of votes">
                  {points}
                </Avatar>
              }
              title={
                <Typography variant="body2" component={"span"}>
                  <CardAuthor>{author}</CardAuthor>
                </Typography>
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
              <UpvoteItemButton id={id} boardId={boardId} points={points} />
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
