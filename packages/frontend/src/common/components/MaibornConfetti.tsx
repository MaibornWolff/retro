import React from "react";
import { useTheme } from "@mui/material";
import { loadFull } from "tsparticles";
import Particles from "react-particles";

import getMaibornConfettiConfig from "../../retro/config/particleConfig";

export default function MaibornConfetti() {
  const theme = useTheme();
  const particleColors = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.highlightColorPrimary,
    theme.palette.highlightColorSecondary,
  ];
  const particleInit = async (engine: any) => {
    await loadFull(engine);
  };

  return <Particles init={particleInit} options={getMaibornConfettiConfig(particleColors)} />;
}
