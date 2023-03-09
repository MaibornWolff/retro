import React, { useContext } from "react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "./home/components/HomePage";
import RetroPage from "./retro/components/RetroPage";
import PokerPage from "./poker/components/PokerPage";
import ErrorPage from "./ErrorPage";
import RetroContextProvider from "./retro/context/RetroContext";
import PokerContextProvider from "./poker/context/PokerContext";
import { ColorThemeContext } from "./common/context/ColorThemeContext";
import UserContextProvider from "./common/context/UserContext";
import ErrorContextProvider from "./common/context/ErrorContext";
import RoomContextProvider from "./common/context/RoomContext";
import ExportRetroContextProvider from "./retro/context/ExportRetroContext";
import { Provider } from "react-redux";
import { store } from "./store";

export default function App() {
  const { currentTheme } = useContext(ColorThemeContext);

  return (
    <ErrorContextProvider>
      <Provider store={store}>
        <ThemeProvider theme={currentTheme}>
          <CssBaseline />
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/retro/*"
                element={
                  <RoomContextProvider>
                    <UserContextProvider>
                      <RetroContextProvider>
                        <ExportRetroContextProvider>
                          <RetroPage />
                        </ExportRetroContextProvider>
                      </RetroContextProvider>
                    </UserContextProvider>
                  </RoomContextProvider>
                }
              />
              <Route
                path="/poker/*"
                element={
                  <RoomContextProvider>
                    <UserContextProvider>
                      <PokerContextProvider>
                        <PokerPage />
                      </PokerContextProvider>
                    </UserContextProvider>
                  </RoomContextProvider>
                }
              />
              <Route path="/error" element={<ErrorPage />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </Provider>
    </ErrorContextProvider>
  );
}
