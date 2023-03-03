import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

import { PageNotFoundContainer, PageNotFoundText } from "./common/styled-components";
import { useErrorContext } from "./common/context/ErrorContext";

export default function ErrorPage() {
  const { setIsError } = useErrorContext();

  useEffect(() => {
    // save local error
    setIsError(false);
  }, [setIsError]);

  return (
    <PageNotFoundContainer>
      <PageNotFoundText>Oh no, an error occurred :(</PageNotFoundText>
      <Typography variant="body1">You were disconnected from the session.</Typography>
      <Link style={{ marginTop: "12px" }} to="/">
        Return to Homepage
      </Link>
    </PageNotFoundContainer>
  );
}
