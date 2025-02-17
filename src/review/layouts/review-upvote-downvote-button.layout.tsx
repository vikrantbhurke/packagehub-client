import { useSelector } from "react-redux";
import { useUpvoteReviewById, useDownvoteReviewById } from "../hooks/update";
import {
  IconArrowBigDownFilled,
  IconArrowBigUpFilled,
} from "@tabler/icons-react";
import { ActionIcon } from "@mantine/core";
import { I } from "@/global/components/reusables";
import { fiveTx } from "@/global/styles/app.css";
import { RootState } from "@/global/states/store";

export const ReviewUpvoteDownvoteButton = ({ children, review }: any) => {
  const { auth } = useSelector((state: RootState) => state.auth);

  const { upvoteReviewByIdMutation, isPending: isUpvotePending } =
    useUpvoteReviewById();

  const { downvoteReviewByIdMutation, isPending: isDownvotePending } =
    useDownvoteReviewById();

  const handleUpvoteReview = () => {
    upvoteReviewByIdMutation({ rid: review.id, uid: auth.id });
  };

  const handleDownvoteReview = () => {
    downvoteReviewByIdMutation({ rid: review.id, did: auth.id });
  };

  return (
    <>
      <ActionIcon
        onClick={handleUpvoteReview}
        disabled={isUpvotePending}
        c={
          review.upvoterIds.find((id: string) => id === auth.id)
            ? "green"
            : fiveTx
        }>
        <I I={IconArrowBigUpFilled} />
      </ActionIcon>
      {children}
      <ActionIcon
        onClick={handleDownvoteReview}
        disabled={isDownvotePending}
        c={
          review.downvoterIds.find((id: string) => id === auth.id)
            ? "red"
            : fiveTx
        }>
        <I I={IconArrowBigDownFilled} />
      </ActionIcon>
    </>
  );
};
