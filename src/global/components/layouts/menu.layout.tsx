import { RootState } from "@/global/states/store";
import {
  borderShadowStyle,
  noBorderStyle,
  oneTxGreenBgMenuButtonPseudoStyle,
  themeGreenColor,
} from "@/global/styles/app.css";
import {
  Avatar,
  Burger,
  Menu,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure, useWindowScroll } from "@mantine/hooks";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getDropdownStyles,
  responsiveBreakpoint,
} from "@/global/styles/global.styles";
import { useInstallApp } from "@/global/hooks";
import {
  IconArticle,
  IconBox,
  IconDownload,
  IconInfoCircle,
  IconMessage,
  IconStar,
  IconUser,
} from "@tabler/icons-react";
import { ContactModal, I } from "../components";
import { setPage as setPackagePage } from "@/package/package.slice";
import { setPage as setReviewPage } from "@/review/review.slice";
import { CompOrFragmentRoute } from "@/global/routes";
import { Clearance } from "@/user/enums";
import { useCountUserReviews } from "@/user/hooks/read";

export const MenuLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [, scrollTo] = useWindowScroll();
  const { installPrompt, isInstalled, handleInstallClick } = useInstallApp();
  const { auth } = useSelector((state: RootState) => state.auth);
  const [opened, { open, close }] = useDisclosure();
  const { userReviews } = useCountUserReviews(auth.id);
  const { colorScheme } = useMantineColorScheme();
  const { dropdownBg } = getDropdownStyles(colorScheme);

  const {
    platform,
    sort: packageSort,
    order: packageOrder,
    rating: packageRating,
  } = useSelector((state: RootState) => state.package);

  const {
    sort: reviewSort,
    order: reviewOrder,
    rating: reviewRating,
  } = useSelector((state: RootState) => state.review);

  const handleNavigateToHome = () => {
    scrollTo({ y: 0 });
    navigate("/");
  };

  const handleNavigateToPlatformPackages = () => {
    scrollTo({ y: 0 });
    dispatch(setPackagePage(1));
    navigate(
      `/packages/platform/${platform}?page=1&sort=${packageSort}&order=${packageOrder}&rating=${packageRating}`
    );
  };

  const handleNavigateToUserReviews = () => {
    scrollTo({ y: 0 });
    dispatch(setReviewPage(1));
    navigate(
      `/reviews/reviewerId/${auth.id}?page=1&sort=${reviewSort}&order=${reviewOrder}&rating=${reviewRating}`
    );
  };

  const handleNavigateToUser = () => {
    navigate(`/users/${auth.id}`);
  };

  const handleNavigateToAbout = () => {
    navigate("/about");
  };

  const handleContact = () => {
    open();
  };

  return (
    <>
      <ContactModal opened={opened} close={close} />

      <Menu shadow="md" width={200}>
        {auth.id ? (
          <Menu.Target>
            {auth.profilepic ? (
              <Avatar src={auth.profilepic} />
            ) : (
              <Avatar>
                {auth.firstname[0]}
                {auth.lastname[0]}
              </Avatar>
            )}
          </Menu.Target>
        ) : (
          <Menu.Target>
            <Burger size="sm" />
          </Menu.Target>
        )}

        <Menu.Dropdown
          bg={dropdownBg}
          className={`${noBorderStyle} ${borderShadowStyle}`}>
          {!isInstalled && installPrompt && (
            <Menu.Item
              onClick={handleInstallClick}
              p="xs"
              c={themeGreenColor}
              className={oneTxGreenBgMenuButtonPseudoStyle}
              leftSection={<I I={IconDownload} />}
              hiddenFrom={responsiveBreakpoint}>
              <Text size="sm" c={themeGreenColor}>
                Install App
              </Text>
            </Menu.Item>
          )}

          <Menu.Item
            onClick={handleNavigateToHome}
            p="xs"
            className={oneTxGreenBgMenuButtonPseudoStyle}
            leftSection={<I I={IconStar} />}
            hiddenFrom={responsiveBreakpoint}>
            <Text size="sm">Home</Text>
          </Menu.Item>

          <Menu.Item
            onClick={handleNavigateToPlatformPackages}
            p="xs"
            className={oneTxGreenBgMenuButtonPseudoStyle}
            leftSection={<I I={IconBox} />}
            hiddenFrom={responsiveBreakpoint}>
            <Text size="sm">Packages</Text>
          </Menu.Item>

          {userReviews?.count > 0 && (
            <CompOrFragmentRoute clearance={Clearance.LevelTwo}>
              <Menu.Item
                onClick={handleNavigateToUserReviews}
                p="xs"
                className={oneTxGreenBgMenuButtonPseudoStyle}
                leftSection={<I I={IconArticle} />}>
                <Text size="sm">My Reviews</Text>
              </Menu.Item>
            </CompOrFragmentRoute>
          )}

          <CompOrFragmentRoute clearance={Clearance.LevelTwo}>
            <Menu.Item
              onClick={handleNavigateToUser}
              p="xs"
              className={oneTxGreenBgMenuButtonPseudoStyle}
              leftSection={<I I={IconUser} />}>
              <Text size="sm">Profile</Text>
            </Menu.Item>
          </CompOrFragmentRoute>

          <Menu.Item
            onClick={handleNavigateToAbout}
            p="xs"
            className={oneTxGreenBgMenuButtonPseudoStyle}
            leftSection={<I I={IconInfoCircle} />}>
            <Text size="sm">About</Text>
          </Menu.Item>

          <Menu.Item
            onClick={handleContact}
            p="xs"
            className={oneTxGreenBgMenuButtonPseudoStyle}
            leftSection={<I I={IconMessage} />}>
            <Text size="sm">Contact</Text>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
};
