import { Typography } from "@mui/material";
import Typewriter, { TypewriterClass } from "typewriter-effect";
import React from "react";

export function WelcomeTypewriter() {
  return (
    <Typography variant="h1" m={2} zIndex={2}>
      <Typewriter
        onInit={(typewriter: TypewriterClass) => {
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
