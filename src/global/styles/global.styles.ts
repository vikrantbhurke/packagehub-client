import {
  oneBg,
  oneTx,
  twoBg,
  threeBg,
  borderLowContrast,
  borderHighContrast,
} from "./app.css";

export const mainContentWidth = 1000;
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
    border: borderHighContrast,
    borderRadius: isMobile ? 0 : 8,
  },
});

export const getItemCardStyles = (isMobile: boolean) => ({
  backgroundColor: oneBg,
  border: isMobile ? "none" : borderLowContrast,
  borderRadius: isMobile ? 0 : 10,
});

// Mantine Grid.Column Custom Child Component Styles
export const getGridItemBorderWithBorder = (isMobile: boolean) => {
  if (isMobile) {
    return {
      borderTop: "none",
      borderBottom: borderLowContrast,
      borderRight: "none",
      borderLeft: "none",
    };
  } else {
    return {
      border: borderLowContrast,
      borderRadius: "8px",
      transition: "box-shadow 0.3s ease",
    };
  }
};

export const getSubheadersStyles = (isMobile: boolean) => {
  return {
    borderBottom: borderLowContrast,
    borderLeft: isMobile ? "none" : borderLowContrast,
    borderRight: isMobile ? "none" : borderLowContrast,
    borderTop: "none",
  };
};

export const getPaginationStyles = (isMobile: boolean) => {
  return {
    borderTop: borderLowContrast,
    borderLeft: isMobile ? "none" : borderLowContrast,
    borderRight: isMobile ? "none" : borderLowContrast,
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
  content: { backgroundColor: `${oneBg}`, border: borderLowContrast },
  header: { backgroundColor: `${oneBg}` },
};

export const modalOverlayProps = {
  backgroundOpacity: 0.55,
  blur: 3,
};

export const getFormTextInput = (isFocused: boolean) => ({
  input: {
    padding: "1rem",
    backgroundColor: twoBg,
    border: isFocused ? borderHighContrast : "none",
  },
});

export const getComboboxTextInput = (isFocused: boolean) => ({
  input: {
    textAlign: "center" as const,
    padding: "1rem",
    color: oneTx,
    backgroundColor: twoBg,
    border: isFocused ? borderHighContrast : "none",
  },
});

export const getComboboxTextInputForPagination = () => ({
  input: {
    textAlign: "center" as const,
    color: oneTx,
    backgroundColor: threeBg,
    border: borderHighContrast,
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
