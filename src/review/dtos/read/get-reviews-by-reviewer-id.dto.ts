import { GetModelsDTO } from "@/global/dtos";

interface GetReviewsByReviewerIdDTO extends GetModelsDTO {
  rwid: string | undefined;
  rating: string;
}

export type { GetReviewsByReviewerIdDTO };
