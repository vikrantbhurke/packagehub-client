import { GetModelsDTO } from "@/global/dtos";

interface GetReviewsByPackageIdDTO extends GetModelsDTO {
  pid: string | undefined;
  rating: string;
}

export type { GetReviewsByPackageIdDTO };
