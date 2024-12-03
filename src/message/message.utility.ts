import Validator from "password-validator";
import { MessageError } from "./message.error";
import isEmail from "validator/lib/isEmail";

class MessageUtility {
  validateTitle = (title: string) => {
    const titleSchema = new Validator();
    titleSchema.is().min(5).is().max(30);
    return titleSchema.validate(title) ? null : MessageError.Title;
  };

  validateDescription = (description: string) => {
    const descriptionSchema = new Validator();
    descriptionSchema.is().min(5).is().max(200);
    return descriptionSchema.validate(description)
      ? null
      : MessageError.Description;
  };

  validateEmail = (email: string) => {
    return isEmail(email) ? null : MessageError.Email;
  };

  getTitleColor = (length: number): string => {
    if (length < 5 || length > 30) return "red";
    else return "green";
  };

  getDescriptionColor = (length: number): string => {
    if (length < 5 || length > 200) return "red";
    else return "green";
  };
}

export default MessageUtility;
export const messageUtility = new MessageUtility();
