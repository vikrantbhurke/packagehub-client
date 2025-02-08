import { Stack, Text, Box, Anchor, Group, Rating, Button } from "@mantine/core";
import {
  oneBg,
  borderLCStyle,
  roundBorderStyle,
  twoBg,
  threeBg,
  noBorderStyle,
  oneTx,
  themeGreenColor,
  oneTxGreenBgButtonPseudoStyle,
  themeTxStyle,
} from "@/global/styles/app.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/global/states/store";
import { useGetReviewByPackageIdAndReviewerId } from "@/review/hooks/read";
import { packageUtility } from "../package.utility";
import { globalUtility } from "@/global/utilities";
import { setPage } from "@/review/review.slice";
import { useDispatch } from "react-redux";
import { textBolder, wordBreakWhiteSpace } from "@/global/styles/global.styles";
import { IconStarFilled } from "@tabler/icons-react";
import { CustomSkeleton, I } from "@/global/components/reusables";

export const PackageItemLayout = ({ pkg, isPending }: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isMobile } = useSelector((state: RootState) => state.view);
  const { auth } = useSelector((state: RootState) => state.auth);

  const { sort, order, rating } = useSelector(
    (state: RootState) => state.review
  );

  const { review, isPending: isReviewPending } =
    useGetReviewByPackageIdAndReviewerId({
      pid: pkg.id,
      rwid: auth.id,
    });

  const handleNativateToCreateNextReview = () => {
    if (!auth.id) {
      navigate("/sign-in");
      return;
    }

    navigate(`/reviews/next`, {
      state: { pid: pkg.id },
    });
  };

  const handleNavigateToReviewsByPackageId = () => {
    dispatch(setPage(1));
    navigate(
      `/reviews/packageId/${pkg.id}?page=1&sort=${sort}&order=${order}&rating=${rating}`
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

  return (
    <Box component="div" bg={isMobile ? oneBg : twoBg} h="100%">
      <Stack
        h="100%"
        gap="xl"
        align="center"
        justify={isMobile ? "start" : "center"}>
        <Stack
          w={isMobile ? "100vw" : 600}
          gap="lg"
          p={isMobile ? "md" : "xl"}
          bg={oneBg}
          className={`${isMobile ? `${noBorderStyle}` : `${borderLCStyle} ${roundBorderStyle}`}`}>
          <Stack gap="xs">
            {isPending ? (
              <CustomSkeleton />
            ) : (
              <Text
                fw={textBolder}
                className={themeTxStyle}
                td="underline"
                onClick={handleNavigateToReviewsByPackageId}>
                {pkg.name}
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
                    value={pkg.rating}
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
                        color={packageUtility.getRatingColor(pkg.rating)}
                      />
                    }
                  />
                )}

                {isPending ? (
                  <CustomSkeleton h={15} w={50} />
                ) : (
                  <Text c="dimmed" fz="xs">
                    {globalUtility.formatFloat(pkg.rating)} rating
                  </Text>
                )}

                {isPending ? (
                  <CustomSkeleton h={15} w={50} />
                ) : (
                  <Text c="dimmed" fz="xs">
                    {globalUtility.formatNumberWithComma(pkg.reviews)} reviews
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
          </Stack>

          {isPending ? (
            <CustomSkeleton w="100%" />
          ) : (
            <> {pkg.description !== "None" && <Text>{pkg.description}</Text>}</>
          )}

          <Stack gap="xs">
            {isPending ? (
              <Stack gap="xs">
                <CustomSkeleton v="rounded" h={40} w="100%" />
                <CustomSkeleton v="rounded" h={40} w="100%" />
              </Stack>
            ) : (
              <>
                {pkg.homepageUrl !== pkg.packageUrl && (
                  <Text
                    p="xs"
                    className={`${roundBorderStyle} ${oneTxGreenBgButtonPseudoStyle}`}>
                    Home :{" "}
                    <Anchor
                      style={wordBreakWhiteSpace}
                      target="_blank"
                      href={pkg.homepageUrl}
                      size="sm"
                      c={themeGreenColor}>
                      {pkg.homepageUrl}
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
                    href={pkg.packageUrl}
                    size="sm"
                    c={themeGreenColor}>
                    {pkg.packageUrl}
                  </Anchor>
                </Text>
              </>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};
