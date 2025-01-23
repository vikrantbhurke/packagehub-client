import {
  Anchor,
  Button,
  Group,
  Rating,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { packageUtility } from "../package.utility";
import {
  oneTx,
  oneTxTwoBgButtonPseudo,
  roundBorder,
  themeGreenColor,
  threeBg,
} from "@/global/styles/app.css";
import { globalUtility } from "@/global/utilities";
import { useSelector } from "react-redux";
import { RootState } from "@/global/states/store";
import { useGetReviewByPackageIdAndReviewerId } from "@/review/hooks/read";
import { setPage } from "@/review/review.slice";
import { useDispatch } from "react-redux";

export const PackageListItemLayout = ({ item }: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((state: RootState) => state.auth);

  const { sort, order, rating } = useSelector(
    (state: RootState) => state.review
  );

  const { review, isPending } = useGetReviewByPackageIdAndReviewerId({
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

  return (
    <Stack p="md" gap="xs">
      <Title
        order={5}
        td="underline"
        onClick={handleNavigateToReviewsByPackageId}>
        {item.name}
      </Title>

      <Group justify="space-between">
        <Group justify="start">
          <Rating
            readOnly
            fractions={4}
            value={item.rating}
            color={packageUtility.getRatingColor(item.rating)}
            size="xs"
            bg={threeBg}
            p="xs"
            className={roundBorder}
          />

          <Text c="dimmed">
            {globalUtility.formatFloat(item.rating)} rating
          </Text>

          <Text c="dimmed">
            {globalUtility.formatNumberWithComma(item.reviews)} reviews
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

      {item.description !== "None" && <Text>{item.description}</Text>}

      {item.homepageUrl !== item.packageUrl && (
        <Text p="xs" className={`${roundBorder} ${oneTxTwoBgButtonPseudo}`}>
          Home :{" "}
          <Anchor
            target="_blank"
            href={item.homepageUrl}
            size="sm"
            c={themeGreenColor}>
            {item.homepageUrl}
          </Anchor>
        </Text>
      )}

      <Text p="xs" className={`${roundBorder} ${oneTxTwoBgButtonPseudo}`}>
        Registry :{" "}
        <Anchor
          target="_blank"
          href={item.packageUrl}
          size="sm"
          c={themeGreenColor}>
          {item.packageUrl}
        </Anchor>
      </Text>
    </Stack>
  );
};
