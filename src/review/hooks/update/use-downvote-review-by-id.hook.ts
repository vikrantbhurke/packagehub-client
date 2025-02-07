import { useSelector } from "react-redux";
import { NotificationColor } from "@/global/enums";
import { useNotification } from "@/global/hooks";
import { RootState } from "@/global/states/store";
import { downvoteReviewById } from "@/review/review.network";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";

export const useDownvoteReviewById = () => {
  const { showNotification } = useNotification();
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

  const { mutate: downvoteReviewByIdMutation, isPending } = useMutation({
    mutationFn: downvoteReviewById,

    onMutate: async ({ rid, did }) => {
      if (reviewId) {
        await queryClient.cancelQueries({
          queryKey: ["getReviewById", rid],
        });

        const previousReview = await queryClient.getQueryData([
          "getReviewById",
          rid,
        ]);

        await queryClient.setQueryData(
          ["getReviewById", rid],
          (review: any) => {
            const idExistsInUpvoterIds = review.upvoterIds.find(
              (id: any) => id === did
            );

            const idExistsInDownvoterIds = review.downvoterIds.find(
              (id: any) => id === did
            );

            let newUpvoterIds = review.upvoterIds;
            let newDownvoterIds = review.downvoterIds;

            if (idExistsInUpvoterIds) {
              newUpvoterIds = newUpvoterIds.filter((id: any) => id !== did);
              newDownvoterIds.push(did);
            } else if (idExistsInDownvoterIds) {
              newDownvoterIds = newDownvoterIds.filter((id: any) => id !== did);
            } else {
              newDownvoterIds.push(did);
            }

            const newVotes = newUpvoterIds.length - newDownvoterIds.length;

            return {
              ...review,
              upvoterIds: newUpvoterIds,
              downvoterIds: newDownvoterIds,
              votes: newVotes,
            };
          }
        );

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
            content: reviewsPage.content.map((review: any) => {
              if (review.id === rid) {
                const idExistsInUpvoterIds = review.upvoterIds.find(
                  (id: any) => id === did
                );

                const idExistsInDownvoterIds = review.downvoterIds.find(
                  (id: any) => id === did
                );

                let newUpvoterIds = review.upvoterIds;
                let newDownvoterIds = review.downvoterIds;

                if (idExistsInUpvoterIds) {
                  newUpvoterIds = newUpvoterIds.filter((id: any) => id !== did);
                  newDownvoterIds.push(did);
                } else if (idExistsInDownvoterIds) {
                  newDownvoterIds = newDownvoterIds.filter(
                    (id: any) => id !== did
                  );
                } else {
                  newDownvoterIds.push(did);
                }

                const newVotes = newUpvoterIds.length - newDownvoterIds.length;

                return {
                  ...review,
                  upvoterIds: newUpvoterIds,
                  downvoterIds: newDownvoterIds,
                  votes: newVotes,
                };
              } else return review;
            }),
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
            content: reviewsPage.content.map((review: any) => {
              if (review.id === rid) {
                const idExistsInUpvoterIds = review.upvoterIds.find(
                  (id: any) => id === did
                );

                const idExistsInDownvoterIds = review.downvoterIds.find(
                  (id: any) => id === did
                );

                let newUpvoterIds = review.upvoterIds;
                let newDownvoterIds = review.downvoterIds;

                if (idExistsInUpvoterIds) {
                  newUpvoterIds = newUpvoterIds.filter((id: any) => id !== did);
                  newDownvoterIds.push(did);
                } else if (idExistsInDownvoterIds) {
                  newDownvoterIds = newDownvoterIds.filter(
                    (id: any) => id !== did
                  );
                } else {
                  newDownvoterIds.push(did);
                }

                const newVotes = newUpvoterIds.length - newDownvoterIds.length;

                return {
                  ...review,
                  upvoterIds: newUpvoterIds,
                  downvoterIds: newDownvoterIds,
                  votes: newVotes,
                };
              } else return review;
            }),
          })
        );

        return { previousReviewsByReviewerId };
      }
    },

    onSuccess: async (_data: any, { rid }) => {
      await queryClient.invalidateQueries({
        queryKey: ["checkReviewUpvote"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["checkReviewDownvote"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["getReviewById", rid],
      });

      await queryClient.invalidateQueries({
        queryKey: ["getReviewsByPackageId"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["getReviewsByReviewerId"],
      });
    },

    onError: async (error: any, { rid }: any, context: any) => {
      showNotification(
        error?.response?.data?.message || error.message || "An error occurred",
        NotificationColor.Failure
      );

      if (context?.previousReview) {
        await queryClient.setQueryData(
          ["getReviewById", rid],
          context.previousReview
        );
      } else if (context?.previousReviewsByPackageId) {
        await queryClient.setQueryData(
          [
            "getReviewsByPackageId",
            page - 1,
            ...Object.values(getReviewsByPackageIdDTO),
          ],
          context.previousReviewsByPackageId
        );
      } else if (context?.previousReviewsByReviewerId) {
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
  return { downvoteReviewByIdMutation, isPending };
};
