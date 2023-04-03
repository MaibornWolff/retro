import React from "react";
import { Typography } from "@mui/material";
import { usePokerContext } from "../../context/PokerContext";
import { PokerCard } from "./PokerCard";
import { User } from "../../../common/types/commonTypes";

function getTShirtSizeFromValue(value?: number): string | undefined {
  if (!value) return;
  return ["XS", "S", "M", "L", "XL", "XXL"][value];
}

interface PokerCardBackProps {
  voted: boolean;
  pokerUser: User;
  userVote?: number;
}

export function PokerCardBack({ voted, pokerUser, userVote }: PokerCardBackProps) {
  const { pokerState } = usePokerContext();
  const pokerUnitType = pokerState.pokerUnit.unitType;
  const fontColor = voted ? "black" : "white";

  return (
    <PokerCard
      voted={voted}
      pokerUser={pokerUser}
      FooterComponent={
        <Typography variant="h4" align="center" pb={2} color={fontColor}>
          {pokerUnitType === "tshirt" ? getTShirtSizeFromValue(userVote) ?? "" : userVote ?? ""}
        </Typography>
      }
    />
  );
}
