export interface CreateFirstReviewDTO {
  title: string;
  body: string;
  packageId: string | undefined;
  reviewerId: string;
  rating: number;
  platform: string | undefined;
  packageUrl: string;
  homepageUrl: string;
  description: string;
}
