import Validator from "password-validator";
import { ReviewError } from "./review.error";

class ReviewUtility {
  getRatingColor(rating: number): string {
    switch (rating) {
      case 1:
        return "#E03131";
      case 2:
        return "#E8590C";
      case 3:
        return "#F08C00";
      case 4:
        return "#66A80F";
      case 5:
        return "#099268";
      default:
        return "white";
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
    return bodySchema.validate(this.stripHtmlTags(body))
      ? null
      : ReviewError.Body;
  };

  getTitleColor = (length: number) => {
    if (length < 5 || length > 50) return "red";
    return "green";
  };

  getBodyColor = (length: number) => {
    if (length < 50 || length > 1000) return "red";
    return "green";
  };

  stripHtmlTags = (htmlString: string) => {
    return htmlString.replace(/<[^>]*>/g, ""); // Remove all HTML tags
  };
}

export default ReviewUtility;
export const reviewUtility = new ReviewUtility();
