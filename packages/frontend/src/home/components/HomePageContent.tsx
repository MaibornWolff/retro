import React from "react";

import { RedirectToRetroButton } from "./RedirectToRetroButton";
import { RedirectToPlanningPokerButton } from "./RedirectToPlanningPokerButton";
import { FlexBox } from "../../common/components/FlexBox";
import { WelcomeTypewriter } from "./WelcomeTypewriter";
import Image from "next/image";
import { Box } from "@mui/material";
import Footer from "../../common/components/Footer";

export function HomePageContent() {
  return (
    <Box position="relative">
      <Image src="/hero.jpg" alt="hero-content" fill style={{ objectFit: "cover" }} />
      <FlexBox minHeight="100vh" justifyContent="center" alignItems="center" flexDirection="column">
        <WelcomeTypewriter />
        <FlexBox flexDirection="row">
          <RedirectToRetroButton />
          <RedirectToPlanningPokerButton />
        </FlexBox>
        <Footer />
      </FlexBox>
    </Box>
  );
}
