import { useCreateFirstReview } from "./use-create-first-review.hook";
import { RootState } from "@/global/states/store";
import { useSelector } from "react-redux";
import { useForm } from "@mantine/form";
import { useLocation } from "react-router-dom";

export const useCreateFirstReviewForm = () => {
  const location = useLocation();
  const { createFirstReviewMutation, isPending } = useCreateFirstReview();
  const { ratingInput } = useSelector((state: RootState) => state.review);
  const { auth } = useSelector((state: RootState) => state.auth);

  const form = useForm({
    mode: "controlled",
    initialValues: {
      title: "",
      body: "",
    },

    validate: {
      title: (value) =>
        value.length < 5 || value.length > 50
          ? "Title must be at least 5 and at most 50 characters."
          : null,
      body: (value) =>
        value.length < 50 || value.length >= 1000
          ? "Review must be at least 50 and at most 1000 characters."
          : null,
    },
  });

  const handleCreateFirstReview = (values: any) => {
    const { title, body } = values;
    const { platform, name, homepageUrl, packageUrl, description } =
      location.state;

    createFirstReviewMutation({
      title,
      body,
      packageId: name,
      reviewerId: auth.id,
      rating: ratingInput,
      platform,
      packageUrl,
      homepageUrl,
      description,
    });

    form.reset();
  };

  return { form, handleCreateFirstReview, isPending };
};
