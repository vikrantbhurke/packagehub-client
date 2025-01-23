import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFirstReview } from "@/review/review.network";
import { useNavigate } from "react-router-dom";
import { useNotification } from "@/global/hooks";
import { NotificationColor } from "@/global/enums";
import { useDispatch } from "react-redux";
import { setPage } from "@/review/review.slice";

export const useCreateFirstReview = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();

  const { mutate: createFirstReviewMutation, isPending } = useMutation({
    mutationFn: createFirstReview,

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
      let cvm = error?.response?.data?.message;
      let cvc = Object.values(error?.response?.data?.errors[0]?.constraints)[0];
      let errorMessage;

      if (cvm === process.env.CLASS_VALIDATOR_ERROR) errorMessage = cvc;

      showNotification(
        errorMessage || error.message,
        NotificationColor.Failure
      );
    },
  });

  return { createFirstReviewMutation, isPending };
};
