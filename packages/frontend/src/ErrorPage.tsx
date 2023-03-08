import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

import { PageNotFoundContainer, PageNotFoundText } from "./common/styled-components";
import { useErrorContext } from "./common/context/ErrorContext";

export default function ErrorPage() {
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
    <PageNotFoundContainer>
      <PageNotFoundText>Oh no, an error occurred :(</PageNotFoundText>
      <Typography variant="body1">{getErrorMessage()}</Typography>
      <Link style={{ marginTop: "12px" }} to="/">
        Return to Homepage
      </Link>
    </PageNotFoundContainer>
  );
}
