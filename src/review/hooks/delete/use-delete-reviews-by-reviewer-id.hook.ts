import { useSelector } from "react-redux";
import { useNotification } from "@/global/hooks";
import { RootState } from "@/global/states/store";
import { NotificationColor } from "@/global/enums";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { deleteReviewsByReviewerId } from "@/review/review.network";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteReviewsByReviewerId = () => {
  const navigate = useNavigate();
  const { auth } = useSelector((state: RootState) => state.auth);
  const { showNotification } = useNotification();
  const queryClient = useQueryClient();
  let [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page"));
  let { rwid: reviewerId } = useParams();

  const { sort, order, rating } = useSelector(
    (state: RootState) => state.review
  );

  const getReviewsByReviewerIdDTO = {
    rwid: reviewerId,
    sort,
    order,
    rating,
  };

  const { mutate: deleteReviewsByReviewerIdMutation, isPending } = useMutation({
    mutationFn: deleteReviewsByReviewerId,

    onMutate: async (_data) => {
      navigate(`/users/${auth.id}`);

      await queryClient.cancelQueries({
        queryKey: [
          "getReviewsByReviewerId",
          page - 1,
          ...Object.values(getReviewsByReviewerIdDTO),
        ],
      });

      const previousReviewsByReviewerId = await queryClient.getQueryData([
        "getReviewsByReviewerId",
        page - 1,
        ...Object.values(getReviewsByReviewerIdDTO),
      ]);

      await queryClient.setQueryData(
        [
          "getReviewsByReviewerId",
          page - 1,
          ...Object.values(getReviewsByReviewerIdDTO),
        ],
        null
      );

      return { previousReviewsByReviewerId };
    },

    onSuccess: async (_data: any, rid) => {
      await queryClient.invalidateQueries({
        queryKey: ["getReviewById", rid],
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

      showNotification("All your reviews deleted.", NotificationColor.Success);
    },

    onError: async (error: any, _data: any, context: any) => {
      showNotification(
        error?.response?.data?.message || error.message || "An error occurred",
        NotificationColor.Failure
      );

      await queryClient.setQueryData(
        [
          "getReviewsByReviewerId",
          page - 1,
          ...Object.values(getReviewsByReviewerIdDTO),
        ],
        context.previousReviewsByReviewerId
      );
    },
  });

  return { deleteReviewsByReviewerIdMutation, isPending };
};
