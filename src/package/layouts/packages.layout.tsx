import {
  layoutCompHeight,
  mainContentWidth,
  marginLeft,
  responsiveBreakpoint,
  stringTruncate,
  textBold,
} from "@/global/styles/global.styles";
import { ActionIcon, Container, Group, Stack, Text } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { IconFileDescription, IconFilter } from "@tabler/icons-react";
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
import { PackagesFilterBox } from "./packages-filter.box";
import { useDisclosure } from "@mantine/hooks";
import { PackagesFilterModal } from "./packages-filter.modal";
import { RootState } from "@/global/states/store";

export const PackagesLayout = () => {
  const { isMobile, search } = useSelector((state: RootState) => state.view);
  const { platform } = useSelector((state: RootState) => state.package);

  const [modalOpened, { open: modalOpen, close: modalClose }] =
    useDisclosure(false);

  const [data, setData] = useState<any>({
    page: 0,
    totalPages: 0,
    totalElements: 0,
  });

  const isSearchingPackages = location.pathname.includes("search");

  return (
    <Container size={mainContentWidth} p={0}>
      <Group align="start" gap="sm">
        <PackagesFilterBox />

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

            <Group gap={4}>
              <Text fw={textBold} c={themeGreenColor} style={stringTruncate}>
                {isSearchingPackages ? search : platform}
              </Text>

              <Text fw={textBold}>
                packages{" "}
                {data.totalElements > 0 &&
                  `(${globalUtility.formatNumber(data.totalElements)})`}
              </Text>
            </Group>

            <ActionIcon
              ml={marginLeft}
              hiddenFrom={responsiveBreakpoint}
              c={oneTx}
              className={oneTxOneBgButtonPseudoStyle}
              onClick={modalOpen}>
              <I I={IconFilter} />
            </ActionIcon>

            <ActionIcon
              disabled
              ml={marginLeft}
              visibleFrom={responsiveBreakpoint}
            />

            <PackagesFilterModal opened={modalOpened} close={modalClose} />
          </Group>

          <Outlet context={setData} />
        </Stack>
      </Group>
    </Container>
  );
};
