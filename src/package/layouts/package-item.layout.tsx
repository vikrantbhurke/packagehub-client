import {
  Stack,
  Text,
  Box,
  Title,
  Anchor,
  Group,
  Rating,
  Button,
} from "@mantine/core";
import {
  oneBg,
  borderLC,
  roundBorder,
  twoBg,
  oneTxTwoBgButtonPseudo,
  threeBg,
  noBorder,
  oneTx,
  themeGreenColor,
} from "@/global/styles/app.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/global/states/store";
import { useGetReviewByPackageIdAndReviewerId } from "@/review/hooks/read";
import { packageUtility } from "../package.utility";
import { globalUtility } from "@/global/utilities";
import { setPage } from "@/review/review.slice";
import { useDispatch } from "react-redux";

export const PackageItemLayout = ({ pkg }: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isMobile } = useSelector((state: RootState) => state.view);
  const { auth } = useSelector((state: RootState) => state.auth);

  const { sort, order, rating } = useSelector(
    (state: RootState) => state.review
  );

  const { review, isPending } = useGetReviewByPackageIdAndReviewerId({
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
          maw={isMobile ? 600 : 670}
          miw={isMobile ? "100%" : 570}
          gap="lg"
          p={isMobile ? "md" : "xl"}
          bg={oneBg}
          className={`${isMobile ? `${noBorder}` : `${borderLC} ${roundBorder}`}`}>
          <Stack gap="xs">
            <Title
              order={5}
              td="underline"
              onClick={handleNavigateToReviewsByPackageId}>
              {pkg.name}
            </Title>

            <Group justify="space-between">
              <Group justify="start" gap="xs">
                <Rating
                  readOnly
                  fractions={4}
                  value={pkg.rating}
                  color={packageUtility.getRatingColor(pkg.rating)}
                  size="xs"
                  bg={threeBg}
                  p="xs"
                  className={roundBorder}
                />

                <Text c="dimmed" fz="xs">
                  {globalUtility.formatFloat(pkg.rating)} rating
                </Text>

                <Text c="dimmed" fz="xs">
                  {globalUtility.formatNumberWithComma(pkg.reviews)} reviews
                </Text>
              </Group>

              <Button
                px="xs"
                disabled={auth.id ? isPending : false}
                loading={auth.id ? isPending : false}
                onClick={readOrWriteHandler}
                className={`${roundBorder} ${oneTxTwoBgButtonPseudo}`}
                loaderProps={{ type: "dots", color: oneTx }}>
                {readOrWriteText}
              </Button>
            </Group>
          </Stack>

          {pkg.description !== "None" && <Text>{pkg.description}</Text>}

          <Stack gap="xs">
            {pkg.homepageUrl !== pkg.packageUrl && (
              <Text
                p="xs"
                className={`${roundBorder} ${oneTxTwoBgButtonPseudo}`}>
                Home :{" "}
                <Anchor
                  target="_blank"
                  href={pkg.homepageUrl}
                  size="sm"
                  c={themeGreenColor}>
                  {pkg.homepageUrl}
                </Anchor>
              </Text>
            )}

            <Text p="xs" className={`${roundBorder} ${oneTxTwoBgButtonPseudo}`}>
              Registry :{" "}
              <Anchor
                target="_blank"
                href={pkg.packageUrl}
                size="sm"
                c={themeGreenColor}>
                {pkg.packageUrl}
              </Anchor>
            </Text>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};
