import {
  Box,
  Title,
  Stack,
  Rating,
  Button,
  TextInput,
  Text,
  Group,
  ActionIcon,
  Grid,
} from "@mantine/core";
import {
  oneBg,
  threeBg,
  twoBg,
  borderLCStyle,
  roundBorderStyle,
} from "@/global/styles/app.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/global/states/store";
import { setRatingInput } from "../review.slice";
import { reviewUtility } from "../review.utility";
import { IconRefresh, IconStarFilled } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useCreateFirstReviewForm } from "../hooks/create";
import { setFocusedInput } from "@/global/states/view.slice";
import { getFormTextInputStyles } from "@/global/styles/global.styles";
import { I } from "@/global/components/reusables";
import { RichTextEditor } from "./rich-text-editor.layout";

export const CreateFirstReviewFormLayout = ({}: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { ratingInput } = useSelector((state: RootState) => state.review);

  const { focusedInput, isMobile } = useSelector(
    (state: RootState) => state.view
  );

  const handleFocus = (id: string) => dispatch(setFocusedInput(id));
  const handleBlur = () => dispatch(setFocusedInput(""));

  const { form, handleCreateFirstReview, isPending } =
    useCreateFirstReviewForm();

  const handleRating = (value: any) => dispatch(setRatingInput(value));

  const handleFormReset = () => {
    form.reset();
    dispatch(setRatingInput(3));
  };

  const handleCancel = () => navigate(-1);

  return (
    <Box component="div" bg={isMobile ? oneBg : twoBg} h="100%">
      <Stack px="md" h="100%" gap="xl" justify="center" align="center" py="xl">
        <form onSubmit={form.onSubmit(handleCreateFirstReview)}>
          <Stack
            w={isMobile ? "100vw" : 600}
            gap="lg"
            bg={oneBg}
            p={isMobile ? "md" : "xl"}
            className={`${isMobile ? "" : `${borderLCStyle} ${roundBorderStyle}`} `}>
            <Stack gap="xl">
              <Stack gap={4}>
                <Group gap={0} align="center" justify="space-between">
                  <Title order={6}>Rate your experience</Title>

                  {form.isDirty() ? (
                    <ActionIcon aria-label="Refresh" onClick={handleFormReset}>
                      <I I={IconRefresh} />
                    </ActionIcon>
                  ) : (
                    <ActionIcon
                      disabled
                      c="transparent"
                      aria-label="Refresh Disabled"
                    />
                  )}
                </Group>

                <Rating
                  value={ratingInput}
                  bg={threeBg}
                  p={8}
                  pb={4}
                  onChange={handleRating}
                  className={roundBorderStyle}
                  emptySymbol={<I I={IconStarFilled} color="gray" />}
                  fullSymbol={
                    <I
                      I={IconStarFilled}
                      color={reviewUtility.getRatingColor(ratingInput)}
                    />
                  }
                />
              </Stack>

              <Stack gap={4}>
                <Group justify="space-between" w="100%">
                  <Title order={6}>Give your review a title</Title>
                  <Text
                    fz="xs"
                    c={reviewUtility.getTitleColor(form.values.title.length)}>
                    {form.values.title.length} / 50
                  </Text>
                </Group>

                <TextInput
                  minLength={5}
                  maxLength={50}
                  w="100%"
                  placeholder="Title of your review..."
                  styles={getFormTextInputStyles(focusedInput === "title")}
                  wrapperProps={{
                    onFocus: () => handleFocus("title"),
                    onBlur: handleBlur,
                  }}
                  key={form.key("title")}
                  {...form.getInputProps("title")}
                />
              </Stack>

              <Stack gap={4}>
                <Group justify="space-between" w="100%">
                  <Title order={6}>Describe your experience</Title>

                  <Text
                    fz="xs"
                    c={reviewUtility.getBodyColor(
                      reviewUtility.stripHtmlTags(form.values.body).length
                    )}>
                    {reviewUtility.stripHtmlTags(form.values.body).length} /
                    1000
                  </Text>
                </Group>

                <RichTextEditor form={form} />
              </Stack>
            </Stack>

            <Grid>
              <Grid.Col span={6}>
                <Button
                  type="submit"
                  fullWidth
                  bg="green"
                  disabled={isPending}
                  loading={isPending}
                  loaderProps={{ type: "dots" }}>
                  Submit Review
                </Button>
              </Grid.Col>

              <Grid.Col span={6}>
                <Button fullWidth bg="yellow" onClick={handleCancel}>
                  Cancel
                </Button>
              </Grid.Col>
            </Grid>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
};
