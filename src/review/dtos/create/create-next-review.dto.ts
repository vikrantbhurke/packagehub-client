export interface CreateNextReviewDTO {
  title: string;
  body: string;
  packageId: string | undefined;
  reviewerId: string;
  rating: number;
}
