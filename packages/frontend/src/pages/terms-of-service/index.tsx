import React from "react";
import { Header } from "../../common/components/Header";
import MarkdownArticle from "../../common/components/MarkdownArticle";
import termsOfService from "../../constants/TermsOfService.md";

export default function Page() {
  return (
    <>
      <Header />
      <MarkdownArticle mdContent={termsOfService} />
    </>
  );
}
