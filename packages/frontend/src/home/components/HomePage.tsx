import React from "react";
import Typewriter from "typewriter-effect";
import { Grid, Typography, useTheme } from "@mui/material";

import { PlanningPokerDialog } from "./PlanningPokerDialog";
import { Hero } from "../../common/styled-components";
import { RedirectToRetroButton } from "./RedirectToRetroButton";
import hero from "../assets/hero.jpg";

export function HomePage() {
  const theme = useTheme();

  return (
    <Hero img={hero}>
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
              color: theme.palette.primary.main,
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
              <PlanningPokerDialog />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Hero>
  );
}
