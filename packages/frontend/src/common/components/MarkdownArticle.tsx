import Markdown from "react-markdown";
import ArticleBox from "./ArticleBox";
import React, { PropsWithChildren } from "react";
import { Typography, TypographyVariant } from "@mui/material";

interface MarkdownArticleProps {
  mdContent: string;
}

export default function MarkdownArticle({ mdContent }: MarkdownArticleProps) {
  const muiTypoVariantByMarkdownComponent: Record<string, TypographyVariant> = {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    h6: "h6",
    p: "body1",
  };

  const components = Object.fromEntries(
    Object.entries(muiTypoVariantByMarkdownComponent).map(
      ([markdownComponent, typographyVariant]) => [
        markdownComponent,
        ({ children }: PropsWithChildren) => (
          <Typography variant={typographyVariant} sx={{ marginBottom: "1rem" }}>
            {children}
          </Typography>
        ),
      ],
    ),
  );
  return (
    <ArticleBox>
      <Markdown components={components}>{mdContent}</Markdown>
    </ArticleBox>
  );
}
