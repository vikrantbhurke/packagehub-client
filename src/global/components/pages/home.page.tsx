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
  headerHeight,
  mainContentWidth,
  responsiveBreakpoint,
} from "@/global/styles/global.styles";
import { CustomEnumCombobox, SeoComponent } from "../components";
import { Platform } from "@/package/enums";
import { globalUtility } from "@/global/utilities";
import { packageUtility } from "@/package/package.utility";
import { border, oneBg, roundBorder, twoBg } from "@/global/styles/app.css";
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

  return (
    <>
      <SeoComponent
        title="PackageHub | Home Page"
        description="Learn more about Qool Quotes."
      />

      <Container
        bg={isMobile ? oneBg : twoBg}
        size={mainContentWidth}
        style={{ height: `calc(100vh - ${headerHeight}px)` }}>
        <Flex justify="center" h="100%" direction="column" align="center">
          <Stack gap="xl" ta="center">
            <Title order={2}>Read, Rate And Review Software Packages.</Title>
            <Space h="xl" visibleFrom={responsiveBreakpoint} />

            <Stack maw={600} miw={400}>
              <SearchPackagesByPlatformComboboxOne />
            </Stack>

            <Stack gap="xl" align="center">
              <Space h="xl" visibleFrom={responsiveBreakpoint} />

              <Stack gap={0}>
                <Text size="sm">Pick a package registry</Text>
                <Text c="dimmed" size="sm">
                  Your search will show packages from selected registry
                </Text>
              </Stack>

              <Stack
                align="center"
                gap="md"
                bg={oneBg}
                p="md"
                className={`${roundBorder} ${border}`}>
                <Image src={packageUtility.getPlatformImage(platform)} w={50} />
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
      </Container>
    </>
  );
};
