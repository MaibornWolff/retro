import React from "react";
import Typewriter from "typewriter-effect";
import { Grid, Typography, useTheme } from "@mui/material";

import { RedirectToRetroButton } from "./RedirectToRetroButton";
import hero from "../assets/hero.jpg";
import { RedirectToPlanningPokerButton } from "./RedirectToPlanningPokerButton";

export function HomePage() {
  const theme = useTheme();

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        position: "fixed",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${hero})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <Grid
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
        }}
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <Typography
            variant="h2"
            sx={{
              margin: theme.spacing(2),
            }}
          >
            <Typewriter
              onInit={(typewriter: any) => {
                typewriter.start();
              }}
              options={{
                strings: [
                  "Welcome to Retro.",
                  "Willkommen zu Retro.",
                  "Bienvenue à Retro.",
                  "Selamat Datang di Retro.",
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container direction="row" justifyContent="space-around" alignItems="center">
            <Grid item>
              <RedirectToRetroButton />
            </Grid>
            <Grid item>
              <RedirectToPlanningPokerButton />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
