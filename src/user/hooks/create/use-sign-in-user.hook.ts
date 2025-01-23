import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "@/global/hooks";
import { getUserByUsername, signInUser } from "@/user/user.network";
import { useDispatch } from "react-redux";
import { setAuth } from "@/user/auth.slice";
import { NotificationColor } from "@/global/enums";

export const useSignInUser = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();

  const { mutate: signInUserMutation, isPending } = useMutation({
    mutationFn: signInUser,

    onSuccess: async (_data: any, variables: any, _context: any) => {
      const user = await queryClient.fetchQuery({
        queryKey: ["getUserByUsername", variables.username],
        queryFn: () => getUserByUsername(variables.username),
      });

      dispatch(setAuth(user));
      showNotification("Welcome to PackageHub!", NotificationColor.Info);
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

  return { signInUserMutation, isPending };
};
