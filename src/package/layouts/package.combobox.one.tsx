import {
  ActionIcon,
  Button,
  Combobox,
  darken,
  Group,
  Stack,
  Text,
  TextInput,
  Tooltip,
  useCombobox,
} from "@mantine/core";
import { useDispatch } from "react-redux";
import { setSearch } from "@/global/states/view.slice";
import { useSelector } from "react-redux";
import { IconInfoCircle, IconStarFilled, IconX } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useWindowScroll } from "@mantine/hooks";
import { RootState } from "@/global/states/store";
import { setIsSearchbarVisible } from "@/global/states/view.slice";
import { globalUtility } from "@/global/utilities";
import {
  borderHC,
  circularBorder,
  inputStyles,
  noBorder,
  oneBg,
  oneTx,
  roundBorder,
  themeGreenColor,
  threeBg,
} from "@/global/styles/app.css";
import { packageUtility } from "../package.utility";
import { setPage as setPackagePage } from "../package.slice";
import { responsiveBreakpoint } from "@/global/styles/global.styles";
import { I } from "@/global/components/components";

export const PackageComboboxOne = ({ packages, placeholderComp }: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [, scrollTo] = useWindowScroll();

  const { isMobile, search } = useSelector((state: RootState) => state.view);
  const { auth } = useSelector((state: RootState) => state.auth);

  const {
    platform,
    sort: packageSort,
    order: packageOrder,
  } = useSelector((state: any) => state.package);

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const handleNavigateToPlatformPackages = () => {
    scrollTo({ y: 0 });
    dispatch(setPackagePage(1));
    navigate(
      `packages/platform/${platform}/search?page=1&sort=${packageSort}&order=${packageOrder}`
    );
  };

  const handleNavigateToPackage = (item: any) => {
    scrollTo({ y: 0 });
    navigate(`packages/${item.id}`);
  };

  const handleNativateToCreateFirstReview = (registry: any) => {
    if (!auth.id) {
      navigate("/sign-in");
      return;
    }

    navigate(`/reviews/first`, {
      state: registry,
    });
  };

  const emptyComp = <Combobox.Empty>{placeholderComp}</Combobox.Empty>;

  const seeAllComp = (
    <Combobox.Empty>
      <Button
        c={oneTx}
        bg="blue"
        fullWidth
        onClick={handleNavigateToPlatformPackages}>
        See all packages
      </Button>
    </Combobox.Empty>
  );

  let registryPackage;
  let repoPackages;
  let seeAllButton;

  const registryComp = (registry: any) => (
    <Combobox.Option value={registry.name}>
      <Group justify="space-between">
        <Text>{registry.name}</Text>

        <Group>
          <Button
            c={oneTx}
            bg={themeGreenColor}
            onClick={() => handleNativateToCreateFirstReview(registry)}>
            Write 1st review
          </Button>
        </Group>
      </Group>
    </Combobox.Option>
  );

  const repoComp = (item: any) => (
    <Combobox.Option value={item.name} key={item.id}>
      <Group
        justify="space-between"
        onClick={() => handleNavigateToPackage(item)}>
        <Stack gap={0}>
          <Text>{item.name}</Text>
          <Text size="sm" c="dimmed">
            reviews {globalUtility.formatNumber(item.reviews)}
          </Text>
        </Stack>

        <Group
          gap={6}
          py={4}
          px="xs"
          className={`${roundBorder}`}
          bg={packageUtility.getRatingColor(item.rating)}
          align="center">
          <ActionIcon
            size="xs"
            c="white"
            bg={darken(packageUtility.getRatingColor(item.rating), 0.2)}>
            <IconStarFilled />
          </ActionIcon>
          <Text>{globalUtility.formatFloat(item.rating)}</Text>
        </Group>
      </Group>
    </Combobox.Option>
  );

  if (!packages.registry && packages.repo.length === 0) {
    registryPackage = emptyComp;
    repoPackages = emptyComp;
  }

  if (packages.registry && packages.repo.length === 0) {
    registryPackage = registryComp(packages.registry);
    repoPackages = null;
  }

  if (!packages.registry && packages.repo.length > 0) {
    repoPackages = null;
    repoPackages = packages.repo
      .filter((_: any, index: number) => index < 3)
      .map(repoComp);

    if (packages.repo.length > 3) seeAllButton = seeAllComp;
  }

  if (packages.registry && packages.repo.length > 0) {
    registryPackage = registryComp(packages.registry);
    repoPackages = packages.repo
      .filter((_: any, index: number) => index < 3)
      .map(repoComp);

    if (packages.repo.length > 3) seeAllButton = seeAllComp;

    if (packages.repo.find((item: any) => item.name === packages.registry.name))
      registryPackage = null;
  }

  const handleReadOnlyClick = () =>
    isMobile && dispatch(setIsSearchbarVisible(true));

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!event.target.value) {
      handleClearSearch(event);
    } else {
      dispatch(setSearch(event.target.value));
      combobox.openDropdown();
    }
  };

  const handleOptionSubmit = (value: any) => {
    dispatch(setSearch(value));
    combobox.closeDropdown();
  };

  const handleClick = () => search && combobox.openDropdown();
  const handleFocus = () => search && combobox.openDropdown();
  const handleBlur = () => combobox.closeDropdown();

  const handleClearSearch = (event: any) => {
    event.preventDefault();
    dispatch(setSearch(""));
    handleBlur();
  };

  const tooltipMessage = (
    <div style={{ whiteSpace: "normal", wordBreak: "break-word" }}>
      Use the exact URL endpoint format of the package in its registry link. For
      example - {packageUtility.getTooltipMessage(platform)}
    </div>
  );

  const comboboxLabel = (
    <Group justify="center" align="center" gap={4}>
      <Tooltip
        c={oneTx}
        p="md"
        bg={threeBg}
        events={{ hover: true, focus: true, touch: true }}
        multiline
        maw={400}
        position="top-start"
        label={tooltipMessage}>
        <IconInfoCircle color="darkGray" size={16} className={`${noBorder}`} />
      </Tooltip>
      <Text fz="xs" c="dimmed">
        Type package name in proper format in smallcase
      </Text>
    </Group>
  );

  return (
    <>
      <TextInput
        label={comboboxLabel}
        classNames={{
          input: `${inputStyles} ${borderHC} ${circularBorder}`,
        }}
        styles={{ input: { height: 50 } }}
        readOnly
        hiddenFrom={responsiveBreakpoint}
        placeholder={`Search packages ex - ${packageUtility.getPlaceholder(platform)}`}
        onClick={handleReadOnlyClick}
      />

      <Combobox store={combobox} onOptionSubmit={handleOptionSubmit}>
        <Combobox.Target>
          <TextInput
            label={comboboxLabel}
            classNames={{
              input: `${inputStyles} ${borderHC} ${circularBorder}`,
            }}
            styles={{
              input: { height: 50 },
            }}
            placeholder={`Search packages ex - ${packageUtility.getPlaceholder(platform)}`}
            visibleFrom={responsiveBreakpoint}
            value={search}
            onChange={handleChange}
            onClick={handleClick}
            onFocus={handleFocus}
            onBlur={handleBlur}
            rightSection={
              <>
                {search && (
                  <ActionIcon size="xs" onMouseDown={handleClearSearch}>
                    <I I={IconX} />
                  </ActionIcon>
                )}
              </>
            }
          />
        </Combobox.Target>

        <Combobox.Dropdown bg={oneBg}>
          <Combobox.Options>
            {registryPackage && (
              <Combobox.Group label="Package Registry">
                {registryPackage}
              </Combobox.Group>
            )}

            {repoPackages && (
              <Combobox.Group
                label={`${import.meta.env.VITE_APP_NAME} Database`}>
                {repoPackages}
                {seeAllButton}
              </Combobox.Group>
            )}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </>
  );
};
