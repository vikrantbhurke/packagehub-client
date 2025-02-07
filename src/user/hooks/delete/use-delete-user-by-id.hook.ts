import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { signOut } from "@/user/auth.slice";
import { useNavigate } from "react-router-dom";
import { useNotification } from "@/global/hooks";
import { RootState } from "@/global/states/store";
import { deleteUserById } from "@/user/user.network";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NotificationColor } from "@/global/enums";

export const useDeleteUserById = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { auth } = useSelector((state: RootState) => state.auth);
  const { showNotification } = useNotification();

  const {
    mutate: deleteUserByIdMutation,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: deleteUserById,

    onMutate: async () => {
      navigate("/");

      await queryClient.cancelQueries({
        queryKey: ["getUserById", auth.id],
      });

      const previousUser = await queryClient.getQueryData([
        "getUserById",
        auth.id,
      ]);

      await queryClient.setQueryData(["getUserById", auth.id], () => null);

      return { previousUser };
    },

    onSuccess: async () => {
      dispatch(signOut());

      await queryClient.invalidateQueries();
      showNotification("Account deleted.", NotificationColor.Success);
    },

    onError: async (error: any, { uid }: any, context: any) => {
      showNotification(
        error?.response?.data?.message || error.message || "An error occurred",
        NotificationColor.Failure
      );

      await queryClient.setQueryData(
        ["getUserById", uid],
        context.previousUser
      );
    },
  });

  return { deleteUserByIdMutation, isPending, isSuccess };
};
