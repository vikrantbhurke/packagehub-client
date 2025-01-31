import {
  Flex,
  Space,
  Stack,
  Title,
  Container,
  Text,
  Image,
} from "@mantine/core";
import { useSelector } from "react-redux";
import { setPlatform } from "@/package/package.slice";
import { RootState } from "@/global/states/store";
import { useDispatch } from "react-redux";
import { useWindowScroll } from "@mantine/hooks";
import {
  layoutCompHeight,
  mainContentWidth,
  responsiveBreakpoint,
} from "@/global/styles/global.styles";
import { CustomEnumCombobox, SeoComponent } from "../reusables";
import { Platform } from "@/package/enums";
import { globalUtility } from "@/global/utilities";
import { packageUtility } from "@/package/package.utility";
import {
  borderLCStyle,
  noBorderStyle,
  oneBg,
  roundBorderStyle,
  twoBg,
} from "@/global/styles/app.css";
import { SearchPackagesByPlatformComboboxOne } from "@/package/lists";

export const HomePage = () => {
  const dispatch = useDispatch();
  const [, scrollTo] = useWindowScroll();
  const { isMobile } = useSelector((state: RootState) => state.view);
  const { platform } = useSelector((state: RootState) => state.package);

  const handlePlatform = (value: any) => {
    dispatch(setPlatform(value));
    scrollTo({ y: 0 });
  };

  const homepage = (
    <Flex justify="center" h="100%" direction="column" align="center">
      <Stack gap="xl" ta="center">
        <Title order={2}>Read, Rate And Review Software Packages.</Title>
        <Space h="xl" visibleFrom={responsiveBreakpoint} />

        <Stack>
          <SearchPackagesByPlatformComboboxOne />
        </Stack>

        <Stack gap="xl" align="center">
          <Space h="xl" visibleFrom={responsiveBreakpoint} />

          <Stack gap={0}>
            <Text>Pick a package registry</Text>
            <Text c="dimmed" fz="xs">
              Your search will show packages from selected registry
            </Text>
          </Stack>

          <Stack
            align="center"
            gap="md"
            bg={oneBg}
            p="md"
            className={
              isMobile ? noBorderStyle : `${roundBorderStyle} ${borderLCStyle}`
            }>
            <Image src={packageUtility.getPlatformImageUrl(platform)} w={50} />
            <CustomEnumCombobox
              id="package-platform"
              EnumObject={Platform}
              label="Platform"
              data={Object.values(Platform)}
              handleValue={handlePlatform}
              value={globalUtility.getKeyByValue(Platform, platform)}
            />
          </Stack>
        </Stack>
      </Stack>
    </Flex>
  );

  return (
    <>
      <SeoComponent
        title="PackageHub | Home Page"
        description="Learn more about Qool Quotes."
      />

      <Container
        hiddenFrom={responsiveBreakpoint}
        bg={oneBg}
        size={mainContentWidth}
        style={{ height: `calc(100vh - ${layoutCompHeight}px)` }}>
        {homepage}
      </Container>

      <Container
        visibleFrom={responsiveBreakpoint}
        bg={twoBg}
        size={mainContentWidth}
        style={{ height: `calc(100vh - ${layoutCompHeight}px)` }}>
        {homepage}
      </Container>
    </>
  );
};
