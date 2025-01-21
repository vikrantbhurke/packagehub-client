import { GetModelsDTO } from "@/global/dtos";

interface GetPackagesByPlatformDTO extends GetModelsDTO {
  platform: string;
  rating: string;
}

export type { GetPackagesByPlatformDTO };
