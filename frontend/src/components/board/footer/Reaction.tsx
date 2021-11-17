import { makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";

const useStyles = makeStyles({
  //Keyframes for animating the reactions
  "@keyframes wobble": {
    "0%": {
      webkitTransform: "translateX(0)",
      transform: "translateX(0)",
      webkitTransformOrigin: "50% 50%",
      transformOrigin: "50% 50%",
    },
    "15%": {
      webkitTransform: "translateX(-30px) rotate(-6deg)",
      transform: "translateX(-30px) rotate(-6deg)",
    },
    "30%": {
      webkitTransform: "translateX(15px) rotate(6deg)",
      transform: "translateX(15px) rotate(6deg)",
    },
    "45%": {
      webkitTransform: "translateX(-15px) rotate(-3.6deg)",
      transform: "translateX(-15px) rotate(-3.6deg)",
    },
    "60%": {
      webkitTransform: "translateX(-6px) rotate(-1.2deg)",
      transform: "translateX(-6px) rotate(-1.2deg)",
    },
    "75%": {
      webkitTransform: "translateX(-15px) rotate(-3.6deg)",
      transform: "translateX(-15px) rotate(-3.6deg)",
    },
  },
  "@keyframes slideTop": {
    "0%": {
      opacity: 1,
      transform: "translateY(0)",
      webkitTransform: "translateY(0)",
    },
    "100%": {
      opacity: 1,
      transform: "translateY(-100px)",
      webkitTransform: "translateY(-100px)",
    },
  },
  "@keyframes fadeOut": {
    "0%": {
      webkitTransform: "translateY(0)",
      transform: "translateY(0)",
      opacity: "1",
    },
    "100%": {
      webkitTransform: "translateY(-50px)",
      transform: "translateY(-50px)",
      opacity: "0",
    },
  },
  "@keyframes fadeIn": {
    "0%": {
      opacity: "0",
    },
    "100%": {
      opacity: "1",
    },
  },
  reaction: {
    position: "fixed",
    right: "8em",
    bottom: "4em",
  },
  reactionImage: {
    maxHeight: "2em",
    opacity: "0",
  },
  reactionAnimationSlide: {
    animation: "$slideTop 2s ease-in-out both",
  },
  reactionAnimationWobble: {
    animation: "$wobble 2s ease-in-out 0.3s both",
  },
  reactAnimationFadeOut: {
    animation: "$fadeOut 0.7s ease-in-out 2s both",
  },
  reactAnimationFadeIn: {
    animation: "$fadeIn 0.3s ease-in-out both",
  },
});

export default function Reaction(props: any) {
  const classes = useStyles();

  function stopAnimation() {
    //Remove entries in state after finished Animation
    setTimeout(() => {
      props.onFinished();
    }, 2700);
  }

  useEffect(() => stopAnimation(), []);

  return (
    <div className={classes.reaction + " " + classes.reactionAnimationWobble}>
      <div className={classes.reactAnimationFadeIn}>
        <div className={classes.reactAnimationFadeOut}>
          <img
            src={props.reactionImage}
            className={
              classes.reactionImage + " " + classes.reactionAnimationSlide
            }
            alt="reaction"
          ></img>
        </div>
      </div>
    </div>
  );
}
