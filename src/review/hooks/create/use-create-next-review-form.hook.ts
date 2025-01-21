import { useForm } from "@mantine/form";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { RootState } from "@/global/states/store";
import { useCreateNextReview } from "./use-create-next-review.hook";
import { reviewUtility } from "@/review/review.utility";
import { setRatingInput } from "@/review/review.slice";
import { useDispatch } from "react-redux";

export const useCreateNextReviewForm = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { createNextReviewMutation, isPending } = useCreateNextReview();
  const { ratingInput } = useSelector((state: RootState) => state.review);
  const { auth } = useSelector((state: RootState) => state.auth);

  const form = useForm({
    mode: "controlled",
    initialValues: {
      title: "",
      body: "",
    },

    validate: {
      title: reviewUtility.validateTitle,
      body: reviewUtility.validateBody,
    },
  });

  const handleCreateNextReview = (values: any) => {
    const { title, body } = values;

    createNextReviewMutation({
      rating: ratingInput,
      title,
      body,
      reviewerId: auth.id,
      packageId: location.state.pid,
    });

    form.reset();
    dispatch(setRatingInput(3));
  };

  return { form, handleCreateNextReview, isPending };
};
