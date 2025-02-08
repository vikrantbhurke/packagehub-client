import { Role } from "@/user/enums";
import { RootState } from "@/global/states/store";
import {
  oneBg,
  roundBorderStyle,
  threeBg,
  twoBg,
  borderLCStyle,
  noBorderStyle,
  themeGreenColor,
  oneTxGreenBgButtonPseudoStyle,
  themeTxStyle,
  oneTxGreenTwoBgButtonPseudoStyle,
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
} from "@mantine/core";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDeleteReviewById } from "../hooks/delete";
import { globalUtility } from "@/global/utilities";
import { useDisclosure, useWindowScroll } from "@mantine/hooks";
import { IconStarFilled, IconTrash } from "@tabler/icons-react";
import { reviewUtility } from "../review.utility";
import {
  modal,
  modalOverlayProps,
  textBold,
  textBolder,
} from "@/global/styles/global.styles";
import { ReviewVoterReadonlyButtonLayout } from "./review-voter-readonly-button.layout";
import { ReviewUpvoteDownvoteButtonLayout } from "./review-upvote-downvote-button.layout";
import { setPage } from "../review.slice";
import { useDispatch } from "react-redux";
import { CustomSkeleton, I } from "@/global/components/reusables";

export const ReviewItemLayout = ({ review, isPending }: any) => {
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
            w={isMobile ? "100vw" : 600}
            gap="md"
            p={isMobile ? "md" : "xl"}
            bg={oneBg}
            className={`${isMobile ? `${noBorderStyle}` : `${borderLCStyle} ${roundBorderStyle}`}`}>
            <Stack gap="xs">
              <Group justify="space-between">
                <Group onClick={handleNavigateToUserReviews}>
                  {isPending ? (
                    <CustomSkeleton v="circular" h={40} w={40} />
                  ) : review.reviewerId.profilepic ? (
                    <Avatar src={review.reviewerId.profilepic} radius="50%" />
                  ) : (
                    <Avatar>
                      {review.reviewerId.firstname[0]}
                      {review.reviewerId.lastname[0]}
                    </Avatar>
                  )}

                  <Stack gap={0}>
                    {isPending ? (
                      <CustomSkeleton w={130} />
                    ) : (
                      <Text fw={textBolder} className={themeTxStyle}>
                        {review.reviewerId.firstname}{" "}
                        {review.reviewerId.lastname}
                      </Text>
                    )}

                    {isPending ? (
                      <CustomSkeleton h={15} />
                    ) : (
                      <Text size="sm" c="dimmed">
                        @{review.reviewerId.username}
                      </Text>
                    )}
                  </Stack>
                </Group>

                {isPending ? (
                  <CustomSkeleton h={60} w={85} />
                ) : (
                  <Rating
                    readOnly
                    value={review.rating}
                    bg={threeBg}
                    p={8}
                    pb={6}
                    className={roundBorderStyle}
                    emptySymbol={
                      <I I={IconStarFilled} size={14} color="gray" />
                    }
                    fullSymbol={
                      <I
                        I={IconStarFilled}
                        size={14}
                        color={reviewUtility.getRatingColor(review.rating)}
                      />
                    }
                  />
                )}
              </Group>

              <Stack gap={0} align="stretch">
                <Group gap={5}>
                  {isPending ? (
                    <CustomSkeleton />
                  ) : (
                    <>
                      <Text
                        size="sm"
                        c={themeGreenColor}
                        td="underline"
                        onClick={handleNavigateToPackageReviews}>
                        {review.packageId.name}
                      </Text>
                      <Text size="sm">review</Text>
                    </>
                  )}
                </Group>

                <Group gap="xs">
                  {isPending ? (
                    <CustomSkeleton h={15} />
                  ) : (
                    <Text fz="xs" c="dimmed">
                      {globalUtility.formatDateDistance(review.updatedAt)}
                    </Text>
                  )}
                </Group>
              </Stack>
            </Stack>

            <Stack gap="xs">
              {isPending ? (
                <CustomSkeleton w={200} />
              ) : (
                <Text fw={textBolder}>{review.title}</Text>
              )}

              {isPending ? (
                <Stack gap={0} miw={400}>
                  <CustomSkeleton w="100%" />
                  <CustomSkeleton w="100%" />
                  <CustomSkeleton w="100%" />
                </Stack>
              ) : (
                <Text
                  size="sm"
                  dangerouslySetInnerHTML={{ __html: review.body }}
                />
              )}
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
                  {isPending ? (
                    <CustomSkeleton v="circular" w={20} h={20} />
                  ) : auth.role === Role.Public ? (
                    <ReviewVoterReadonlyButtonLayout>
                      <Text fz="xs" fw={textBold}>
                        {globalUtility.formatNumberWithComma(review.votes)}
                      </Text>
                    </ReviewVoterReadonlyButtonLayout>
                  ) : (
                    <ReviewUpvoteDownvoteButtonLayout review={review}>
                      <Text fz="xs" fw={textBold}>
                        {globalUtility.formatNumberWithComma(review.votes)}
                      </Text>
                    </ReviewUpvoteDownvoteButtonLayout>
                  )}
                </Group>

                {isPending ? (
                  <CustomSkeleton w={60} />
                ) : (
                  <Text fz="xs" fw={textBold}>
                    Votes
                  </Text>
                )}
              </Group>

              {isPending ? (
                <></>
              ) : (
                <>
                  {review.reviewerId._id === auth.id && (
                    <Group>
                      <Text
                        fz="xs"
                        fw={textBold}
                        p="xs"
                        onClick={handleEdit}
                        className={`${roundBorderStyle} ${oneTxGreenBgButtonPseudoStyle}`}>
                        Edit
                      </Text>
                      <Text
                        fz="xs"
                        fw={textBold}
                        p="xs"
                        onClick={open}
                        className={`${roundBorderStyle} ${oneTxGreenBgButtonPseudoStyle}`}>
                        Delete
                      </Text>
                    </Group>
                  )}
                </>
              )}
            </Group>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};
