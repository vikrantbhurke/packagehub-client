import { useSelector } from "react-redux";
import { useNotification } from "@/global/hooks";
import { RootState } from "@/global/states/store";
import { NotificationColor } from "@/global/enums";
import { deleteReviewById } from "@/review/review.network";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPage } from "@/review/review.slice";

export const useDeleteReviewById = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showNotification } = useNotification();
  const { auth } = useSelector((state: RootState) => state.auth);
  const queryClient = useQueryClient();
  let [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page"));
  let { pid: packageId, rwid: reviewerId, rid: reviewId } = useParams();

  const { sort, order, rating } = useSelector(
    (state: RootState) => state.review
  );

  const getReviewsByPackageIdDTO = {
    pid: packageId,
    sort,
    order,
    rating,
  };

  const getReviewsByReviewerIdDTO = {
    rwid: reviewerId,
    sort,
    order,
    rating,
  };

  const {
    mutate: deleteReviewByIdMutation,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: deleteReviewById,

    onMutate: async (rid) => {
      dispatch(setPage(1));
      navigate(`/users/${auth.id}`);

      if (reviewId) {
        await queryClient.cancelQueries({
          queryKey: ["getReviewById", rid],
        });

        const previousReview = await queryClient.getQueryData([
          "getReviewById",
          rid,
        ]);

        await queryClient.setQueryData(["getReviewById", rid], null);
        return { previousReview };
      } else if (packageId) {
        await queryClient.cancelQueries({
          queryKey: [
            "getReviewsByPackageId",
            page - 1,
            ...Object.values(getReviewsByPackageIdDTO),
          ],
        });

        const previousReviewsByPackageId = await queryClient.getQueryData([
          "getReviewsByPackageId",
          page - 1,
          ...Object.values(getReviewsByPackageIdDTO),
        ]);

        await queryClient.setQueryData(
          [
            "getReviewsByPackageId",
            page - 1,
            ...Object.values(getReviewsByPackageIdDTO),
          ],
          (reviewsPage: any) => ({
            ...reviewsPage,
            content: reviewsPage.content.filter(
              (review: any) => review.id !== rid
            ),
          })
        );

        return { previousReviewsByPackageId };
      } else if (reviewerId) {
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
          (reviewsPage: any) => ({
            ...reviewsPage,
            content: reviewsPage.content.filter(
              (review: any) => review.id !== rid
            ),
          })
        );

        return { previousReviewsByReviewerId };
      }
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

      navigate(`/users/${auth.id}`);

      showNotification("Review deleted.", NotificationColor.Success);
    },

    onError: async (error: any, rid: any, context: any) => {
      showNotification(
        error?.response?.data?.message || error.message || "An error occurred",
        NotificationColor.Failure
      );

      if (reviewId) {
        await queryClient.setQueryData(
          ["getReviewById", rid],
          context.previousReview
        );
      } else if (packageId) {
        await queryClient.setQueryData(
          [
            "getReviewsByPackageId",
            page - 1,
            ...Object.values(getReviewsByPackageIdDTO),
          ],
          context.previousReviewsByPackageId
        );
      } else if (reviewerId) {
        await queryClient.setQueryData(
          [
            "getReviewsByReviewerId",
            page - 1,
            ...Object.values(getReviewsByReviewerIdDTO),
          ],
          context.previousReviewsByReviewerId
        );
      }
    },
  });

  return { deleteReviewByIdMutation, isPending, isSuccess };
};
