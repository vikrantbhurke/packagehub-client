import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { RootState } from "@/global/states/store";
import { searchReviewsByPackageId } from "@/review/review.network";
import { useParams, useSearchParams } from "react-router-dom";
import { Order } from "@/global/enums";

export const useSearchReviewsByPackageId = () => {
  const { pid } = useParams();
  let [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || "1");
  const sort = searchParams.get("sort") as string;
  const order = searchParams.get("order") as Order;
  const rating = searchParams.get("rating") as string;

  const { search } = useSelector((state: RootState) => state.view);

  const searchReviewsByPackageIdDTO = {
    pid,
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
      "searchReviewsByPackageId",
      page - 1,
      ...Object.values(searchReviewsByPackageIdDTO),
    ],

    queryFn: () =>
      searchReviewsByPackageId({
        page: page - 1,
        ...searchReviewsByPackageIdDTO,
      }),

    enabled: !!pid && !!search,
  });

  const prevPage = reviews?.firstPage ? page : page - 1;
  const nextPage = reviews?.lastPage ? page : page + 1;
  const lastPage = reviews?.totalPages ? reviews.totalPages : page;

  useQuery({
    queryKey: [
      "searchReviewsByPackageId",
      prevPage - 1,
      ...Object.values(searchReviewsByPackageIdDTO),
    ],

    queryFn: () =>
      searchReviewsByPackageId({
        page: prevPage - 1,
        ...searchReviewsByPackageIdDTO,
      }),

    enabled: !!prevPage && !!pid && !!search,
  });

  useQuery({
    queryKey: [
      "searchReviewsByPackageId",
      nextPage - 1,
      ...Object.values(searchReviewsByPackageIdDTO),
    ],

    queryFn: () =>
      searchReviewsByPackageId({
        page: nextPage - 1,
        ...searchReviewsByPackageIdDTO,
      }),

    enabled: !!nextPage && !!pid && !!search,
  });

  useQuery({
    queryKey: [
      "searchReviewsByPackageId",
      lastPage - 1,
      ...Object.values(searchReviewsByPackageIdDTO),
    ],

    queryFn: () =>
      searchReviewsByPackageId({
        page: lastPage - 1,
        ...searchReviewsByPackageIdDTO,
      }),

    enabled: !!lastPage && !!pid && !!search,
  });

  return { error, isError, isPending, reviews };
};
