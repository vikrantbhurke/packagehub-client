import { vars } from "./theme";
import { style } from "@vanilla-extract/css";

export const oneTx = "var(--primary-text)";
export const oneBg = "var(--primary-background)";
export const twoTx = "var(--secondary-text)";
export const twoBg = "var(--secondary-background)";
export const threeTx = "var(--tertiary-text)";
export const threeBg = "var(--tertiary-background)";
export const fourTx = "var(--quaternary-text)";
export const fourBg = "var(--quaternary-background)";
export const fiveTx = "var(--quinary-text)";
export const fiveBg = "var(--quinary-background)";
export const borderLCColor = "var(--border-low-contrast)";
export const borderHCColor = "var(--border-high-contrast)";
export const themeGreenColor = "var(--theme-green)";
export const themeLightGreenOneBg = "var(--theme-light-green-one-bg)";
export const themeLightGreenTwoBg = "var(--theme-light-green-two-bg)";
export const errorRedColor = "var(--error-red)";

export const LCBorder = `1px solid ${borderLCColor}`;
export const HCBorder = `2px solid ${borderHCColor}`;
export const themeGreenBorder = `2px solid ${themeGreenColor}`;

export const inputStyle = style({
  color: oneTx,
  backgroundColor: oneBg,
  fontFamily: "Inter",

  "::placeholder": {
    color: "gray",
    fontSize: "11px",
    fontFamily: "Inter",
  },
});

export const skeletonStyle = style({
  backgroundColor: oneBg, // Main skeleton color
  selectors: {
    "&::before": {
      backgroundColor: oneBg, // Shimmer effect
    },
  },
});

export const interFontStyle = style({
  fontFamily: "Inter",
});

export const noBorderStyle = style({
  border: "none",
});

export const roundBorderStyle = style({
  borderRadius: vars.radius.md,
});

export const circularBorderStyle = style({
  borderRadius: vars.radius.xl,

  ":hover": {
    border: themeGreenBorder,
  },
  ":active": {
    border: themeGreenBorder,
  },
  ":focus": {
    border: themeGreenBorder,
  },
});

export const oneTxOneBgStyle = style({
  color: oneTx,
  backgroundColor: oneBg,
  fontFamily: "Inter",

  selectors: {
    [vars.darkSelector]: {
      color: oneTx,
      backgroundColor: oneBg,
    },
  },
});

export const oneTxTwoBgStyle = style({
  color: oneTx,
  backgroundColor: twoBg,
  fontFamily: "Inter",

  selectors: {
    [vars.darkSelector]: {
      color: oneTx,
      backgroundColor: twoBg,
    },
  },
});

export const themeTxStyle = style({
  color: oneTx,
  fontFamily: "Inter",
  transition: "color 0.2s ease-in-out",

  ":hover": {
    color: themeGreenColor,
  },
  ":active": {
    color: themeGreenColor,
  },
  ":focus": {
    color: themeGreenColor,
  },
});

export const oneTxGreenBgMenuButtonPseudoStyle = style({
  color: oneTx,
  backgroundColor: oneBg,
  transition: "background-color 0.2s ease-in-out",
  fontFamily: "Inter",

  ":hover": {
    color: oneTx,
    backgroundColor: themeLightGreenOneBg,
  },
  ":active": {
    color: oneTx,
    backgroundColor: themeLightGreenOneBg,
  },
  ":focus": {
    color: oneTx,
    backgroundColor: themeLightGreenOneBg,
  },

  selectors: {
    [vars.darkSelector]: {
      color: oneTx,
      backgroundColor: threeBg,
    },
    [`${vars.darkSelector}:hover`]: {
      color: oneTx,
      backgroundColor: themeLightGreenOneBg,
    },
    [`${vars.darkSelector}:active`]: {
      color: oneTx,
      backgroundColor: themeLightGreenOneBg,
    },
    [`${vars.darkSelector}:focus`]: {
      color: oneTx,
      backgroundColor: themeLightGreenOneBg,
    },
  },
});

export const oneTxGreenBgButtonPseudoStyle = style({
  color: oneTx,
  backgroundColor: twoBg,
  transition: "background-color 0.2s ease-in-out",
  fontFamily: "Inter",

  ":hover": {
    color: oneTx,
    backgroundColor: themeLightGreenOneBg,
  },
  ":active": {
    color: oneTx,
    backgroundColor: themeLightGreenOneBg,
  },
  ":focus": {
    color: oneTx,
    backgroundColor: themeLightGreenOneBg,
  },

  selectors: {
    [vars.darkSelector]: {
      color: oneTx,
      backgroundColor: twoBg,
    },
    [`${vars.darkSelector}:hover`]: {
      color: oneTx,
      backgroundColor: themeLightGreenOneBg,
    },
    [`${vars.darkSelector}:active`]: {
      color: oneTx,
      backgroundColor: themeLightGreenOneBg,
    },
    [`${vars.darkSelector}:focus`]: {
      color: oneTx,
      backgroundColor: themeLightGreenOneBg,
    },
  },
});

export const oneTxGreenTwoBgButtonPseudoStyle = style({
  color: oneTx,
  backgroundColor: fiveBg,
  transition: "background-color 0.2s ease-in-out",
  fontFamily: "Inter",

  ":hover": {
    color: oneTx,
    backgroundColor: themeLightGreenTwoBg,
  },
  ":active": {
    color: oneTx,
    backgroundColor: themeLightGreenTwoBg,
  },
  ":focus": {
    color: oneTx,
    backgroundColor: themeLightGreenTwoBg,
  },

  selectors: {
    [vars.darkSelector]: {
      color: oneTx,
      backgroundColor: fiveBg,
    },
    [`${vars.darkSelector}:hover`]: {
      color: oneTx,
      backgroundColor: themeLightGreenTwoBg,
    },
    [`${vars.darkSelector}:active`]: {
      color: oneTx,
      backgroundColor: themeLightGreenTwoBg,
    },
    [`${vars.darkSelector}:focus`]: {
      color: oneTx,
      backgroundColor: themeLightGreenTwoBg,
    },
  },
});

export const oneTxOneBgButtonPseudoStyle = style({
  color: oneTx,
  backgroundColor: oneBg,
  fontFamily: "Inter",

  ":hover": {
    color: oneTx,
    backgroundColor: twoBg,
  },
  ":active": {
    color: oneTx,
    backgroundColor: threeBg,
  },
  ":focus": {
    color: oneTx,
    backgroundColor: threeBg,
  },
  selectors: {
    [vars.darkSelector]: {
      color: oneTx,
      backgroundColor: oneBg,
    },
    [`${vars.darkSelector}:hover`]: {
      color: oneTx,
      backgroundColor: twoBg,
    },
    [`${vars.darkSelector}:active`]: {
      color: oneTx,
      backgroundColor: threeBg,
    },
    [`${vars.darkSelector}:focus`]: {
      color: oneTx,
      backgroundColor: threeBg,
    },
  },
});

export const oneTxThreeBgButtonPseudoStyle = style({
  color: oneTx,
  backgroundColor: threeBg,
  fontFamily: "Inter",

  ":hover": {
    color: oneTx,
    backgroundColor: fourBg,
  },
  ":active": {
    color: oneTx,
    backgroundColor: fiveBg,
  },
  ":focus": {
    color: oneTx,
    backgroundColor: fiveBg,
  },
  selectors: {
    [vars.darkSelector]: {
      color: oneTx,
      backgroundColor: threeBg,
    },
    [`${vars.darkSelector}:hover`]: {
      color: oneTx,
      backgroundColor: fourBg,
    },
    [`${vars.darkSelector}:active`]: {
      color: oneTx,
      backgroundColor: fiveBg,
    },
    [`${vars.darkSelector}:focus`]: {
      color: oneTx,
      backgroundColor: fiveBg,
    },
  },
});

export const borderLCStyle = style({
  border: LCBorder,
});

export const borderHCStyle = style({
  border: HCBorder,
});

export const borderTopStyle = style({
  borderTop: LCBorder,
});

export const borderShadowStyle = style({
  boxShadow: `0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)`,
});

export const borderTopShadowStyle = style({
  borderTop: LCBorder,
  boxShadow: `0px -2px 4px rgba(0, 0, 0, 0.1)`,
});

export const borderBottomShadowStyle = style({
  borderBottom: LCBorder,
  boxShadow: `0px 2px 4px rgba(0, 0, 0, 0.1)`,
});

export const borderLeftShadowStyle = style({
  borderLeft: LCBorder,
  boxShadow: `-2px 0px 4px rgba(0, 0, 0, 0.1)`,
});

export const borderRightShadowStyle = style({
  borderRight: LCBorder,
  boxShadow: `2px 0px 4px rgba(0, 0, 0, 0.1)`,
});
