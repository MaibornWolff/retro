import type { ISourceOptions } from "tsparticles-engine";

export default function getMaibornConfettiConfig(colors: string[]): ISourceOptions {
  return {
    fullScreen: {
      enable: true,
      zIndex: 1,
    },
    interactivity: {
      detectsOn: "window",
    },
    emitters: {
      position: {
        x: 50,
        y: 100,
      },
      rate: {
        quantity: 10,
        delay: 0.25,
      },
    },
    particles: {
      color: {
        value: colors,
      },
      move: {
        decay: 0.05,
        direction: "top",
        enable: true,
        gravity: {
          enable: true,
          maxSpeed: 150,
        },
        outModes: {
          top: "none",
          default: "destroy",
        },
        speed: { min: 25, max: 50 },
      },
      number: {
        value: 0,
      },
      opacity: {
        value: 1,
      },
      rotate: {
        value: {
          min: 0,
          max: 360,
        },
        direction: "random",
        animation: {
          enable: true,
          speed: 30,
        },
      },
      tilt: {
        direction: "random",
        enable: true,
        value: {
          min: 0,
          max: 360,
        },
        animation: {
          enable: true,
          speed: 30,
        },
      },
      size: {
        value: 8,
      },
      roll: {
        darken: {
          enable: true,
          value: 25,
        },
        enable: true,
        speed: {
          min: 5,
          max: 15,
        },
      },
      wobble: {
        distance: 30,
        enable: true,
        speed: {
          min: -7,
          max: 7,
        },
      },
      shape: {
        type: ["circle", "square", "polygon", "character", "character", "character", "image"],
        options: {
          image: [
            {
              src: "/mw_logo.png",
              width: 32,
              height: 32,
              particles: {
                size: {
                  value: 16,
                },
              },
            },
          ],
          polygon: [
            {
              sides: 5,
            },
            {
              sides: 6,
            },
          ],
          character: [
            {
              fill: true,
              font: "Verdana",
              value: ["🍀", "💻", "🚀", "⭐️", "⏳"],
              style: "",
              weight: 400,
            },
          ],
        },
      },
    },
  };
}
