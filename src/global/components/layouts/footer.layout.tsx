import {
  roundBorderStyle,
  themeLightGreenOneBg,
} from "@/global/styles/app.css";
import { layoutCompHeight } from "@/global/styles/global.styles";
import { Group, Stack, Text } from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import {
  IconBox,
  IconLogin,
  IconSearch,
  IconStar,
  IconStarFilled,
  IconUser,
  IconUserFilled,
} from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setIsSearchbarVisible } from "@/global/states/view.slice";
import { I } from "../reusables";
import { setPage } from "@/package/package.slice";
import { RootState } from "@/global/states/store";
import { useSelector } from "react-redux";
import { CompOneOrTwoRoute } from "@/global/routes";
import { Clearance } from "@/user/enums";

export const FooterLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [, scrollTo] = useWindowScroll();
  const location = useLocation();

  const { auth } = useSelector((state: RootState) => state.auth);
  const { isSearchbarVisible } = useSelector((state: any) => state.view);

  const {
    platform,
    sort: packageSort,
    order: packageOrder,
    rating: packageRating,
  } = useSelector((state: RootState) => state.package);

  const handleNavigateToHome = () => {
    scrollTo({ y: 0 });
    navigate("/");
  };

  const handleNavigateToPlatformPackages = () => {
    scrollTo({ y: 0 });
    dispatch(setPage(1));
    navigate(
      `/packages/platform/${platform}?page=1&sort=${packageSort}&order=${packageOrder}&rating=${packageRating}`
    );
  };

  const handleNavigateToUser = () => {
    navigate(`/users/${auth.id}`);
  };

  const handleNavigateToSignIn = () => {
    navigate("/sign-in");
  };

  const handleReadOnlyClick = () => dispatch(setIsSearchbarVisible(true));

  const homeIconColor =
    location.pathname === "/" ? themeLightGreenOneBg : "transparent";

  const homePath = location.pathname === "/" ? IconStarFilled : IconStar;

  const packagesIconColor = location.pathname.includes("/packages/platform")
    ? themeLightGreenOneBg
    : "transparent";

  const profileIconColor = location.pathname.includes(`/users/${auth.id}`)
    ? themeLightGreenOneBg
    : "transparent";

  const profilePath = location.pathname.includes(`/users/${auth.id}`)
    ? IconUserFilled
    : IconUser;

  const signInIconColor = location.pathname.includes(`/sign-in`)
    ? themeLightGreenOneBg
    : "transparent";

  const searchIconColor = isSearchbarVisible
    ? themeLightGreenOneBg
    : "transparent";

  return (
    <Group justify="space-evenly" grow gap={0} h={layoutCompHeight}>
      <Stack
        justify="center"
        align="center"
        gap={0}
        h={layoutCompHeight}
        onClick={handleNavigateToHome}>
        <Stack bg={homeIconColor} px="xs" py={4} className={roundBorderStyle}>
          <I I={homePath} />
        </Stack>
        <Text>Home</Text>
      </Stack>

      <Stack
        justify="center"
        align="center"
        gap={0}
        h={layoutCompHeight}
        onClick={handleNavigateToPlatformPackages}>
        <Stack
          bg={packagesIconColor}
          px="xs"
          py={4}
          className={roundBorderStyle}>
          <I I={IconBox} />
        </Stack>
        <Text>Packages</Text>
      </Stack>

      <Stack
        justify="center"
        align="center"
        gap={0}
        h={layoutCompHeight}
        onClick={handleReadOnlyClick}>
        <Stack bg={searchIconColor} px="xs" py={4} className={roundBorderStyle}>
          <I I={IconSearch} />
        </Stack>
        <Text>Search</Text>
      </Stack>

      <CompOneOrTwoRoute
        clearance={Clearance.LevelTwo}
        childOne={
          <Stack
            justify="center"
            align="center"
            gap={0}
            h={layoutCompHeight}
            onClick={handleNavigateToUser}>
            <Stack
              bg={profileIconColor}
              px="xs"
              py={4}
              className={roundBorderStyle}>
              <I I={profilePath} />
            </Stack>
            <Text>Profile</Text>
          </Stack>
        }
        childTwo={
          <Stack
            justify="center"
            align="center"
            gap={0}
            h={layoutCompHeight}
            onClick={handleNavigateToSignIn}>
            <Stack
              bg={signInIconColor}
              px="xs"
              py={4}
              className={roundBorderStyle}>
              <I I={IconLogin} />
            </Stack>
            <Text>Sign In</Text>
          </Stack>
        }
      />
    </Group>
  );
};
