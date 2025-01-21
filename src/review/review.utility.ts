import Validator from "password-validator";
import { ReviewError } from "./review.error";

class ReviewUtility {
  getRatingColor(rating: number): string {
    switch (rating) {
      case 1:
        return "red";
      case 2:
        return "orange";
      case 3:
        return "yellow";
      case 4:
        return "lime";
      case 5:
        return "teal";
      default:
        return "white";
    }
  }

  getPlaceholder(ratingInput: number): string {
    switch (ratingInput) {
      case 1:
        return "hate";
      case 2:
        return "dislike";
      case 3:
        return "feel";
      case 4:
        return "like";
      case 5:
        return "love";
      default:
        return "";
    }
  }

  validateTitle = (body: string) => {
    const bodySchema = new Validator();
    bodySchema.is().min(5).is().max(50);
    return bodySchema.validate(body) ? null : ReviewError.Title;
  };

  validateBody = (body: string) => {
    const bodySchema = new Validator();
    bodySchema.is().min(50).is().max(1000);
    return bodySchema.validate(body) ? null : ReviewError.Body;
  };

  getTitleColor = (length: number) => {
    if (length < 5 || length > 50) return "red";
    return "green";
  };

  getBodyColor = (length: number) => {
    if (length < 50 || length > 1000) return "red";
    return "green";
  };
}

export default ReviewUtility;
export const reviewUtility = new ReviewUtility();
