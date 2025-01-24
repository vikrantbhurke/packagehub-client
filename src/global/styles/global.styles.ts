import {
  oneBg,
  oneTx,
  twoBg,
  threeBg,
  borderLCBorder,
  borderHCBorder,
  themeGreenBorder,
} from "./app.css";

export const mainContentWidth = 1000;
export const aboutContentWidth = 700;
export const quoteCardMaxWidth = 600;
export const subheaderHeight = 60;
export const headerHeight = 60;
export const footerHeight = 60;
export const smallButtonHeight = 40;
export const largeButtonHeight = 60;
export const listItemHeight = 80;
export const navbarAsideWidth = 320;
export const responsiveBreakpoint = "md";

export const getListButtonHeight = (isMobile: boolean) =>
  isMobile ? largeButtonHeight : smallButtonHeight;

export const getComboboxStyles = (colorScheme: string) => ({
  optionBg: colorScheme === "dark" ? twoBg : oneBg,
  dropdownBg: colorScheme === "dark" ? oneBg : twoBg,
});

// Component Styles
export const getAppShell = (
  isMobile: boolean,
  footerHeight: number,
  headerHeight: number
) => ({
  header: { height: headerHeight },
  footer: {
    height: isMobile ? footerHeight : 0,
  },
});

export const getSearchTextInput = (isMobile: boolean, width: number) => ({
  input: {
    backgroundColor: "transparent",
    height: isMobile ? headerHeight : "100%",
    width,
    maxWidth: isMobile ? "100%" : 500,
    border: themeGreenBorder,
    borderRadius: isMobile ? 0 : 8,
  },
});

export const getItemCardStyles = (isMobile: boolean) => ({
  backgroundColor: oneBg,
  border: isMobile ? "none" : borderLCBorder,
  borderRadius: isMobile ? 0 : 10,
});

export const getGridListItemBorderWithBorder = (isMobile: boolean) => {
  if (isMobile) {
    return {
      borderTop: "none",
      borderBottom: "none",
      borderRight: "none",
      borderLeft: "none",
    };
  } else {
    return {
      border: borderLCBorder,
      borderRadius: "8px",
      transition: "box-shadow 0.3s ease",
    };
  }
};

export const getSubheadersStyles = (isMobile: boolean) => {
  return {
    borderBottom: borderLCBorder,
    borderLeft: isMobile ? "none" : borderLCBorder,
    borderRight: isMobile ? "none" : borderLCBorder,
    borderTop: "none",
  };
};

export const getPaginationStyles = (isMobile: boolean) => {
  return {
    borderTop: isMobile ? "none" : borderLCBorder,
    borderLeft: isMobile ? "none" : borderLCBorder,
    borderRight: isMobile ? "none" : borderLCBorder,
    borderBottom: "none",
  };
};

export const getToproundBorder = (isMobile: boolean) => {
  return {
    borderRadius: isMobile ? "0" : "10px 10px 0 0",
  };
};

export const getBottomroundBorder = (isMobile: boolean) => {
  return {
    borderRadius: isMobile ? "0" : "0 0 10px 10px",
  };
};

export const addBoxShadow = (e: any) => {
  e.currentTarget.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.2)";
};

export const removeBoxShadow = (e: any) => {
  e.currentTarget.style.boxShadow = "none";
};

export const modal = {
  content: { backgroundColor: `${oneBg}`, border: borderLCBorder },
  header: { backgroundColor: `${oneBg}` },
  title: {
    textAlign: "center" as const,
    width: "100%",
    fontWeight: 700,
  },
};

export const modalOverlayProps = {
  backgroundOpacity: 0.55,
  blur: 3,
};

export const getFormTextInput = (isFocused: boolean) => ({
  input: {
    padding: "1rem",
    backgroundColor: twoBg,
    border: isFocused ? borderHCBorder : "none",
  },
});

export const getComboboxTextInput = (isFocused: boolean) => ({
  input: {
    textAlign: "center" as const,
    padding: "1rem",
    color: oneTx,
    backgroundColor: twoBg,
    border: isFocused ? borderHCBorder : "none",
  },
});

export const getComboboxTextInputForPagination = () => ({
  input: {
    textAlign: "center" as const,
    color: oneTx,
    backgroundColor: threeBg,
    border: borderHCBorder,
  },
});

export const getSubheaderButton = (isActive: boolean) => {
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
