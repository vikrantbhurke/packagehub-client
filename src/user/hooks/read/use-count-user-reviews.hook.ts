import { countUserReviews } from "@/user/user.network";
import { useQuery } from "@tanstack/react-query";

export const useCountUserReviews = (uid: string) => {
  const {
    data: userReviews,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["countUserReviews", uid],
    queryFn: () => countUserReviews(uid),
    enabled: !!uid,
  });

  return { userReviews, isPending, isError, error };
};
