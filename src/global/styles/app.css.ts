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

export const themeGreenBorder = `1px solid ${themeGreenColor}`;
export const borderLCBorder = `1px solid ${borderLCColor}`;
export const borderHCBorder = `2px solid ${borderHCColor}`;

export const noBorder = style({
  border: "none",
});

export const roundBorder = style({
  borderRadius: vars.radius.md,
});

export const circularBorder = style({
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

export const borderLC = style({
  border: borderLCBorder,
});

export const borderHC = style({
  border: borderHCBorder,
});

export const borderBottom = style({
  borderBottom: borderLCBorder,
});

export const borderTop = style({
  borderTop: borderLCBorder,
});

export const borderLeft = style({
  borderLeft: borderLCBorder,
});

export const borderRight = style({
  borderRight: borderLCBorder,
});

export const borderTopShadow = style({
  borderTop: borderLCBorder,
  boxShadow: `0px -2px 4px rgba(0, 0, 0, 0.1)`,
});

export const borderBottomShadow = style({
  borderBottom: borderLCBorder,
  boxShadow: `0px 2px 4px rgba(0, 0, 0, 0.1)`,
});

export const borderLeftShadow = style({
  borderLeft: borderLCBorder,
  boxShadow: `-2px 0px 4px rgba(0, 0, 0, 0.1)`,
});

export const borderRightShadow = style({
  borderRight: borderLCBorder,
  boxShadow: `2px 0px 4px rgba(0, 0, 0, 0.1)`,
});
