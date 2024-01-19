import React, { PropsWithChildren } from "react";
import { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ColorThemeContextProvider } from "../common/context/ColorThemeContext";
import { ErrorContextProvider } from "../common/context/ErrorContext";
import { CssBaseline } from "@mui/material";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to Next.js",
};

export default function RootLayout({ children }: PropsWithChildren) {
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
