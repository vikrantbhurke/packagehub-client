import {
  layoutCompHeight,
  mainContentWidth,
  marginLeft,
  responsiveBreakpoint,
  stringTruncate,
  textBold,
} from "@/global/styles/global.styles";
import { ActionIcon, Container, Group, Stack, Text } from "@mantine/core";
import { Outlet, useNavigate } from "react-router-dom";
import {
  IconFileDescription,
  IconFilter,
  IconTrash,
} from "@tabler/icons-react";
import {
  borderLCStyle,
  oneBg,
  oneTx,
  oneTxOneBgButtonPseudoStyle,
  roundBorderStyle,
  themeGreenColor,
  noBorderStyle,
} from "@/global/styles/app.css";
import { useState } from "react";
import { globalUtility } from "@/global/utilities";
import { I } from "@/global/components/reusables";
import { useSelector } from "react-redux";
import { useDisclosure } from "@mantine/hooks";
import { useGetUserById } from "@/user/hooks/read";
import { useGetPackageById } from "@/package/hooks/read";
import { ReviewsFilterBox } from "./reviews-filter.box";
import { ReviewsFilterModal } from "./reviews-filter.modal";
import { DeleteReviewsModal } from "./delete-reviews.modal";
import { RootState } from "@/global/states/store";

export const ReviewsLayout = () => {
  const navigate = useNavigate();
  const { pkg } = useGetPackageById();
  const { user } = useGetUserById();
  const { auth } = useSelector((state: RootState) => state.auth);
  const { isMobile, search } = useSelector((state: RootState) => state.view);

  const [filterOpened, { open: openFilter, close: closeFilter }] =
    useDisclosure(false);

  const [
    deleteReviewsOpened,
    { open: openDeleteReviews, close: closeDeleteReviews },
  ] = useDisclosure(false);

  const [data, setData] = useState<any>({
    page: 0,
    totalPages: 0,
    totalElements: 0,
  });

  const handleNavigateToPackageOrUser = () => {
    if (pkg) {
      navigate(`/packages/${pkg.id}`);
    } else if (user) {
      navigate(`/users/${user.id}`);
    }
  };

  const isSearchingReviews = location.pathname.includes("search");

  return (
    <>
      <DeleteReviewsModal
        opened={deleteReviewsOpened}
        close={closeDeleteReviews}
      />

      <Container size={mainContentWidth} p={0}>
        <Group align="start" gap="sm">
          <ReviewsFilterBox />

          <Stack
            w={isMobile ? "100%" : "69%"}
            gap={0}
            h={`calc(100vh - ${layoutCompHeight}px - ${isMobile ? layoutCompHeight : 2}px)`}>
            <Group
              h={layoutCompHeight}
              mx={isMobile ? 0 : "xs"}
              px="sm"
              bg={oneBg}
              justify="space-between"
              gap={0}
              className={`${isMobile ? noBorderStyle : `${borderLCStyle} ${roundBorderStyle}`}`}>
              <Group gap={3}>
                <I I={IconFileDescription} />

                <Text pt={3}>
                  {globalUtility.formatNumber(data.page)}/
                  {globalUtility.formatNumber(data.totalPages)} Page
                </Text>
              </Group>

              <Group gap={4} onClick={handleNavigateToPackageOrUser}>
                {isSearchingReviews ? (
                  <Text
                    fw={textBold}
                    c={themeGreenColor}
                    style={stringTruncate}>
                    {search}
                  </Text>
                ) : (
                  <Text
                    fw={textBold}
                    c={themeGreenColor}
                    td="underline"
                    style={stringTruncate}>
                    {pkg?.name} {user?.username && `@${user.username}`}
                  </Text>
                )}

                <Text fw={textBold}>
                  reviews{" "}
                  {data.totalElements > 0 &&
                    `(${globalUtility.formatNumber(data.totalElements)})`}
                </Text>
              </Group>

              <Group>
                <ActionIcon
                  ml={marginLeft}
                  hiddenFrom={responsiveBreakpoint}
                  c={oneTx}
                  className={oneTxOneBgButtonPseudoStyle}
                  onClick={openFilter}>
                  <I I={IconFilter} />
                </ActionIcon>

                <ActionIcon
                  disabled
                  ml={marginLeft}
                  visibleFrom={responsiveBreakpoint}
                />

                {user?.id === auth.id && data.totalElements > 0 && (
                  <ActionIcon onClick={openDeleteReviews}>
                    <I I={IconTrash} color="crimson" />
                  </ActionIcon>
                )}
              </Group>

              <ReviewsFilterModal opened={filterOpened} close={closeFilter} />
            </Group>

            <Outlet context={setData} />
          </Stack>
        </Group>
      </Container>
    </>
  );
};
