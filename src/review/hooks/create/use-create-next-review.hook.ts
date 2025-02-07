import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "@/global/hooks";
import { createNextReview } from "@/review/review.network";
import { useNavigate } from "react-router-dom";
import { NotificationColor } from "@/global/enums";
import { setPage } from "@/review/review.slice";
import { useDispatch } from "react-redux";

export const useCreateNextReview = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();

  const { mutate: createNextReviewMutation, isPending } = useMutation({
    mutationFn: createNextReview,

    onSuccess: async (review: any) => {
      showNotification(`Review created.`, NotificationColor.Success);

      await queryClient.invalidateQueries({
        queryKey: ["searchReviewsByPackageId"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["searchReviewsByReviewerId"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["getReviewsByPackageId"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["getReviewsByReviewerId"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["countUserReviews"],
      });

      dispatch(setPage(1));
      navigate(`/reviews/${review.id}`);
    },

    onError: (error: any) => {
      showNotification(
        error?.response?.data?.message || error.message || "An error occurred",
        NotificationColor.Failure
      );
    },
  });

  return { createNextReviewMutation, isPending };
};
