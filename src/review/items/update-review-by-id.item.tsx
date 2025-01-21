import { UpdateReviewByIdFormLayout } from "../layouts";
import { CustomLoader } from "@/global/components/loaders";
import { CustomError } from "@/global/components/errors";
import { useGetReviewById } from "../hooks/read";

export const UpdateReviewByIdItem = () => {
  const { review, isPending, isError, error } = useGetReviewById();

  if (isPending) return <CustomLoader />;
  if (isError) return <CustomError message={error?.message} />;
  if (!review) return <CustomError message="Review not found." />;

  return <Child />;
};

const Child = () => {
  return <UpdateReviewByIdFormLayout />;
};
