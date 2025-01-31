import { RootState } from "@/global/states/store";
import {
  ActionIcon,
  Container,
  Group,
  Image,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import {
  IconBulb,
  IconDownload,
  IconLogin,
  IconLogout,
  IconSearch,
} from "@tabler/icons-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MenuLayout, SearchLayout } from "./index";
import { useDispatch } from "react-redux";
import { setIsSearchbarVisible } from "@/global/states/view.slice";
import { useWindowScroll } from "@mantine/hooks";
import { themeGreenColor, themeTxStyle } from "@/global/styles/app.css";
import { signOut } from "@/user/auth.slice";
import {
  layoutCompHeight,
  mainContentWidth,
  responsiveBreakpoint,
  textBold,
  textBolder,
} from "@/global/styles/global.styles";
import { I } from "../reusables";
import logo from "@/global/assets/pwa-64x64.png";
import { useInstallApp } from "@/global/hooks";
import { setPage } from "@/package/package.slice";
import { SearchPackagesByPlatformComboboxTwo } from "@/package/lists";

export const HeaderLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [, scrollTo] = useWindowScroll();
  const { installPrompt, isInstalled, handleInstallClick } = useInstallApp();
  const { auth } = useSelector((state: RootState) => state.auth);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const { isMobile, isSearchbarVisible } = useSelector(
    (state: any) => state.view
  );

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

  const handleOpenSearchbar = () => dispatch(setIsSearchbarVisible(true));

  const handleTheme = () => toggleColorScheme();

  const handleNavigateToSignIn = () => {
    navigate("/sign-in");
  };

  const handleSignOut = () => {
    dispatch(signOut());
    navigate("/");
  };

  let searchbar;

  if (location.pathname.includes("/reviews")) {
    searchbar = <SearchLayout />;
  } else {
    searchbar = <SearchPackagesByPlatformComboboxTwo />;
  }

  return (
    <>
      {isSearchbarVisible ? (
        <>{searchbar}</>
      ) : (
        <Container size={mainContentWidth}>
          <Group h={layoutCompHeight} justify="space-between" align="center">
            <Group gap={4} onClick={handleNavigateToHome} align="center">
              <Image src={logo} alt="logo" w={32} />

              <Text fw={textBolder} fz="lg" className={themeTxStyle}>
                {import.meta.env.VITE_APP_NAME}
              </Text>
            </Group>

            <Group gap={isMobile ? 6 : "xs"}>
              {!isInstalled && installPrompt && (
                <Group
                  gap={4}
                  c={themeGreenColor}
                  onClick={handleInstallClick}
                  visibleFrom={responsiveBreakpoint}>
                  <I I={IconDownload} />
                  <Text c={themeGreenColor} fw={textBold}>
                    Install App
                  </Text>
                </Group>
              )}

              <Group
                onClick={handleNavigateToHome}
                visibleFrom={responsiveBreakpoint}>
                <Text fw={textBold} className={themeTxStyle}>
                  Home
                </Text>
              </Group>

              <Group
                onClick={handleNavigateToPlatformPackages}
                visibleFrom={responsiveBreakpoint}>
                <Text fw={textBold} className={themeTxStyle}>
                  Packages
                </Text>
              </Group>

              <ActionIcon size="sm" onClick={handleOpenSearchbar}>
                <I I={IconSearch} />
              </ActionIcon>

              <ActionIcon size="sm" onClick={handleTheme}>
                {colorScheme === "dark" ? (
                  <I I={IconBulb} color="orange" />
                ) : (
                  <I I={IconBulb} color="dodgerblue" />
                )}
              </ActionIcon>

              {auth.id ? (
                <ActionIcon size="sm" onClick={handleSignOut}>
                  <I I={IconLogout} />
                </ActionIcon>
              ) : (
                <ActionIcon size="sm" onClick={handleNavigateToSignIn}>
                  <I I={IconLogin} />
                </ActionIcon>
              )}

              <MenuLayout />
            </Group>
          </Group>
        </Container>
      )}
    </>
  );
};
