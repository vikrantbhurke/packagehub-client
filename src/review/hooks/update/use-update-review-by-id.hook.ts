import { updateReviewById } from "@/review/review.network";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useNotification } from "@/global/hooks";
import { NotificationColor } from "@/global/enums";

export const useUpdateReviewById = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const queryClient = useQueryClient();

  const { mutate: updateReviewByIdMutation, isPending } = useMutation({
    mutationFn: updateReviewById,

    onMutate: async ({ rid, rating, title, body }: any) => {
      await queryClient.cancelQueries({
        queryKey: ["getReviewById", rid],
      });

      const previousReview = await queryClient.getQueryData([
        "getReviewById",
        rid,
      ]);

      await queryClient.setQueryData(["getReviewById", rid], (review: any) => {
        return {
          ...review,
          rating,
          title,
          body,
        };
      });

      return { previousReview };
    },

    onSuccess: async (_data: any, { rid }) => {
      await queryClient.invalidateQueries({
        queryKey: ["getReviewById", rid],
      });

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

      navigate(`/reviews/${rid}`);
    },

    onError: async (error: any, { rid }: any, context: any) => {
      const { message }: any = error?.response?.data;
      if (message) showNotification(message, NotificationColor.Warning);
      else
        showNotification(
          error?.response?.data?.message || error.message,
          NotificationColor.Failure
        );

      await queryClient.setQueryData(
        ["getReviewById", rid],
        context.previousReview
      );
    },
  });

  return { updateReviewByIdMutation, isPending };
};
