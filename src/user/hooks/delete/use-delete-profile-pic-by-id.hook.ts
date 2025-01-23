import { useNotification } from "@/global/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProfilePicById } from "@/user/user.network";
import { useSelector } from "react-redux";
import { RootState } from "@/global/states/store";
import { useDispatch } from "react-redux";
import { setAuth } from "@/user/auth.slice";
import { NotificationColor } from "@/global/enums";

export const useDeleteProfilePicById = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state: RootState) => state.auth);
  const { showNotification } = useNotification();
  const queryClient = useQueryClient();

  const {
    mutate: deleteProfilePicByIdMutation,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: deleteProfilePicById,

    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ["getUserById", auth.id],
      });

      const previousUser = await queryClient.getQueryData([
        "getUserById",
        auth.id,
      ]);

      await queryClient.setQueryData(["getUserById", auth.id], (user: any) => {
        return {
          ...user,
          profilepic: "",
        };
      });

      return { previousUser };
    },

    onSuccess: async () => {
      dispatch(
        setAuth({
          ...auth,
          profilepic: "",
        })
      );

      await queryClient.invalidateQueries({
        queryKey: ["getUserById", auth.id],
      });

      await queryClient.invalidateQueries({
        queryKey: ["getPlaylistById"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["searchPlaylists"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["getPlaylists"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["getPlaylistsByCreatorId"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["getPlaylistsBySaverId"],
      });

      showNotification("Profile pic deleted.", NotificationColor.Success);
    },

    onError: async (error: any, context: any) => {
      let cvm = error?.response?.data?.message;
      let cvc = Object.values(error?.response?.data?.errors[0]?.constraints)[0];
      let errorMessage;

      if (cvm === process.env.CLASS_VALIDATOR_ERROR) errorMessage = cvc;

      showNotification(
        errorMessage || error.message,
        NotificationColor.Failure
      );

      await queryClient.setQueryData(
        ["getUserById", auth.id],
        context.previousUser
      );
    },
  });

  return { deleteProfilePicByIdMutation, isPending, isSuccess };
};
