import { useQuery } from "@tanstack/react-query";
import { getReviewsByPackageId } from "@/review/review.network";
import { useParams, useSearchParams } from "react-router-dom";
import { Order } from "@/global/enums";

export const useGetReviewsByPackageId = () => {
  const { pid } = useParams();
  let [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || "1");
  const sort = searchParams.get("sort") as string;
  const order = searchParams.get("order") as Order;
  const rating = searchParams.get("rating") as string;

  const getReviewsByPackageIdDTO = {
    pid,
    sort,
    order,
    rating,
  };

  const {
    data: reviews,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: [
      "getReviewsByPackageId",
      page - 1,
      ...Object.values(getReviewsByPackageIdDTO),
    ],

    queryFn: () =>
      getReviewsByPackageId({ page: page - 1, ...getReviewsByPackageIdDTO }),
    enabled: !!pid,
  });

  const prevPage = reviews?.firstPage ? page : page - 1;
  const nextPage = reviews?.lastPage ? page : page + 1;
  const lastPage = reviews?.totalPages;

  useQuery({
    queryKey: [
      "getReviewsByPackageId",
      prevPage - 1,
      ...Object.values(getReviewsByPackageIdDTO),
    ],

    queryFn: () =>
      getReviewsByPackageId({
        page: prevPage - 1,
        ...getReviewsByPackageIdDTO,
      }),

    enabled: !!prevPage && !!pid,
  });

  useQuery({
    queryKey: [
      "getReviewsByPackageId",
      nextPage - 1,
      ...Object.values(getReviewsByPackageIdDTO),
    ],

    queryFn: () =>
      getReviewsByPackageId({
        page: nextPage - 1,
        ...getReviewsByPackageIdDTO,
      }),

    enabled: !!nextPage && !!pid,
  });

  useQuery({
    queryKey: [
      "getReviewsByPackageId",
      lastPage - 1,
      ...Object.values(getReviewsByPackageIdDTO),
    ],

    queryFn: () =>
      getReviewsByPackageId({
        page: lastPage - 1,
        ...getReviewsByPackageIdDTO,
      }),

    enabled: !!lastPage && !!pid,
  });

  return { reviews, isPending, isError, error };
};
