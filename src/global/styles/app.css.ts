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
export const borderLowContrastColor = "var(--border-low-contrast)";
export const borderHighContrastColor = "var(--border-high-contrast)";
export const themeGreen = "var(--theme-green)";

export const borderLowContrast = `1px solid ${borderLowContrastColor}`;
export const borderHighContrast = `2px solid ${borderHighContrastColor}`;

export const noBorder = style({
  border: "none",
});

export const roundBorder = style({
  borderRadius: vars.radius.md,
});

export const circularBorder = style({
  borderRadius: vars.radius.xl,

  border: borderHighContrast,
  ":hover": {
    border: borderHighContrast,
  },
  ":active": {
    border: borderHighContrast,
  },
  ":focus": {
    border: borderHighContrast,
  },
});

export const inputStyles = style({
  color: oneTx,
  backgroundColor: oneBg,

  "::placeholder": {
    color: "gray",
  },
});

export const oneTxOneBg = style({
  color: oneTx,
  backgroundColor: oneBg,

  selectors: {
    [vars.darkSelector]: {
      color: oneTx,
      backgroundColor: oneBg,
    },
  },
});

export const oneTxTwoBg = style({
  color: oneTx,
  backgroundColor: twoBg,

  selectors: {
    [vars.darkSelector]: {
      color: oneTx,
      backgroundColor: twoBg,
    },
  },
});

export const oneTxThreeBg = style({
  color: oneTx,
  backgroundColor: threeBg,

  selectors: {
    [vars.darkSelector]: {
      color: oneTx,
      backgroundColor: threeBg,
    },
  },
});

export const normalPseudo = style({
  color: oneTx,

  backgroundColor: oneBg,
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

export const oneTxOneBgButtonPseudo = style({
  color: oneTx,

  backgroundColor: oneBg,
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

export const oneTxTwoBgButtonPseudo = style({
  color: oneTx,

  backgroundColor: twoBg,
  ":hover": {
    color: oneTx,
    backgroundColor: threeBg,
  },
  ":active": {
    color: oneTx,
    backgroundColor: fourBg,
  },
  ":focus": {
    color: oneTx,
    backgroundColor: fourBg,
  },
  selectors: {
    [vars.darkSelector]: {
      color: oneTx,
      backgroundColor: twoBg,
    },
    [`${vars.darkSelector}:hover`]: {
      color: oneTx,
      backgroundColor: threeBg,
    },
    [`${vars.darkSelector}:active`]: {
      color: oneTx,
      backgroundColor: fourBg,
    },
    [`${vars.darkSelector}:focus`]: {
      color: oneTx,
      backgroundColor: fourBg,
    },
  },
});

export const oneTxThreeBgButtonPseudo = style({
  color: oneTx,

  backgroundColor: threeBg,
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

export const border = style({
  border: borderLowContrast,
});

export const borderBottom = style({
  borderBottom: borderLowContrast,
});

export const borderTop = style({
  borderTop: borderLowContrast,
});

export const borderLeft = style({
  borderLeft: borderLowContrast,
});

export const borderRight = style({
  borderRight: borderLowContrast,
});

export const borderTopShadow = style({
  borderTop: borderLowContrast,
  boxShadow: `0px -2px 4px rgba(0, 0, 0, 0.1)`,
});

export const borderBottomShadow = style({
  borderBottom: borderLowContrast,
  boxShadow: `0px 2px 4px rgba(0, 0, 0, 0.1)`,
});

export const borderLeftShadow = style({
  borderLeft: borderLowContrast,
  boxShadow: `-2px 0px 4px rgba(0, 0, 0, 0.1)`,
});

export const borderRightShadow = style({
  borderRight: borderLowContrast,
  boxShadow: `2px 0px 4px rgba(0, 0, 0, 0.1)`,
});
