import {
  footerHeight,
  headerHeight,
  mainContentWidth,
  responsiveBreakpoint,
  subheaderHeight,
} from "@/global/styles/global.styles";
import { ActionIcon, Container, Group, Stack, Text } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { IconFileDescription, IconFilter } from "@tabler/icons-react";
import {
  borderLC,
  oneBg,
  oneTx,
  oneTxOneBgButtonPseudo,
  roundBorder,
  themeGreenColor,
  noBorder,
} from "@/global/styles/app.css";
import { useState } from "react";
import { globalUtility } from "@/global/utilities";
import { I } from "@/global/components/components";
import { useSelector } from "react-redux";
import { Breakpoint } from "@/global/enums";
import { PackagesFilterBox } from "./packages-filter.box";
import { useDisclosure } from "@mantine/hooks";
import { PackagesFilterModal } from "./packages-filter.modal";

export const PackagesLayout = () => {
  const { isMobile, width, search } = useSelector((state: any) => state.view);
  const { platform } = useSelector((state: any) => state.package);

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
          w={width < Breakpoint.md ? "100%" : "69%"}
          gap={0}
          h={`calc(100vh - ${headerHeight}px - ${isMobile ? footerHeight : 2}px)`}>
          <Group
            h={subheaderHeight}
            mx={isMobile ? 0 : "xs"}
            px="sm"
            bg={oneBg}
            justify="space-between"
            gap={0}
            className={`${isMobile ? noBorder : `${borderLC} ${roundBorder}`}`}>
            <Group gap={3}>
              <I I={IconFileDescription} />

              <Text pt={3}>
                {globalUtility.formatNumber(data.page)}/
                {globalUtility.formatNumber(data.totalPages)} Page
              </Text>
            </Group>

            <Group gap={4}>
              <Text fw={500} c={themeGreenColor}>
                {isSearchingPackages ? search : platform}
              </Text>

              <Text fw={500}>
                packages{" "}
                {data.totalElements > 0 &&
                  `(${globalUtility.formatNumber(data.totalElements)})`}
              </Text>
            </Group>

            <ActionIcon
              hiddenFrom={responsiveBreakpoint}
              c={oneTx}
              className={oneTxOneBgButtonPseudo}
              onClick={modalOpen}>
              <I I={IconFilter} />
            </ActionIcon>

            <ActionIcon disabled visibleFrom={responsiveBreakpoint} />

            <PackagesFilterModal opened={modalOpened} close={modalClose} />
          </Group>

          <Outlet context={setData} />
        </Stack>
      </Group>
    </Container>
  );
};
