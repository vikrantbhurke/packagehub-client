import { GetModelsDTO } from "@/global/dtos";

interface SearchPackagesByPlatformDTO extends GetModelsDTO {
  platform: string;
  search: string;
}

export type { SearchPackagesByPlatformDTO };
