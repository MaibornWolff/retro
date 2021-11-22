import { ButtonGroup, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { Fragment, useContext, useEffect, useRef, useState } from "react";
import { SEND_REACTION } from "../../../constants/event.constants";
import { BoardContext } from "../../../context/BoardContext";
import Reaction from "./Reaction";

const emojiList = [
  "https://twemoji.maxcdn.com/v/13.1.0/72x72/1f60d.png",
  "https://twemoji.maxcdn.com/v/13.1.0/72x72/1f44d.png",
  "https://twemoji.maxcdn.com/v/13.1.0/72x72/1f613.png",
  "https://twemoji.maxcdn.com/v/13.1.0/72x72/1f621.png",
  "https://twemoji.maxcdn.com/v/13.1.0/72x72/1f62f.png",
];

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    right: "1em",
    bottom: "1em",
    height: "5%",
    boxShadow: "2px 2px 15px -1px rgba(0,0,0,0.8)",
    backgroundColor: theme.palette.background.default,
  },
  icon: {
    maxHeight: "1em",
  },
  iconButton: {
    borderRadius: "0",
  },
}));

export default function ReactionBar() {
  const { boardState, socket, boardId } = useContext(BoardContext);
  const [shownReactions, setShownReactions] = useState(
    boardState.shownReactions
  );
  const reactionRef = useRef(boardState.shownReactions);

  const classes = useStyles();

  useEffect(() => {
    setShownReactions(boardState.shownReactions);
    reactionRef.current = boardState.shownReactions;
  }, [boardState.shownReactions]);

  /**
   * Only deletes Reactions after all Reactions are shown
   */
  function deleteReaction() {
    if (reactionRef.current.length != boardState.shownReactions.length) return;

    boardState.shownReactions = [];
    setShownReactions(boardState.shownReactions);
  }

  function emitReaction(reactionId: number) {
    socket.emit(SEND_REACTION, boardId, "" + reactionId);
  }

  return (
    <Fragment>
      {shownReactions.map((reaction, index) => {
        return (
          <Reaction
            reactionImage={emojiList[+reaction]}
            key={index}
            onFinished={deleteReaction}
          />
        );
      })}
      <ButtonGroup
        variant="outlined"
        aria-label="primary button group"
        className={classes.root}
      >
        {emojiList.map((url, index) => {
          return (
            <IconButton
              aria-label="reaction-0"
              key={index}
              className={classes.iconButton}
              onClick={() => emitReaction(index)}
            >
              <img
                src={url}
                alt={"reaction-" + index}
                className={classes.icon}
              ></img>
            </IconButton>
          );
        })}
      </ButtonGroup>
    </Fragment>
  );
}
