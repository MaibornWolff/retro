import { css } from "styled-components";

const sizes: any = {
  desktop: 1200,
  tablet: 768,
  phone: 576,
};

const media = Object.keys(sizes).reduce<
  Record<keyof typeof sizes, (l: TemplateStringsArray, ...p: any[]) => string>
>((acc: any, label: any) => {
  acc[label] = (literals: TemplateStringsArray, ...placeholders: any[]) =>
    css`
      @media (min-width: ${sizes[label] / 16}em) {
        ${css(literals, ...placeholders)};
      }
    `.join("");
  return acc;
}, {});

export default media;
