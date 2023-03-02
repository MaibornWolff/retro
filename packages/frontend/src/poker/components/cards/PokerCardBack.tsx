import React from "react";
import { Typography } from "@mui/material";
import { usePokerContext } from "../../context/PokerContext";
import PokerCard from "./PokerCard";
import { UserRole } from "../../../common/types/commonTypes";

function getTShirtSizeFromValue(value?: number): string | undefined {
  if (!value) return;
  return ["XS", "S", "M", "L", "XL", "XXL"][value];
}

interface PokerCardBackProps {
  styleProps: { backgroundColor: string };
  userName: string;
  userVote?: number;
  role: UserRole;
  userId: string;
}

export default function PokerCardBack({
  styleProps,
  userName,
  userVote,
  role,
  userId,
}: PokerCardBackProps) {
  const { pokerState } = usePokerContext();
  const pokerUnitType = pokerState.pokerUnit.unitType;

  return (
    <PokerCard
      styleProps={styleProps}
      userId={userId}
      userName={userName}
      role={role}
      FooterComponent={
        <Typography color="secondary" variant="h4" align="center" paddingBottom="16px">
          {pokerUnitType === "tshirt" ? getTShirtSizeFromValue(userVote) ?? "" : userVote ?? ""}
        </Typography>
      }
    />
  );
}
