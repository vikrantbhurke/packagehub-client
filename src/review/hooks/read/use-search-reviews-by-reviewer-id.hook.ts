import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { RootState } from "@/global/states/store";
import { searchReviewsByReviewerId } from "@/review/review.network";
import { useParams, useSearchParams } from "react-router-dom";
import { Order } from "@/global/enums";

export const useSearchReviewsByReviewerId = () => {
  const { rwid } = useParams();
  let [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || "1");
  const sort = searchParams.get("sort") as string;
  const order = searchParams.get("order") as Order;
  const rating = searchParams.get("rating") as string;

  const { search } = useSelector((state: RootState) => state.view);

  const searchReviewsByReviewerIdDTO = {
    rwid,
    search,
    sort,
    order,
    rating,
  };

  const {
    error,
    isError,
    isPending,
    data: reviews,
  } = useQuery({
    queryKey: [
      "searchReviewsByReviewerId",
      page - 1,
      ...Object.values(searchReviewsByReviewerIdDTO),
    ],

    queryFn: () =>
      searchReviewsByReviewerId({
        page: page - 1,
        ...searchReviewsByReviewerIdDTO,
      }),

    enabled: !!rwid && !!search,
  });

  const prevPage = reviews?.firstPage ? page : page - 1;
  const nextPage = reviews?.lastPage ? page : page + 1;
  const lastPage = reviews?.totalPages ? reviews.totalPages : page;

  useQuery({
    queryKey: [
      "searchReviewsByReviewerId",
      prevPage - 1,
      ...Object.values(searchReviewsByReviewerIdDTO),
    ],

    queryFn: () =>
      searchReviewsByReviewerId({
        page: prevPage - 1,
        ...searchReviewsByReviewerIdDTO,
      }),

    enabled: !!prevPage && !!rwid && !!search,
  });

  useQuery({
    queryKey: [
      "searchReviewsByReviewerId",
      nextPage - 1,
      ...Object.values(searchReviewsByReviewerIdDTO),
    ],

    queryFn: () =>
      searchReviewsByReviewerId({
        page: nextPage - 1,
        ...searchReviewsByReviewerIdDTO,
      }),

    enabled: !!nextPage && !!rwid && !!search,
  });

  useQuery({
    queryKey: [
      "searchReviewsByReviewerId",
      lastPage - 1,
      ...Object.values(searchReviewsByReviewerIdDTO),
    ],

    queryFn: () =>
      searchReviewsByReviewerId({
        page: lastPage - 1,
        ...searchReviewsByReviewerIdDTO,
      }),

    enabled: !!lastPage && !!rwid && !!search,
  });

  return { error, isError, isPending, reviews };
};
