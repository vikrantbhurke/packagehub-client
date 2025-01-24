import {
  Avatar,
  Button,
  Group,
  Modal,
  Rating,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { reviewUtility } from "../review.utility";
import {
  fiveBg,
  fiveTxTwoBg,
  fiveTxTwoBgButtonPseudo,
  roundBorder,
  themeGreenColor,
  threeBg,
} from "@/global/styles/app.css";
import { globalUtility } from "@/global/utilities";
import { RootState } from "@/global/states/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDisclosure, useWindowScroll } from "@mantine/hooks";
import { useDeleteReviewById } from "../hooks/delete";
import { modal, modalOverlayProps } from "@/global/styles/global.styles";
import { IconTrash } from "@tabler/icons-react";
import { ReviewVoterReadonlyButtonLayout } from "./review-voter-readonly-button.layout";
import { ReviewUpvoteDownvoteButtonLayout } from "./review-upvote-downvote-button.layout";
import { Role } from "@/user/enums";
import { useDispatch } from "react-redux";
import { setPage } from "../review.slice";

export const ReviewListItemLayout = ({ item }: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isMobile } = useSelector((state: RootState) => state.view);
  const [, scrollTo] = useWindowScroll();
  const [opened, { open, close }] = useDisclosure(false);
  const { deleteReviewByIdMutation } = useDeleteReviewById();
  const { auth } = useSelector((state: RootState) => state.auth);

  const { sort, order, rating } = useSelector(
    (state: RootState) => state.review
  );

  const handleEdit = () => navigate(`/reviews/${item.id}/edit`);

  const handleDelete = () => {
    deleteReviewByIdMutation(item.id);
  };

  const handleNavigateToUserReviews = () => {
    dispatch(setPage(1));
    navigate(
      `/reviews/reviewerId/${item.reviewerId._id}?page=1&sort=${sort}&order=${order}&rating=${rating}`
    );
    scrollTo({ y: 0 });
  };

  const handleNavigateToPackageReviews = () => {
    dispatch(setPage(1));
    navigate(
      `/reviews/packageId/${item.packageId._id}?page=1&sort=${sort}&order=${order}&rating=${rating}`
    );
    scrollTo({ y: 0 });
  };

  const handleReview = () => {
    navigate(`/reviews/${item.id}`);
    scrollTo({ y: 0 });
  };

  return (
    <>
      <Modal
        styles={modal}
        overlayProps={modalOverlayProps}
        opened={opened}
        onClose={close}
        centered>
        <Stack align="center">
          <Text>Are you sure you want to delete the review?</Text>
          <Button
            fullWidth
            bg="red"
            onClick={handleDelete}
            leftSection={<IconTrash stroke={1.5} size={20} />}>
            Delete Review
          </Button>
        </Stack>
      </Modal>

      <Stack p="md" gap="md">
        <Stack gap="xs">
          <Group justify="space-between">
            <Group onClick={handleNavigateToUserReviews}>
              {item.reviewerId.profilepic ? (
                <Avatar src={item.reviewerId.profilepic} radius="50%" />
              ) : (
                <Avatar>
                  {item.reviewerId.firstname[0]}
                  {item.reviewerId.lastname[0]}
                </Avatar>
              )}

              <Stack gap={0}>
                <Title order={6}>
                  {item.reviewerId.firstname} {item.reviewerId.lastname}
                </Title>
                <Text size="sm" c="dimmed">
                  @{item.reviewerId.username}
                </Text>
              </Stack>
            </Group>

            <Rating
              readOnly
              value={item.rating}
              color={reviewUtility.getRatingColor(item.rating)}
              bg={threeBg}
              size="xs"
              p="xs"
              className={roundBorder}
            />
          </Group>

          <Stack gap={0} align="stretch">
            <Group gap={5}>
              <Text
                size="sm"
                c={themeGreenColor}
                td="underline"
                onClick={handleNavigateToPackageReviews}>
                {item.packageId.name}
              </Text>
              <Text size="sm">review</Text>
            </Group>
            <Group gap="xs">
              <Text fz="xs" c="dimmed">
                {globalUtility.formatDateDistance(item.updatedAt)}
              </Text>
            </Group>
          </Stack>
        </Stack>

        <Stack onClick={handleReview} gap="xs">
          <Title order={6} td="underline">
            {item.title}
          </Title>

          <Text lineClamp={3} size={isMobile ? "sm" : "md"}>
            {item.body}
          </Text>
        </Stack>

        <Group>
          <Group p={6} gap={8} className={`${roundBorder} ${fiveTxTwoBg}`}>
            <Group gap={4} p={4} bg={fiveBg} className={`${roundBorder}`}>
              {auth.role === Role.Public ? (
                <ReviewVoterReadonlyButtonLayout>
                  <Text fw={500}>
                    {globalUtility.formatNumberWithComma(item.votes)}
                  </Text>
                </ReviewVoterReadonlyButtonLayout>
              ) : (
                <ReviewUpvoteDownvoteButtonLayout review={item}>
                  <Text fw={500}>
                    {globalUtility.formatNumberWithComma(item.votes)}
                  </Text>
                </ReviewUpvoteDownvoteButtonLayout>
              )}
            </Group>
            <Text fw={500}>Votes</Text>
          </Group>

          {item.reviewerId._id === auth.id && (
            <Group>
              <Text
                fw={500}
                p="xs"
                onClick={handleEdit}
                className={`${roundBorder} ${fiveTxTwoBgButtonPseudo}`}>
                Edit
              </Text>
              <Text
                fw={500}
                p="xs"
                onClick={open}
                className={`${roundBorder} ${fiveTxTwoBgButtonPseudo}`}>
                Delete
              </Text>
            </Group>
          )}
        </Group>
      </Stack>
    </>
  );
};
