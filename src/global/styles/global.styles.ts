import { Breakpoint } from "../enums";
import {
  oneBg,
  oneTx,
  twoBg,
  threeBg,
  LCBorder,
  HCBorder,
  themeGreenBorder,
  oneTxThreeBgButtonPseudoStyle,
  oneTxOneBgButtonPseudoStyle,
} from "./app.css";

export const errorFontSize = 12;
export const textBold = 500;
export const textBolder = 700;
export const buttonHeight = 40;
export const layoutCompHeight = 60;
export const largeButtonHeight = 60;
export const mainContentWidth = Breakpoint.md;
export const aboutContentWidth = Breakpoint.sm;
export const listItemHeight = 80;
export const responsiveBreakpoint = "sm";

export const modal = {
  content: {
    backgroundColor: oneBg,
    borderRadius: 10,
  },
  header: { backgroundColor: oneBg },
  title: {
    textAlign: "center" as const,
    width: "100%",
    fontWeight: 500,
    fontFamily: "Inter",
  },
};

export const modalOverlayProps = {
  backgroundOpacity: 0.55,
  blur: 3,
};

export const wordBreakWhiteSpace = {
  whiteSpace: "normal",
  wordBreak: "break-word" as const,
};

export const stringTruncate = {
  display: "inline-block",
  maxWidth: "20ch",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

export const getRichTextEditorStyles = (isFocused: boolean) => ({
  root: {
    border: isFocused ? HCBorder : "none",
  },
  control: { backgroundColor: oneBg },
  toolbar: { backgroundColor: twoBg, border: "none" },
  content: {
    minHeight: 120,
    maxHeight: 120,
    overflowY: "auto",
    backgroundColor: twoBg,
    fontSize: "14px",
  },
});

export const getDropdownStyles = (colorScheme: string) => ({
  dropdownBg: colorScheme === "dark" ? threeBg : oneBg,
});

export const getDropdownButtonStyles = (colorScheme: string) => ({
  dropdownButtonBg:
    colorScheme === "dark"
      ? oneTxThreeBgButtonPseudoStyle
      : oneTxOneBgButtonPseudoStyle,
});

export const getAppShellStyles = (
  isMobile: boolean,
  footerHeight: number,
  headerHeight: number
) => ({
  header: { height: headerHeight },
  footer: {
    height: isMobile ? footerHeight : 0,
  },
});

export const getSearchTextInputStyles = (isMobile: boolean, width: number) => ({
  input: {
    backgroundColor: "transparent",
    height: isMobile ? layoutCompHeight : "100%",
    width,
    maxWidth: isMobile ? "100%" : 500,
    border: themeGreenBorder,
    borderRadius: isMobile ? 0 : 8,
    fontFamily: "Inter",
  },
});

export const getGridListItemBorderWithBorderStyles = (isMobile: boolean) => {
  if (isMobile) {
    return {
      border: "none",
    };
  } else {
    return {
      border: LCBorder,
      borderRadius: 10,
    };
  }
};

export const getPaginationStyles = (isMobile: boolean) => {
  return {
    borderTop: isMobile ? "none" : LCBorder,
    borderLeft: isMobile ? "none" : LCBorder,
    borderRight: isMobile ? "none" : LCBorder,
    borderBottom: "none",
  };
};

export const getToproundBorderStyles = (isMobile: boolean) => {
  return {
    borderRadius: isMobile ? "0" : "10px 10px 0 0",
  };
};

export const getBottomroundBorderStyles = (isMobile: boolean) => {
  return {
    borderRadius: isMobile ? "0" : "0 0 10px 10px",
  };
};

export const addBoxShadowStyles = (e: any) => {
  e.currentTarget.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.2)";
};

export const removeBoxShadowStyles = (e: any) => {
  e.currentTarget.style.boxShadow = "none";
};

export const getFormTextInputStyles = (isFocused: boolean) => ({
  input: {
    padding: "1rem",
    backgroundColor: twoBg,
    border: isFocused ? HCBorder : "none",
    fontFamily: "Inter",
  },
});

export const getComboboxTextInputStyles = (isFocused: boolean) => ({
  input: {
    textAlign: "center" as const,
    padding: "1rem",
    color: oneTx,
    backgroundColor: twoBg,
    border: isFocused ? HCBorder : "none",
    fontFamily: "Inter",
  },
});

export const getComboboxTextInputForPaginationStyles = () => ({
  input: {
    textAlign: "center" as const,
    color: oneTx,
    backgroundColor: threeBg,
    border: HCBorder,
  },
});

export const getSubheaderButtonStyles = (isActive: boolean) => {
  return {
    backgroundColor: oneBg,
    color: oneTx,
    borderRadius: 0,
    borderBottom: isActive ? `2px solid ${oneTx}` : "none",
    borderTop: "none",
    borderLeft: "none",
    borderRight: "none",
  };
};
