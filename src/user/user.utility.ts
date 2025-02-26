import Validator from "password-validator";
import isEmail from "validator/lib/isEmail";
import { UserError } from "./user.error";

class UserUtility {
  validateFirstname = (firstname: string) => {
    const firstnameSchema = new Validator();
    firstnameSchema
      .is()
      .min(2)
      .is()
      .max(20)
      .has()
      .not()
      .spaces()
      .has()
      .not()
      .digits()
      .has()
      .not()
      .symbols();

    return firstnameSchema.validate(firstname) ? null : UserError.Firstname;
  };

  validateLastname = (lastname: string) => {
    const lastnameSchema = new Validator();

    lastnameSchema
      .is()
      .min(2)
      .is()
      .max(20)
      .has()
      .not()
      .digits()
      .has()
      .not()
      .symbols();

    return lastnameSchema.validate(lastname) ? null : UserError.Lastname;
  };

  validateUsername = (username: string) => {
    const usernameSchema = new Validator();
    usernameSchema.is().min(3).is().max(20).has().not().spaces();
    return usernameSchema.validate(username) ? null : UserError.Username;
  };

  validateEmail = (email: string) => {
    return isEmail(email) ? null : UserError.Email;
  };

  validatePassword = (password: string) => {
    const passwordSchema = new Validator();

    passwordSchema
      .is()
      .min(8)
      .is()
      .max(20)
      .has()
      .uppercase()
      .has()
      .lowercase()
      .has()
      .digits()
      .has()
      .symbols()
      .has()
      .not()
      .spaces();

    return passwordSchema.validate(password) ? null : UserError.Password;
  };

  validateConfirmPassword = (confirmPassword: string, values: any) => {
    return confirmPassword === values.password
      ? null
      : UserError.ConfirmPassword;
  };
}

export default UserUtility;
export const userUtility = new UserUtility();
