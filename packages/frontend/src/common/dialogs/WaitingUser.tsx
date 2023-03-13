import React from "react";
import { Box, Typography } from "@mui/material";
import { Cancel, CheckCircle, Person } from "@mui/icons-material";
import { User } from "../types/commonTypes";
import { useUserContext } from "../context/UserContext";
import { isModerator } from "../utils/participantsUtils";
import TooltipIconButton from "../TooltipIconButton";

interface WaitingUserProps {
  waitingUser: User;
  handleRejectJoinUser: (userId: string) => void;
  handleAcceptJoinUser: (userId: string) => void;
}
export default function WaitingUser({
  waitingUser,
  handleRejectJoinUser,
  handleAcceptJoinUser,
}: WaitingUserProps) {
  const { user } = useUserContext();

  function handleRejectJoinUserClick() {
    handleRejectJoinUser(waitingUser.id);
  }

  function handleAcceptJoinUserClick() {
    handleAcceptJoinUser(waitingUser.id);
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          minHeight: "40px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Person />
          <Typography>{waitingUser.name}</Typography>
        </Box>
        <Box>
          {isModerator(user) && (
            <>
              <TooltipIconButton
                tooltipText="Accept User"
                aria-label="Accept User"
                color="success"
                onClick={handleAcceptJoinUserClick}
              >
                <CheckCircle />
              </TooltipIconButton>
              <TooltipIconButton
                tooltipText="Reject User"
                aria-label="Reject User"
                onClick={handleRejectJoinUserClick}
              >
                <Cancel color="error" />
              </TooltipIconButton>
            </>
          )}
        </Box>
      </Box>
    </>
  );
}
