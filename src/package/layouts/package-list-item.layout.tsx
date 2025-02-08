import { Anchor, Button, Group, Rating, Stack, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { packageUtility } from "../package.utility";
import {
  oneTx,
  oneTxGreenBgButtonPseudoStyle,
  roundBorderStyle,
  themeGreenColor,
  themeTxStyle,
  threeBg,
} from "@/global/styles/app.css";
import { globalUtility } from "@/global/utilities";
import { useSelector } from "react-redux";
import { RootState } from "@/global/states/store";
import { useGetReviewByPackageIdAndReviewerId } from "@/review/hooks/read";
import { setPage } from "@/review/review.slice";
import { useDispatch } from "react-redux";
import { textBolder, wordBreakWhiteSpace } from "@/global/styles/global.styles";
import { IconStarFilled } from "@tabler/icons-react";
import { CustomSkeleton, I } from "@/global/components/reusables";

export const PackageListItemLayout = ({ item }: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((state: RootState) => state.auth);

  const { sort, order, rating } = useSelector(
    (state: RootState) => state.review
  );

  const { review, isPending: isReviewPending } =
    useGetReviewByPackageIdAndReviewerId({
      pid: item.id,
      rwid: auth.id,
    });

  const handleNativateToCreateNextReview = () => {
    if (!auth.id) {
      navigate("/sign-in");
      return;
    }

    navigate(`/reviews/next`, {
      state: { pid: item.id },
    });
  };

  const handleNavigateToReviewsByPackageId = () => {
    dispatch(setPage(1));
    navigate(
      `/reviews/packageId/${item.id}?page=1&sort=${sort}&order=${order}&rating=${rating}`
    );
  };

  const handleNavigateToReview = (rid: string) => {
    navigate(`/reviews/${rid}`);
  };

  let readOrWriteText;
  let readOrWriteHandler;

  if (review?.id) {
    readOrWriteText = "Read your review";
    readOrWriteHandler = () => handleNavigateToReview(review.id);
  } else {
    readOrWriteText = "Write a review";
    readOrWriteHandler = () => handleNativateToCreateNextReview();
  }

  const isPending = item.isPending;

  return (
    <Stack p="md" gap="xs">
      {isPending ? (
        <CustomSkeleton />
      ) : (
        <Text
          fw={textBolder}
          className={themeTxStyle}
          td="underline"
          onClick={handleNavigateToReviewsByPackageId}>
          {item.name}
        </Text>
      )}

      <Group justify="space-between">
        <Group justify="start" gap="xs">
          {isPending ? (
            <CustomSkeleton v="rounded" h={40} w={85} />
          ) : (
            <Rating
              readOnly
              fractions={4}
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
                  color={packageUtility.getRatingColor(item.rating)}
                />
              }
            />
          )}

          {isPending ? (
            <CustomSkeleton h={15} w={50} />
          ) : (
            <Text c="dimmed" fz="xs">
              {globalUtility.formatFloat(item.rating)} rating
            </Text>
          )}

          {isPending ? (
            <CustomSkeleton h={15} w={50} />
          ) : (
            <Text c="dimmed" fz="xs">
              {globalUtility.formatNumberWithComma(item.reviews)} reviews
            </Text>
          )}
        </Group>

        {isPending ? (
          <CustomSkeleton h={50} />
        ) : (
          <Button
            px="xs"
            fz="xs"
            disabled={auth.id ? isReviewPending : false}
            loading={auth.id ? isReviewPending : false}
            onClick={readOrWriteHandler}
            className={`${roundBorderStyle} ${oneTxGreenBgButtonPseudoStyle}`}
            loaderProps={{ type: "dots", color: oneTx }}>
            {readOrWriteText}
          </Button>
        )}
      </Group>

      {isPending ? (
        <CustomSkeleton w="100%" />
      ) : (
        <> {item.description !== "None" && <Text>{item.description}</Text>}</>
      )}

      {isPending ? (
        <Stack gap="xs">
          <CustomSkeleton v="rounded" h={40} w="100%" />
          <CustomSkeleton v="rounded" h={40} w="100%" />
        </Stack>
      ) : (
        <>
          {item.homepageUrl !== item.packageUrl && (
            <Text
              p="xs"
              className={`${roundBorderStyle} ${oneTxGreenBgButtonPseudoStyle}`}>
              Home :{" "}
              <Anchor
                style={wordBreakWhiteSpace}
                target="_blank"
                href={item.homepageUrl}
                size="sm"
                c={themeGreenColor}>
                {item.homepageUrl}
              </Anchor>
            </Text>
          )}

          <Text
            p="xs"
            className={`${roundBorderStyle} ${oneTxGreenBgButtonPseudoStyle}`}>
            Registry :{" "}
            <Anchor
              style={wordBreakWhiteSpace}
              target="_blank"
              href={item.packageUrl}
              size="sm"
              c={themeGreenColor}>
              {item.packageUrl}
            </Anchor>
          </Text>
        </>
      )}
    </Stack>
  );
};
