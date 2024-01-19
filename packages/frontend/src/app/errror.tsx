"use client";

import React, { useEffect, useRef } from "react";
import { Typography } from "@mui/material";
import Link from "next/link";
import { FlexBox } from "../common/components/FlexBox";
import { useErrorContext } from "../common/context/ErrorContext";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { error: customError, resetError } = useErrorContext();
  const errorType = useRef<string | undefined>(undefined);

  useEffect(() => {
    errorType.current = customError?.type;
    console.error(error);
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
}
