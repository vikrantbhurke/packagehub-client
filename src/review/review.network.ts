import axios from "axios";
import { UpdateReviewByIdDTO } from "./dtos/update";
import { CreateFirstReviewDTO, CreateNextReviewDTO } from "./dtos/create";
import {
  GetReviewsByPackageIdDTO,
  GetReviewsByReviewerIdDTO,
  SearchReviewsByPackageIdDTO,
  SearchReviewsByReviewerIdDTO,
  PackageIdReviewerIdDTO,
  ReviewIdUpvoterIdDTO,
} from "./dtos/read";
import { ReviewIdDownvoterIdDTO } from "./dtos/read/review-id-downvoter-id.dto";

export const createFirstReview = async (
  createFirstReviewDTO: CreateFirstReviewDTO
) => {
  const result = await axios.post(`/reviews/first`, createFirstReviewDTO);
  return result.data;
};

export const createNextReview = async (
  createNextReviewDTO: CreateNextReviewDTO
) => {
  const result = await axios.post(`/reviews/next`, createNextReviewDTO);
  return result.data;
};

export const searchReviewsByPackageId = async (
  searchReviewsByReviewerIdDTO: SearchReviewsByPackageIdDTO
) => {
  const { page, pid, search, sort, order } = searchReviewsByReviewerIdDTO;
  const params = new URLSearchParams();
  params.append("page", page.toString());
  if (sort) params.append("sort", sort);
  if (order) params.append("order", order);
  const request = { params };
  const result = await axios.get(
    `/reviews/packageId/${pid}/search/${search}`,
    request
  );
  return result.data;
};

export const searchReviewsByReviewerId = async (
  searchReviewsByReviewerIdDTO: SearchReviewsByReviewerIdDTO
) => {
  const { page, rwid, search, sort, order } = searchReviewsByReviewerIdDTO;
  const params = new URLSearchParams();
  params.append("page", page.toString());
  if (sort) params.append("sort", sort);
  if (order) params.append("order", order);
  const request = { params };
  const result = await axios.get(
    `/reviews/reviewerId/${rwid}/search/${search}`,
    request
  );
  return result.data;
};

export const getReviewsByPackageId = async (
  getReviewsByPackageIdDTO: GetReviewsByPackageIdDTO
) => {
  const { page, pid, sort, order, rating } = getReviewsByPackageIdDTO;
  const params = new URLSearchParams();
  params.append("page", page.toString());
  if (sort) params.append("sort", sort);
  if (order) params.append("order", order);
  if (rating !== "0") params.append("rating", rating);
  const request = { params };
  const result = await axios.get(`/reviews/packageId/${pid}`, request);
  return result.data;
};

export const getReviewsByReviewerId = async (
  getReviewsByReviewerIdDTO: GetReviewsByReviewerIdDTO
) => {
  const { page, rwid, sort, order, rating } = getReviewsByReviewerIdDTO;
  const params = new URLSearchParams();
  params.append("page", page.toString());
  if (sort) params.append("sort", sort);
  if (order) params.append("order", order);
  if (rating !== "0") params.append("rating", rating);
  const request = { params };
  const result = await axios.get(`/reviews/reviewerId/${rwid}`, request);
  return result.data;
};

export const getReviewById = async (rid: string | undefined) => {
  const result = await axios.get(`/reviews/${rid}`);
  return result.data;
};

export const getReviewByPackageIdAndReviewerId = async (
  packageIdReviewerId: PackageIdReviewerIdDTO
) => {
  const { pid, rwid } = packageIdReviewerId;
  const result = await axios.get(
    `/reviews/packageId/${pid}/reviewerId/${rwid}`
  );
  return result.data;
};

export const updateReviewById = async (
  updateReviewByIdDTO: UpdateReviewByIdDTO
) => {
  const { rid, title, body, rating } = updateReviewByIdDTO;

  const result = await axios.patch(`/reviews/${rid}`, {
    title,
    body,
    rating,
  });

  return result.data;
};

export const upvoteReviewById = async (
  reviewIdUpvoterIdDTO: ReviewIdUpvoterIdDTO
) => {
  const { rid, uid } = reviewIdUpvoterIdDTO;
  const result = await axios.patch(`/reviews/${rid}/upvoterId/${uid}`);
  return result.data;
};

export const downvoteReviewById = async (
  reviewIdDownvoterIdDTO: ReviewIdDownvoterIdDTO
) => {
  const { rid, did } = reviewIdDownvoterIdDTO;
  const result = await axios.patch(`/reviews/${rid}/downvoterId/${did}`);
  return result.data;
};

export const deleteReviewById = async (rid: string) => {
  const result = await axios.delete(`/reviews/${rid}`);
  return result.data;
};

export const deleteReviewsByReviewerId = async (rwid: string) => {
  const result = await axios.delete(`/reviews/reviewerId/${rwid}`);
  return result.data;
};
