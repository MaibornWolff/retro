import React from "react";

import { RedirectToRetroButton } from "./RedirectToRetroButton";
import { RedirectToPlanningPokerButton } from "./RedirectToPlanningPokerButton";
import { FlexBox } from "../../common/components/FlexBox";
import { WelcomeTypewriter } from "./WelcomeTypewriter";
import Image from "next/image";
import { Box, useTheme } from "@mui/material";

export function HomePageContent() {
  const theme = useTheme();
  return (
    <>
      <Box position="relative">
        <Image src="/hero.jpg" alt="hero-content" fill style={{ objectFit: "cover" }} />
        <FlexBox
          minHeight={`calc(100vh - ${theme.spacing(4)})`}
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <WelcomeTypewriter />
          <FlexBox flexDirection="row">
            <RedirectToRetroButton />
            <RedirectToPlanningPokerButton />
          </FlexBox>
        </FlexBox>
      </Box>
    </>
  );
}
