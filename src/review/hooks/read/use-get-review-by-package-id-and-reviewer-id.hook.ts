import { PackageIdReviewerIdDTO } from "@/review/dtos/read";
import { getReviewByPackageIdAndReviewerId } from "@/review/review.network";
import { useQuery } from "@tanstack/react-query";

export const useGetReviewByPackageIdAndReviewerId = (
  packageIdReviewerId: PackageIdReviewerIdDTO
) => {
  const { pid, rwid } = packageIdReviewerId;

  const {
    data: review,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["getReviewByPackageIdAndReviewerId", pid, rwid],
    queryFn: () => getReviewByPackageIdAndReviewerId({ pid, rwid }),
    enabled: !!pid && !!rwid,
  });

  return { review, isPending, isError, error };
};
