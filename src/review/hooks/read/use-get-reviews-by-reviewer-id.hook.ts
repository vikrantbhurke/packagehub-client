import { Order } from "@/global/enums";
import { getReviewsByReviewerId } from "@/review/review.network";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";

export const useGetReviewsByReviewerId = () => {
  const { rwid } = useParams();
  let [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || "1");
  const sort = searchParams.get("sort") as string;
  const order = searchParams.get("order") as Order;
  const rating = searchParams.get("rating") as string;

  const getReviewsByReviewerIdDTO = {
    rwid,
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
      "getReviewsByReviewerId",
      page - 1,
      ...Object.values(getReviewsByReviewerIdDTO),
    ],

    queryFn: () =>
      getReviewsByReviewerId({ page: page - 1, ...getReviewsByReviewerIdDTO }),
    enabled: !!rwid,
  });

  const prevPage = reviews?.firstPage ? page : page - 1;
  const nextPage = reviews?.lastPage ? page : page + 1;
  const lastPage = reviews?.totalPages;

  useQuery({
    queryKey: [
      "getReviewsByReviewerId",
      prevPage - 1,
      ...Object.values(getReviewsByReviewerIdDTO),
    ],

    queryFn: () =>
      getReviewsByReviewerId({
        page: prevPage - 1,
        ...getReviewsByReviewerIdDTO,
      }),

    enabled: !!prevPage && !!rwid,
  });

  useQuery({
    queryKey: [
      "getReviewsByReviewerId",
      nextPage - 1,
      ...Object.values(getReviewsByReviewerIdDTO),
    ],

    queryFn: () =>
      getReviewsByReviewerId({
        page: nextPage - 1,
        ...getReviewsByReviewerIdDTO,
      }),

    enabled: !!nextPage && !!rwid,
  });

  useQuery({
    queryKey: [
      "getReviewsByReviewerId",
      lastPage - 1,
      ...Object.values(getReviewsByReviewerIdDTO),
    ],

    queryFn: () =>
      getReviewsByReviewerId({
        page: lastPage - 1,
        ...getReviewsByReviewerIdDTO,
      }),

    enabled: !!lastPage && !!rwid,
  });

  return { reviews, isPending, isError, error };
};
