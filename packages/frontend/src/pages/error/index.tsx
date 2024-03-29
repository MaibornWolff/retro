import React, { useEffect, useRef } from "react";
import Link from "next/link";

import { Typography } from "@mui/material";
import { useErrorContext } from "../../common/context/ErrorContext";
import { FlexBox } from "../../common/components/FlexBox";

const Index = () => {
  const { error, resetError } = useErrorContext();
  const errorType = useRef<string | undefined>(undefined);

  useEffect(() => {
    errorType.current = error?.type;
    resetError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getErrorMessage() {
    switch (errorType.current) {
      case "KICKED":
        return "You have been removed from the session.";
      case "REJECTED":
        return "Your join request has been rejected.";
      case "DISCONNECTED":
        return "You lost the connection to the session.";
      case "ROOM_NOT_FOUND":
        return "The session you wanted to join does not exist.";
      default:
        return "You were disconnected from the session.";
    }
  }

  return (
    <FlexBox flexDirection="column" alignItems="center">
      <h2
        style={{
          fontFamily: '"Permanent Marker", cursive',
          fontSize: "280%",
        }}
      >
        Oh no, an error occurred :(
      </h2>
      <Typography variant="body1">{getErrorMessage()}</Typography>
      <Link style={{ marginTop: 1 }} href="/">
        Return to Homepage
      </Link>
    </FlexBox>
  );
};

export default Index;
