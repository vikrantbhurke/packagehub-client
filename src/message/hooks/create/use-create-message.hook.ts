import { useMutation } from "@tanstack/react-query";
import { useNotification } from "@/global/hooks";
import { createMessage } from "@/message/message.network";
import { NotificationColor } from "@/global/enums";

export const useCreateMessage = () => {
  const { showNotification } = useNotification();

  const { mutate: createMessageMutation, isPending } = useMutation({
    mutationFn: createMessage,

    onSuccess: async () => {
      showNotification("Message sent.", NotificationColor.Info);
    },

    onError: (error: any) => {
      showNotification(
        error?.response?.data?.message || error.message || "An error occurred",
        NotificationColor.Failure
      );
    },
  });

  return { createMessageMutation, isPending };
};
