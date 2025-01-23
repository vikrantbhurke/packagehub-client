import { themeToVars } from "@mantine/vanilla-extract";
import { oneTx, threeBg } from "./app.css";
import {
  Button,
  Text,
  createTheme,
  Pagination,
  Title,
  TextInput,
  Textarea,
  ActionIcon,
  Pill,
  PasswordInput,
} from "@mantine/core";

export const theme = createTheme({
  components: {
    Button: Button.extend({
      defaultProps: {
        color: oneTx,
        h: "2rem",
        radius: "md",
      },
    }),

    ActionIcon: ActionIcon.extend({
      defaultProps: {
        bg: "transparent",
        c: oneTx,
        size: "xs",
      },
    }),

    Pill: Pill.extend({
      defaultProps: {},
    }),

    Text: Text.extend({
      defaultProps: {
        color: oneTx,
        fz: "sm",
      },
    }),

    Textarea: Textarea.extend({
      defaultProps: {
        color: oneTx,
        radius: "md",
      },
    }),

    TextInput: TextInput.extend({
      defaultProps: {
        color: oneTx,
        radius: "md",
      },
    }),

    PasswordInput: PasswordInput.extend({
      defaultProps: {
        color: oneTx,
        radius: "md",
      },
    }),

    Title: Title.extend({
      defaultProps: {
        c: oneTx,
      },
    }),

    Pagination: Pagination.extend({
      styles: {
        control: {
          color: oneTx,
          backgroundColor: threeBg,
          border: "none",
        },
      },
    }),
  },
});

export const vars = themeToVars(theme);
