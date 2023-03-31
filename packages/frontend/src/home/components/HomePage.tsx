import React from "react";
import { Box } from "@mui/material";

import { RedirectToRetroButton } from "./RedirectToRetroButton";
import hero from "../assets/hero.jpg";
import { RedirectToPlanningPokerButton } from "./RedirectToPlanningPokerButton";
import { FlexBox } from "../../common/components/FlexBox";
import { WelcomeTypewriter } from "./WelcomeTypewriter";

export function HomePage() {
  return (
    <Box
      width="100%"
      height="100vh"
      position="fixed"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${hero})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <FlexBox minHeight="100vh" justifyContent="center" alignItems="center" flexDirection="column">
        <WelcomeTypewriter />
        <FlexBox flexDirection="row">
          <RedirectToRetroButton />
          <RedirectToPlanningPokerButton />
        </FlexBox>
      </FlexBox>
    </Box>
  );
}
