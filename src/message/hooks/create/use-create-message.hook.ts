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
      let cvm = error?.response?.data?.message;
      let cvc = Object.values(error?.response?.data?.errors[0].constraints)[0];
      let errorMessage;

      if (cvm === process.env.CLASS_VALIDATOR_ERROR) errorMessage = cvc;

      showNotification(
        errorMessage || error.message,
        NotificationColor.Failure
      );
    },
  });

  return { createMessageMutation, isPending };
};
