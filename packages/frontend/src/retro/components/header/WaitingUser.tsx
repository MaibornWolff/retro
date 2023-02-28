import React from "react";
import { User } from "../../../common/types/commonTypes";
import { Box, IconButton, Typography } from "@mui/material";
import { Cancel, CheckCircle, Person } from "@mui/icons-material";
import { useUserContext } from "../../../common/context/UserContext";
import { isModerator } from "../../../common/utils/participantsUtils";
import { useRetroContext } from "../../context/RetroContext";

interface WaitingUserProps {
  waitingUser: User;
}
export default function WaitingUser({ waitingUser }: WaitingUserProps) {
  const { user } = useUserContext();
  const { handleRejectJoinUser, handleAcceptJoinUser } = useRetroContext();

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
              <IconButton aria-label="Accept" color="success" onClick={handleAcceptJoinUserClick}>
                <CheckCircle />
              </IconButton>
              <IconButton aria-label="Reject" onClick={handleRejectJoinUserClick}>
                <Cancel color="error" />
              </IconButton>
            </>
          )}
        </Box>
      </Box>
    </>
  );
}
