import React from "react";
import { Typography } from "@mui/material";
import { usePokerContext } from "../../context/PokerContext";
import PokerCard from "./PokerCard";
import { User } from "../../../common/types/commonTypes";

function getTShirtSizeFromValue(value?: number): string | undefined {
  if (!value) return;
  return ["XS", "S", "M", "L", "XL", "XXL"][value];
}

interface PokerCardBackProps {
  styleProps: { backgroundColor: string };
  pokerUser: User;
  userVote?: number;
}

export default function PokerCardBack({ styleProps, pokerUser, userVote }: PokerCardBackProps) {
  const { pokerState } = usePokerContext();
  const pokerUnitType = pokerState.pokerUnit.unitType;

  return (
    <PokerCard
      styleProps={styleProps}
      pokerUser={pokerUser}
      FooterComponent={
        <Typography color="secondary" variant="h4" align="center" paddingBottom="16px">
          {pokerUnitType === "tshirt" ? getTShirtSizeFromValue(userVote) ?? "" : userVote ?? ""}
        </Typography>
      }
    />
  );
}
