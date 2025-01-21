import axios from "axios";
import {
  GetPackagesByPlatformDTO,
  SearchPackagesByPlatformDTO,
} from "./dtos/read";

export const getPackagesByPlatform = async (
  getPackagesByPlatformDTO: GetPackagesByPlatformDTO
) => {
  const { page, platform, sort, order, rating } = getPackagesByPlatformDTO;
  const params = new URLSearchParams();
  params.append("page", page.toString());
  if (sort) params.append("sort", sort);
  if (order) params.append("order", order);
  if (rating !== "0") params.append("rating", rating);
  const request = { params };
  const result = await axios.get(`/packages/platform/${platform}`, request);
  return result.data;
};

export const searchPackagesByPlatform = async (
  searchPackagesByPlatformDTO: SearchPackagesByPlatformDTO
) => {
  const { page, platform, search, sort, order } = searchPackagesByPlatformDTO;
  const params = new URLSearchParams();
  params.append("page", page.toString());
  params.append("search", search);
  if (sort) params.append("sort", sort);
  if (order) params.append("order", order);
  const request = { params };
  const result = await axios.get(
    `/packages/platform/${platform}/search`,
    request
  );
  return result.data;
};

export const getPackageById = async (pid: string | undefined) => {
  const result = await axios.get(`/packages/${pid}`);
  return result.data;
};
