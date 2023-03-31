import React from "react";
import { Link, Typography } from "@mui/material";
import { usePokerContext } from "../context/PokerContext";
import { FlexBox } from "../../common/components/FlexBox";

export function PokerTitle() {
  const { storyTitle, storyUrl } = usePokerContext().pokerState.story;

  return (
    <FlexBox justifyContent="center">
      <Typography variant="h4" py={2}>
        {storyUrl ? (
          <Link href={storyUrl} target="_blank" rel="nofollow noreferrer">
            {storyTitle}
          </Link>
        ) : (
          storyTitle
        )}
      </Typography>
    </FlexBox>
  );
}
