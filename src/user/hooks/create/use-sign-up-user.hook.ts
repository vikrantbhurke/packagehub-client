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
      showNotification(
        error?.response?.data?.message || error.message || "An error occurred",
        NotificationColor.Failure
      );
    },
  });

  return { signUpUserMutation, isPending };
};
