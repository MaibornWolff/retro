import React from "react";
import { Link } from "react-router-dom";
import { PageNotFoundText, PageNotFoundContainer } from "./styled";

const NotFound = () => (
  <PageNotFoundContainer>
    <PageNotFoundText>Page Not Found :(</PageNotFoundText>
    <Link to="/">Return to Homepage</Link>
  </PageNotFoundContainer>
);

export default NotFound;
