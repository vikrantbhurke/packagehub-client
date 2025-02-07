import { useGetReviewById } from "../hooks/read";
import { CustomError } from "@/global/components/errors";
import { ReviewItemLayout } from "../layouts/review-item.layout";
import { SeoComponent } from "@/global/components/reusables";
import { ReviewItemSkeleton } from "../skeletons";

export const GetReviewByIdItem = () => {
  const { review, isPending, isError, error } = useGetReviewById();

  if (isPending) return <ReviewItemSkeleton />;
  if (isError) return <CustomError message={error?.message} />;
  if (!review) return <CustomError message="Review not found." />;

  return (
    <>
      <SeoComponent
        title={`Review Page`}
        description="Learn more about Qool Quotes."
      />
      <ReviewItemLayout review={review} />
    </>
  );
};
