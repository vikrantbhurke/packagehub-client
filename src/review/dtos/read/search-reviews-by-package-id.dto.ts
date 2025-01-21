import { GetModelsDTO } from "@/global/dtos";

interface SearchReviewsByPackageIdDTO extends GetModelsDTO {
  pid: string | undefined;
  search: string;
}

export type { SearchReviewsByPackageIdDTO };
