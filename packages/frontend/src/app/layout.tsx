import React from "react";
import { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ColorThemeContextProvider } from "../common/context/ColorThemeContext";
import { ErrorContextProvider } from "../common/context/ErrorContext";
import { CssBaseline } from "@mui/material";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to Next.js",
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ErrorContextProvider>
          <ColorThemeContextProvider>
            <CssBaseline />
            <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
          </ColorThemeContextProvider>
        </ErrorContextProvider>
      </body>
    </html>
  );
}
