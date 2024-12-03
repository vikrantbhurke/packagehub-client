import { themeToVars } from "@mantine/vanilla-extract";
import { oneTx, readexProFont, threeBg } from "./app.css";
import {
  Button,
  Text,
  createTheme,
  Pagination,
  Title,
  TextInput,
  Textarea,
  ActionIcon,
} from "@mantine/core";

export const theme = createTheme({
  components: {
    Button: Button.extend({
      defaultProps: {
        color: oneTx,
        className: readexProFont,
        fw: 300,
        radius: 0,
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
        className: readexProFont,
        fw: 300,
        fz: "sm",
      },
    }),

    Textarea: Textarea.extend({
      defaultProps: {
        className: readexProFont,
        color: oneTx,
        radius: "sm",
      },
    }),

    TextInput: TextInput.extend({
      defaultProps: {
        className: readexProFont,
        color: oneTx,
        radius: "sm",
      },
    }),

    Title: Title.extend({
      defaultProps: {
        c: oneTx,
        className: readexProFont,
        fw: 600,
      },
    }),

    Pagination: Pagination.extend({
      styles: {
        control: {
          padding: 16,
          color: `${oneTx}`,
          backgroundColor: `${threeBg}`,
          border: "none",
        },
      },
    }),
  },
});

export const vars = themeToVars(theme);
