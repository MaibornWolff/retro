import React from "react";

interface CardTextProps {
  text: string;
  isSelectable?: boolean;
  withHyperlinks?: boolean;
}

export function CardText({ text, isSelectable, withHyperlinks }: CardTextProps) {
  function createContentWithLinks(content: string) {
    // Regex for matching every kind of URLs
    const urls = /(?:\w+:\/\/[\w.]+|[\w.]+\.\w+).*/.exec(content);

    urls?.forEach((url: string) => {
      const editedUrl = !url.includes("//") ? "https://" + url : url;
      content = content.replace(
        url,
        `<a href="${editedUrl}" target="_blank" style={{    color: theme.palette.primary.main,
    borderBottom: "dashed 1px",
    borderColor: theme.palette.primary.main,
    textDecoration: "none"}}>${url}</a>`
      );
    });

    return content;
  }

  const content = withHyperlinks ? createContentWithLinks(text) : text;

  return (
    <span
      style={{
        /* These are technically the same, but use both */
        overflowWrap: "break-word",
        wordWrap: "break-word",
        width: "100%",

        msWordBreak: "break-all",
        wordBreak: "break-word",

        /* Adds a hyphen where the word breaks, if supported */
        msHyphens: "auto",
        hyphens: "auto",

        userSelect: isSelectable ? "auto" : "none",
      }}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
