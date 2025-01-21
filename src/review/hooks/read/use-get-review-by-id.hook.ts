import { getReviewById } from "@/review/review.network";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const useGetReviewById = () => {
  let { rid } = useParams();

  const {
    data: review,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["getReviewById", rid],
    queryFn: () => getReviewById(rid),
    enabled: !!rid,
  });

  return { review, isPending, isError, error };
};
