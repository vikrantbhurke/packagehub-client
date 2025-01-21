import { GetModelsDTO } from "@/global/dtos";

interface SearchReviewsByReviewerIdDTO extends GetModelsDTO {
  rwid: string | undefined;
  search: string;
}

export type { SearchReviewsByReviewerIdDTO };
