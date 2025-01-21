import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "@/global/hooks";
import { createNextReview } from "@/review/review.network";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/global/states/store";
import { NotificationColor } from "@/global/enums";
import { setPage } from "@/review/review.slice";
import { useDispatch } from "react-redux";

export const useCreateNextReview = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();
  const { auth } = useSelector((state: RootState) => state.auth);

  const { sort, order, rating } = useSelector(
    (state: RootState) => state.review
  );

  const { mutate: createNextReviewMutation, isPending } = useMutation({
    mutationFn: createNextReview,

    onSuccess: async () => {
      showNotification(`Next review created.`, NotificationColor.Success);

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

      dispatch(setPage(1));
      navigate(
        `/reviews/reviewerId/${auth.id}?page=1&sort=${sort}&order=${order}&rating=${rating}`
      );
    },

    onError: (error: any) => {
      const { message }: any = error?.response?.data;
      if (message) showNotification(message, NotificationColor.Warning);
      else
        showNotification(
          error?.response?.data?.message || error.message,
          NotificationColor.Failure
        );
    },
  });

  return { createNextReviewMutation, isPending };
};
