import { notifications } from "@mantine/notifications";
import { NotificationColor } from "../enums/notification-color.enum";
import { borderLCBorder, oneBg } from "../styles/app.css";

export const useNotification = () => {
  const showNotification = (title: string, color: NotificationColor) => {
    notifications.show({
      title,
      color,
      position: "bottom-center",
      message: "",
      style: {
        backgroundColor: oneBg,
        border: borderLCBorder,
      },
      autoClose: 5000,
    });
  };

  return { showNotification };
};
