import { themeToVars } from "@mantine/vanilla-extract";
import { interFontStyle, oneTx, threeBg } from "./app.css";
import {
  Button,
  Text,
  createTheme,
  Pagination,
  Title,
  TextInput,
  Textarea,
  ActionIcon,
  PasswordInput,
  Combobox,
  Anchor,
  Tooltip,
} from "@mantine/core";

export const theme = createTheme({
  components: {
    Button: Button.extend({
      defaultProps: {
        color: oneTx,
        className: interFontStyle,
      },
    }),

    ActionIcon: ActionIcon.extend({
      defaultProps: {
        bg: "transparent",
        c: oneTx,
        size: "xs",
      },
    }),

    Text: Text.extend({
      defaultProps: {
        color: oneTx,
        fz: "sm",
        className: interFontStyle,
      },
    }),

    Textarea: Textarea.extend({
      defaultProps: {
        color: oneTx,
        radius: "md",
        className: interFontStyle,
      },
    }),

    TextInput: TextInput.extend({
      defaultProps: {
        color: oneTx,
        radius: "md",
        className: interFontStyle,
      },
    }),

    ComboboxOption: Combobox.Option.extend({
      defaultProps: {
        className: interFontStyle,
      },
    }),

    PasswordInput: PasswordInput.extend({
      defaultProps: {
        color: oneTx,
        radius: "md",
        className: interFontStyle,
      },
    }),

    Title: Title.extend({
      defaultProps: {
        c: oneTx,
        className: interFontStyle,
      },
    }),

    Anchor: Anchor.extend({
      defaultProps: {
        className: interFontStyle,
      },
    }),

    Tooltip: Tooltip.extend({
      defaultProps: {
        className: interFontStyle,
      },
    }),

    Pagination: Pagination.extend({
      defaultProps: {
        size: "sm",
        m: "xs",
        radius: "sm",
        siblings: 0,
      },

      styles: {
        control: {
          color: oneTx,
          backgroundColor: threeBg,
          border: "none",
          className: interFontStyle,
        },
      },
    }),
  },
});

export const vars = themeToVars(theme);
