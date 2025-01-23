import axios from "axios";
import { UpdateUserDTO } from "./dtos/update";
import { SignInUserDTO, SignUpUserDTO } from "./dtos/create";

export const signUpUser = async (signUpUserDTO: SignUpUserDTO) => {
  const result = await axios.post(`/users/sign-up`, signUpUserDTO);
  return result.data;
};

export const signInUser = async (signInUserDTO: SignInUserDTO) => {
  const result = await axios.post(`/users/sign-in`, signInUserDTO);
  return result.data;
};

export const verifyAccount = async (token: string | undefined) => {
  const result = await axios.get(`/users/verify-account/${token}`);
  return result.data;
};

export const verifyEmail = async (token: string | undefined) => {
  const result = await axios.get(`/users/verify-email/${token}`);
  return result.data;
};

export const countUserReviews = async (uid: string) => {
  const result = await axios.get(`/users/${uid}/reviews`);
  return result.data;
};

export const getUserByUsername = async (username: string) => {
  const result = await axios.get(`/users/username/${username}`);
  return result.data;
};

export const getUserById = async (uid: string | undefined) => {
  const result = await axios.get(`/users/${uid}`);
  return result.data;
};

export const updateUserById = async ({
  uid,
  updateUserByIdDTO,
}: {
  uid: string;
  updateUserByIdDTO: UpdateUserDTO;
}) => {
  const { profilepic, firstname, lastname, email, password } =
    updateUserByIdDTO;

  const formData = new FormData();
  profilepic && formData.append("profilepic", profilepic);
  firstname && formData.append("firstname", firstname);
  lastname && formData.append("lastname", lastname);
  email && formData.append("email", email);
  password && formData.append("password", password);

  const result = await axios.patch(`/users/${uid}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return result.data;
};

export const deleteProfilePicById = async (uid: string) => {
  const result = await axios.delete(`/users/${uid}/profilepic`);
  return result.data;
};

export const deleteUserById = async (uid: string) => {
  const result = await axios.delete(`/users/${uid}`);
  return result.data;
};
