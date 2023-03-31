import { Typography } from "@mui/material";
import Typewriter from "typewriter-effect";
import React from "react";

export function WelcomeTypewriter() {
  return (
    <Typography variant="h2" m={2}>
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
  );
}
