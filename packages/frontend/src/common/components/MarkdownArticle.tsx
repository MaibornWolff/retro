import Markdown from "react-markdown";
import ArticleBox from "./ArticleBox";
import React, { PropsWithChildren } from "react";
import { Typography, TypographyVariant } from "@mui/material";

interface MarkdownArticleProps {
  mdContent: string;
}

interface componentMapping {
  markdownComponent: string;
  muiTypoVariant: TypographyVariant;
}

export default function MarkdownArticle({ mdContent }: MarkdownArticleProps) {
  const componentMappings: componentMapping[] = [
    { markdownComponent: "h1", muiTypoVariant: "h1" },
    { markdownComponent: "h2", muiTypoVariant: "h2" },
    { markdownComponent: "h3", muiTypoVariant: "h3" },
    { markdownComponent: "h4", muiTypoVariant: "h4" },
    { markdownComponent: "h5", muiTypoVariant: "h5" },
    { markdownComponent: "h6", muiTypoVariant: "h6" },
    { markdownComponent: "p", muiTypoVariant: "body1" },
  ];

  const components: { [key: string]: React.ComponentType<PropsWithChildren> } = {};

  componentMappings.reduce((acc, { markdownComponent, muiTypoVariant }) => {
    acc[markdownComponent] = ({ children }: PropsWithChildren) => (
      <Typography variant={muiTypoVariant} sx={{ marginBottom: "1rem" }}>
        {children}
      </Typography>
    );
    return acc;
  }, components);
  return (
    <ArticleBox>
      <Markdown components={components}>{mdContent}</Markdown>
    </ArticleBox>
  );
}
