import { Avatar, Group, Rating, Stack, Text } from "@mantine/core";
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
import { textBold, textBolder } from "@/global/styles/global.styles";
import { IconStarFilled } from "@tabler/icons-react";
import { ReviewVoterReadonlyButton } from "./review-voter-readonly-button.layout";
import { ReviewUpvoteDownvoteButton } from "./review-upvote-downvote-button.layout";
import { Role } from "@/user/enums";
import { useDispatch } from "react-redux";
import { setPage } from "../review.slice";
import { CustomSkeleton, I } from "@/global/components/reusables";
import { DeleteReviewModal } from "./delete-review.modal";

export const ReviewListItemLayout = ({ item }: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isMobile } = useSelector((state: RootState) => state.view);
  const [, scrollTo] = useWindowScroll();
  const [opened, { open, close }] = useDisclosure(false);
  const { auth } = useSelector((state: RootState) => state.auth);

  const { sort, order, rating } = useSelector(
    (state: RootState) => state.review
  );

  const handleEdit = () => navigate(`/reviews/${item.id}/edit`);

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

  const isPending = item.isPending;

  return (
    <>
      <DeleteReviewModal rid={item.id} opened={opened} close={close} />

      <Stack p="md" gap="md">
        <Stack gap="xs">
          <Group justify="space-between">
            <Group onClick={handleNavigateToUserReviews}>
              {isPending ? (
                <CustomSkeleton v="circular" h={40} w={40} />
              ) : item.reviewerId.profilepic ? (
                <Avatar src={item.reviewerId.profilepic} radius="50%" />
              ) : (
                <Avatar>
                  {item.reviewerId.firstname[0]}
                  {item.reviewerId.lastname[0]}
                </Avatar>
              )}

              <Stack gap={0}>
                {isPending ? (
                  <CustomSkeleton w={130} />
                ) : (
                  <Text fw={textBolder} className={themeTxStyle}>
                    {item.reviewerId.firstname} {item.reviewerId.lastname}
                  </Text>
                )}

                {isPending ? (
                  <CustomSkeleton h={15} />
                ) : (
                  <Text size="sm" c="dimmed">
                    @{item.reviewerId.username}
                  </Text>
                )}
              </Stack>
            </Group>

            {isPending ? (
              <CustomSkeleton h={60} w={85} />
            ) : (
              <Rating
                readOnly
                value={item.rating}
                bg={threeBg}
                p={8}
                pb={6}
                className={roundBorderStyle}
                emptySymbol={<I I={IconStarFilled} size={14} color="gray" />}
                fullSymbol={
                  <I
                    I={IconStarFilled}
                    size={14}
                    color={reviewUtility.getRatingColor(item.rating)}
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
                    {item.packageId.name}
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
                  {globalUtility.formatDateDistance(item.updatedAt)}
                </Text>
              )}
            </Group>
          </Stack>
        </Stack>

        <Stack onClick={handleReview} gap="xs">
          {isPending ? (
            <CustomSkeleton w={200} />
          ) : (
            <Text fw={textBolder} className={themeTxStyle}>
              {item.title}
            </Text>
          )}

          {isPending ? (
            <Stack gap={0} miw={400}>
              <CustomSkeleton w="100%" />
              <CustomSkeleton w="100%" />
              <CustomSkeleton w="100%" />
            </Stack>
          ) : (
            <Text
              lineClamp={3}
              size={isMobile ? "sm" : "md"}
              className={themeTxStyle}
              dangerouslySetInnerHTML={{ __html: item.body }}
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
                <ReviewVoterReadonlyButton>
                  <Text fz="xs" fw={textBold}>
                    {globalUtility.formatNumberWithComma(item.votes)}
                  </Text>
                </ReviewVoterReadonlyButton>
              ) : (
                <ReviewUpvoteDownvoteButton review={item}>
                  <Text fz="xs" fw={textBold}>
                    {globalUtility.formatNumberWithComma(item.votes)}
                  </Text>
                </ReviewUpvoteDownvoteButton>
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
              {item.reviewerId._id === auth.id && (
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
    </>
  );
};
