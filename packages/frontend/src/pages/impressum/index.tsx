import React from "react";
import { Header } from "../../common/components/Header";
import MarkdownArticle from "../../common/components/MarkdownArticle";
import impressum from "../../constants/impressum.md";

const Index = () => {
  return (
    <>
      <Header />
      <MarkdownArticle mdContent={impressum} />
    </>
  );
};

export default Index;
