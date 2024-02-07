import Markdown from "react-markdown";
import ArticleBox from "./ArticleBox";
import React, { PropsWithChildren } from "react";
import { Typography } from "@mui/material";

interface MarkdownArticleProps {
  mdContent: string;
}

export default function MarkdownArticle({ mdContent }: MarkdownArticleProps) {
  const components = {
    h1: ({ children }: PropsWithChildren) => (
      <Typography variant="h1" sx={{ marginBottom: "1rem" }}>
        {children}
      </Typography>
    ),
    h2: ({ children }: PropsWithChildren) => (
      <Typography variant="h2" sx={{ marginBottom: "1rem" }}>
        {children}
      </Typography>
    ),
    h3: ({ children }: PropsWithChildren) => (
      <Typography variant="h3" sx={{ marginBottom: "1rem" }}>
        {children}
      </Typography>
    ),
    h4: ({ children }: PropsWithChildren) => (
      <Typography variant="h4" sx={{ marginBottom: "1rem" }}>
        {children}
      </Typography>
    ),
    h5: ({ children }: PropsWithChildren) => (
      <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
        {children}
      </Typography>
    ),
    h6: ({ children }: PropsWithChildren) => (
      <Typography variant="h6" sx={{ marginBottom: "1rem" }}>
        {children}
      </Typography>
    ),
    p: ({ children }: PropsWithChildren) => (
      <Typography variant="body1" sx={{ marginBottom: "1rem" }}>
        {children}
      </Typography>
    ),
  };
  return (
    <ArticleBox>
      <Markdown components={components}>{mdContent}</Markdown>
    </ArticleBox>
  );
}
