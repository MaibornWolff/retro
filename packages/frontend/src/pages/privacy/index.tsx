import React from "react";
import { Header } from "../../common/components/Header";
import MarkdownArticle from "../../common/components/MarkdownArticle";
import privacy from "../../constants/privacy.md";

const Index = () => {
  return (
    <>
      <Header />
      <MarkdownArticle mdContent={privacy} />
    </>
  );
};

export default Index;
