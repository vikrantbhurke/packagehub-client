import { CSSVariablesResolver, lighten, darken } from "@mantine/core";

export const DarkOne = "#09090B";
export const DarkTwo = lighten("#09090B", 0.05);
export const DarkThree = lighten("#09090B", 0.08);
export const DarkFour = lighten("#09090B", 0.11);
export const DarkFive = lighten("#09090B", 0.14);
export const DarkBorder = lighten("#09090B", 0.2);
export const LightGreenOne = lighten("#2FBAAA", 0.8);
export const LightGreenTwo = lighten("#2FBAAA", 0.6);
export const LightOne = "#FFFFFF";
export const LightTwo = darken("#F8FAFD", 0.05);
export const LightThree = darken("#F8FAFD", 0.08);
export const LightFour = darken("#F8FAFD", 0.11);
export const LightFive = darken("#F8FAFD", 0.14);
export const LightBorder = darken("#F8FAFD", 0.2);
export const DarkGreenOne = darken("#2FBAAA", 0.8);
export const DarkGreenTwo = darken("#2FBAAA", 0.6);

export const resolveCssVariables: CSSVariablesResolver = () => cssVariables();

export const cssVariables = () => {
  return {
    variables: {
      "--theme-primary": "#000",
      "--theme-green": "#2FBAAA",
      "--error-red": "#E0312B",
    },
    light: {
      "--primary-text": DarkOne,
      "--primary-background": LightOne,
      "--secondary-text": DarkTwo,
      "--secondary-background": LightTwo,
      "--tertiary-text": DarkThree,
      "--tertiary-background": LightThree,
      "--quaternary-text": DarkFour,
      "--quaternary-background": LightFour,
      "--quinary-text": DarkFive,
      "--quinary-background": LightFive,
      "--border-low-contrast": LightBorder,
      "--border-high-contrast": DarkBorder,
      "--theme-light-green-one-bg": LightGreenOne,
      "--theme-light-green-two-bg": LightGreenTwo,
    },
    dark: {
      "--primary-text": LightOne,
      "--primary-background": DarkOne,
      "--secondary-text": LightTwo,
      "--secondary-background": DarkTwo,
      "--tertiary-text": LightThree,
      "--tertiary-background": DarkThree,
      "--quaternary-text": LightFour,
      "--quaternary-background": DarkFour,
      "--quinary-text": LightFive,
      "--quinary-background": DarkFive,
      "--border-low-contrast": DarkBorder,
      "--border-high-contrast": LightBorder,
      "--theme-light-green-one-bg": DarkGreenOne,
      "--theme-light-green-two-bg": DarkGreenTwo,
    },
  };
};
