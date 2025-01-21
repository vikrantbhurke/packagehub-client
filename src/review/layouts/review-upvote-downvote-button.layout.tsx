import { useSelector } from "react-redux";
import { useUpvoteReviewById, useDownvoteReviewById } from "../hooks/update";
import {
  IconArrowBigDownFilled,
  IconArrowBigUpFilled,
} from "@tabler/icons-react";
import { ActionIcon } from "@mantine/core";
import { I } from "@/global/components/components";
import { oneTx } from "@/global/styles/app.css";

export const ReviewUpvoteDownvoteButtonLayout = ({ children, review }: any) => {
  const { auth } = useSelector((state: any) => state.auth);

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
            : oneTx
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
            : oneTx
        }>
        <I I={IconArrowBigDownFilled} />
      </ActionIcon>
    </>
  );
};
