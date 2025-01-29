import {
  Avatar,
  Button,
  Group,
  Modal,
  Rating,
  Stack,
  Text,
} from "@mantine/core";
import { reviewUtility } from "../review.utility";
import {
  roundBorderStyle,
  themeGreenColor,
  threeBg,
  oneTxGreenBgButtonPseudoStyle,
  themeTxStyle,
  oneTxGreenTwoBgButtonPseudoStyle,
} from "@/global/styles/app.css";
import { globalUtility } from "@/global/utilities";
import { RootState } from "@/global/states/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDisclosure, useWindowScroll } from "@mantine/hooks";
import { useDeleteReviewById } from "../hooks/delete";
import {
  modal,
  modalOverlayProps,
  textBold,
  textBolder,
} from "@/global/styles/global.styles";
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
                <Text fw={textBolder} className={themeTxStyle}>
                  {item.reviewerId.firstname} {item.reviewerId.lastname}
                </Text>
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
              className={roundBorderStyle}
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
          <Text fw={textBolder} td="underline" className={themeTxStyle}>
            {item.title}
          </Text>

          <Text
            lineClamp={3}
            size={isMobile ? "sm" : "md"}
            className={themeTxStyle}>
            {item.body}
          </Text>
        </Stack>

        <Group>
          <Group
            p={6}
            gap={8}
            className={`${roundBorderStyle} ${oneTxGreenBgButtonPseudoStyle}`}>
            <Group
              p={4}
              gap={4}
              className={`${roundBorderStyle} ${oneTxGreenTwoBgButtonPseudoStyle}`}>
              {auth.role === Role.Public ? (
                <ReviewVoterReadonlyButtonLayout>
                  <Text fw={textBold}>
                    {globalUtility.formatNumberWithComma(item.votes)}
                  </Text>
                </ReviewVoterReadonlyButtonLayout>
              ) : (
                <ReviewUpvoteDownvoteButtonLayout review={item}>
                  <Text fw={textBold}>
                    {globalUtility.formatNumberWithComma(item.votes)}
                  </Text>
                </ReviewUpvoteDownvoteButtonLayout>
              )}
            </Group>
            <Text fw={textBold}>Votes</Text>
          </Group>

          {item.reviewerId._id === auth.id && (
            <Group>
              <Text
                fw={textBold}
                p="xs"
                onClick={handleEdit}
                className={`${roundBorderStyle} ${oneTxGreenBgButtonPseudoStyle}`}>
                Edit
              </Text>
              <Text
                fw={textBold}
                p="xs"
                onClick={open}
                className={`${roundBorderStyle} ${oneTxGreenBgButtonPseudoStyle}`}>
                Delete
              </Text>
            </Group>
          )}
        </Group>
      </Stack>
    </>
  );
};
