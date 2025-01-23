import { useForm } from "@mantine/form";
import { useSignInUser } from "./use-sign-in-user.hook";
import { userUtility } from "@/user/user.utility";

export const useSignInUserForm = () => {
  const { signInUserMutation, isPending } = useSignInUser();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      username: "",
      password: "",
    },

    validate: {
      username: userUtility.validateUsername,
      password: userUtility.validatePassword,
    },
  });

  const handleSignInUser = (values: any) => {
    signInUserMutation(values);
    form.reset();
  };

  return { form, handleSignInUser, isPending };
};
