import { getUserByUsername, updateUserById } from "@/user/user.network";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "@/global/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuth } from "@/user/auth.slice";
import { RootState } from "@/global/states/store";
import { useSelector } from "react-redux";
import { NotificationColor } from "@/global/enums";

export const useUpdateUserById = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();
  const { auth } = useSelector((state: RootState) => state.auth);
  let { uid } = useParams();

  const { mutate: updateUserByIdMutation, isPending } = useMutation({
    mutationFn: updateUserById,

    onMutate: async ({ uid, updateUserByIdDTO }) => {
      const { profilepic, firstname, lastname, email, password } =
        updateUserByIdDTO;

      await queryClient.cancelQueries({
        queryKey: ["getUserById", uid],
      });

      const previousUser = await queryClient.getQueryData(["getUserById", uid]);

      await queryClient.setQueryData(["getUserById", uid], (user: any) => {
        return {
          id: user.id,
          profilepic: profilepic ? profilepic : user.profilepic,
          firstname: firstname ? firstname : user.firstname,
          lastname: lastname ? lastname : user.lastname,
          email: email ? email : user.email,
          password: password ? password : user.password,
        };
      });

      return { previousUser };
    },

    onSuccess: async (_data: any, variables: any, _context: any) => {
      navigate(`/users/${auth.id}`);

      const user = await queryClient.fetchQuery({
        queryKey: ["getUserByUsername", auth.username],
        queryFn: () => getUserByUsername(auth.username),
      });

      dispatch(setAuth(user));

      await queryClient.invalidateQueries({
        queryKey: ["getUserById", uid],
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

      if (
        variables.updateUserByIdDTO.email &&
        variables.updateUserByIdDTO.email !== user.email
      ) {
        showNotification(
          `Profile updated. Verify your new email at ${variables.updateUserByIdDTO.email}.`,
          NotificationColor.Success
        );
      } else {
        showNotification(`Profile updated.`, NotificationColor.Success);
      }
    },

    onError: async (error: any, context: any) => {
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

  return { updateUserByIdMutation, isPending };
};
