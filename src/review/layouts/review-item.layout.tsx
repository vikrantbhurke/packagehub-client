import { Role } from "@/user/enums";
import { RootState } from "@/global/states/store";
import {
  oneBg,
  roundBorder,
  threeBg,
  twoBg,
  borderLC,
  noBorder,
  oneTxThreeBgButtonPseudo,
  fiveBg,
  oneTxThreeBg,
  themeGreenColor,
} from "@/global/styles/app.css";
import {
  Avatar,
  Box,
  Button,
  Group,
  Modal,
  Rating,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDeleteReviewById } from "../hooks/delete";
import { globalUtility } from "@/global/utilities";
import { useDisclosure, useWindowScroll } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";
import { reviewUtility } from "../review.utility";
import { modal, modalOverlayProps } from "@/global/styles/global.styles";
import { ReviewVoterReadonlyButtonLayout } from "./review-voter-readonly-button.layout";
import { ReviewUpvoteDownvoteButtonLayout } from "./review-upvote-downvote-button.layout";
import { setPage } from "../review.slice";
import { useDispatch } from "react-redux";

export const ReviewItemLayout = ({ review }: any) => {
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

  const handleEdit = () => navigate(`/reviews/${review.id}/edit`);

  const handleDelete = () => {
    deleteReviewByIdMutation(review.id);
  };

  const handleNavigateToUserReviews = () => {
    dispatch(setPage(1));
    navigate(
      `/reviews/reviewerId/${review.reviewerId._id}?page=1&sort=${sort}&order=${order}&rating=${rating}`
    );
    scrollTo({ y: 0 });
  };

  const handleNavigateToPackageReviews = () => {
    dispatch(setPage(1));
    navigate(
      `/reviews/packageId/${review.packageId._id}?page=1&sort=${sort}&order=${order}&rating=${rating}`
    );
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

      <Box component="div" bg={isMobile ? oneBg : twoBg} h="100%">
        <Stack
          h="100%"
          gap="xl"
          align="center"
          justify={isMobile ? "start" : "center"}>
          <Stack
            maw={isMobile ? 600 : 670}
            miw={isMobile ? "100%" : 570}
            gap="md"
            p={isMobile ? "md" : "xl"}
            bg={oneBg}
            className={`${isMobile ? `${noBorder}` : `${borderLC} ${roundBorder}`}`}>
            <Stack gap="xs">
              <Group justify="space-between">
                <Group onClick={handleNavigateToUserReviews}>
                  {review.reviewerId.profilepic ? (
                    <Avatar src={review.reviewerId.profilepic} radius="50%" />
                  ) : (
                    <Avatar>
                      {review.reviewerId.firstname[0]}
                      {review.reviewerId.lastname[0]}
                    </Avatar>
                  )}

                  <Stack gap={0}>
                    <Title order={5}>
                      {review.reviewerId.firstname} {review.reviewerId.lastname}
                    </Title>
                    <Text size="sm" c="dimmed" td="underline">
                      @{review.reviewerId.username}
                    </Text>
                  </Stack>
                </Group>

                <Rating
                  readOnly
                  value={review.rating}
                  color={reviewUtility.getRatingColor(review.rating)}
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
                    {review.packageId.name}
                  </Text>
                  <Text size="sm">review</Text>
                </Group>
                <Group gap="xs">
                  <Text size="sm" c="dimmed">
                    {globalUtility.formatDateDistance(review.updatedAt)}
                  </Text>
                </Group>
              </Stack>
            </Stack>

            <Stack gap="xs">
              <Title order={5}>{review.title}</Title>

              <Text size="sm">{review.body}</Text>
            </Stack>

            <Group>
              <Group p={6} gap={8} className={`${roundBorder} ${oneTxThreeBg}`}>
                <Group gap={4} p={4} bg={fiveBg} className={`${roundBorder}`}>
                  {auth.role === Role.Public ? (
                    <ReviewVoterReadonlyButtonLayout>
                      <Text fw={500}>
                        {globalUtility.formatNumberWithComma(review.votes)}
                      </Text>
                    </ReviewVoterReadonlyButtonLayout>
                  ) : (
                    <ReviewUpvoteDownvoteButtonLayout review={review}>
                      <Text fw={500}>
                        {globalUtility.formatNumberWithComma(review.votes)}
                      </Text>
                    </ReviewUpvoteDownvoteButtonLayout>
                  )}
                </Group>
                <Text fw={500}>Votes</Text>
              </Group>

              {review.reviewerId._id === auth.id && (
                <Group>
                  <Text
                    fw={500}
                    p="xs"
                    onClick={handleEdit}
                    className={`${roundBorder} ${oneTxThreeBgButtonPseudo}`}>
                    Edit
                  </Text>
                  <Text
                    fw={500}
                    p="xs"
                    onClick={open}
                    className={`${roundBorder} ${oneTxThreeBgButtonPseudo}`}>
                    Delete
                  </Text>
                </Group>
              )}
            </Group>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};
