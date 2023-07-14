import React, { useContext } from "react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { HomePage } from "./home/components/HomePage";
import { RetroPage } from "./retro/components/RetroPage";
import { PokerPage } from "./poker/components/PokerPage";
import { ErrorPage } from "./ErrorPage";
import { RetroContextProvider } from "./retro/context/RetroContext";
import { PokerContextProvider } from "./poker/context/PokerContext";
import { ColorThemeContext } from "./common/context/ColorThemeContext";
import { UserContextProvider } from "./common/context/UserContext";
import { ErrorContextProvider } from "./common/context/ErrorContext";
import { RoomContextProvider } from "./common/context/RoomContext";
import { ExportRetroContextProvider } from "./retro/context/ExportRetroContext";

export function App() {
  const { currentTheme } = useContext(ColorThemeContext);

  const retroPage = (
    <RoomContextProvider>
      <UserContextProvider>
        <RetroContextProvider>
          <ExportRetroContextProvider>
            <RetroPage />
          </ExportRetroContextProvider>
        </RetroContextProvider>
      </UserContextProvider>
    </RoomContextProvider>
  );

  const pokerPage = (
    <RoomContextProvider>
      <UserContextProvider>
        <PokerContextProvider>
          <PokerPage />
        </PokerContextProvider>
      </UserContextProvider>
    </RoomContextProvider>
  );

  return (
    <ErrorContextProvider>
      <ThemeProvider theme={currentTheme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/retro" element={retroPage} />
            <Route path="/retro/:sessionId" element={retroPage} />
            <Route path="/poker" element={pokerPage} />
            <Route path="/poker/:sessionId" element={pokerPage} />
            <Route path="/error" element={<ErrorPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </ErrorContextProvider>
  );
}
