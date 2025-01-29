import { notifications } from "@mantine/notifications";
import { NotificationColor } from "../enums/notification-color.enum";
import { noBorderStyle } from "../styles/app.css";

export const useNotification = () => {
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
        border: noBorderStyle,
      },
      autoClose: 5000,
    });
  };

  return { showNotification };
};
