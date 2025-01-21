import { useForm } from "@mantine/form";
import { userUtility } from "../../user.utility";
import { useSignUpUser } from "./use-sign-up-user.hook";

export const useSignUpUserForm = () => {
  const { signUpUserMutation, isPending } = useSignUpUser();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validate: {
      firstname: userUtility.validateFirstname,
      lastname: userUtility.validateLastname,
      username: userUtility.validateUsername,
      email: userUtility.validateEmail,
      password: userUtility.validatePassword,
      confirmPassword: userUtility.validateConfirmPassword,
    },
  });

  const handleSignUpUser = (values: any) => {
    const { firstname, lastname, username, email, password } = values;

    signUpUserMutation({
      firstname,
      lastname,
      username,
      email,
      password,
    });

    form.reset();
  };

  return { form, handleSignUpUser, isPending };
};
