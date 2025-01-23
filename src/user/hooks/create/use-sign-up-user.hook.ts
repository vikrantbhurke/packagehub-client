import { useMutation } from "@tanstack/react-query";
import { useNotification } from "@/global/hooks";
import { signUpUser } from "@/user/user.network";
import { NotificationColor } from "@/global/enums";

export const useSignUpUser = () => {
  const { showNotification } = useNotification();

  const { mutate: signUpUserMutation, isPending } = useMutation({
    mutationFn: signUpUser,

    onSuccess: async (_data: any, variables: any, _context: any) => {
      showNotification(
        `Verify your email at ${variables.email}.`,
        NotificationColor.Info
      );
    },

    onError: (error: any) => {
      let cvm = error?.response?.data?.message;
      let cvc = Object.values(error?.response?.data?.errors[0]?.constraints)[0];
      let errorMessage;

      if (cvm === process.env.CLASS_VALIDATOR_ERROR) errorMessage = cvc;

      showNotification(
        errorMessage || error.message,
        NotificationColor.Failure
      );
    },
  });

  return { signUpUserMutation, isPending };
};
