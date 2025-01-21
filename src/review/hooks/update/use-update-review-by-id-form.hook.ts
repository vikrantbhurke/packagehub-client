import { useForm } from "@mantine/form";
import { useGetReviewById } from "../read";
import { useUpdateReviewById } from "./use-update-review-by-id.hook";
import { RootState } from "@/global/states/store";
import { useSelector } from "react-redux";
import { reviewUtility } from "@/review/review.utility";
import { setRatingInput } from "@/review/review.slice";
import { useDispatch } from "react-redux";

export const useUpdateReviewByIdForm = () => {
  const dispatch = useDispatch();
  const { review } = useGetReviewById();
  const { updateReviewByIdMutation, isPending } = useUpdateReviewById();
  const { ratingInput } = useSelector((state: RootState) => state.review);

  const form = useForm({
    mode: "controlled",
    initialValues: {
      title: review.title,
      body: review.body,
    },

    validate: {
      title: (value) =>
        value !== review.title ? reviewUtility.validateTitle(value) : null,
      body: (value) =>
        value !== review.body ? reviewUtility.validateBody(value) : null,
    },
  });

  const handleUpdateReviewById = (values: any) => {
    const { title, body } = values;

    updateReviewByIdMutation({
      rid: review.id,
      rating: ratingInput,
      title,
      body,
    });

    form.setInitialValues({
      title: form.isDirty("title") ? title : review.title,
      body: form.isDirty("body") ? body : review.body,
    });

    form.reset();
    dispatch(setRatingInput(3));
  };

  return { review, form, handleUpdateReviewById, isPending };
};
