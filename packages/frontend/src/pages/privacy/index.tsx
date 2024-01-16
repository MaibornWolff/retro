import React from "react";
import { Header } from "../../common/components/Header";
import ArticleBox from "../../common/components/ArticleBox";
import { Typography } from "@mui/material";

const Index = () => {
  return (
    <>
      <Header />
      <ArticleBox>
        <Typography variant="h2">Privacy</Typography>
        <br />
        <Typography variant="body1">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
          invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
          accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
          sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
          elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
          diam voluptua. At vero eos et accusam et justo duo dolores et e
          <br />
          <br />
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
          invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
          accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea tak
        </Typography>
        <Typography variant="h4">Your Usage and Responsibilities</Typography>
      </ArticleBox>
    </>
  );
};

export default Index;
