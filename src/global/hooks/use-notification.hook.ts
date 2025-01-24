import { notifications } from "@mantine/notifications";
import { NotificationColor } from "../enums/notification-color.enum";
import { noBorder } from "../styles/app.css";
import { useMantineColorScheme } from "@mantine/core";

export const useNotification = () => {
  const theme = useMantineColorScheme();
  const showNotification = (title: string, color: NotificationColor) => {
    notifications.show({
      title,
      withCloseButton: false,
      color: "white",
      position: "bottom-center",
      message: "",
      styles: {
        title: {
          color: "white",
        },
      },
      style: {
        backgroundColor: color,
        border: noBorder,
      },
      autoClose: 5000,
    });
  };

  return { showNotification };
};
