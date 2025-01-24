import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearch } from "@/global/states/view.slice";
import { setIsSearchbarVisible } from "@/global/states/view.slice";
import {
  ActionIcon,
  Button,
  Center,
  Combobox,
  darken,
  Group,
  Stack,
  Text,
  TextInput,
  useCombobox,
} from "@mantine/core";
import { IconStarFilled, IconX } from "@tabler/icons-react";
import { globalUtility } from "@/global/utilities";
import {
  borderLC,
  circularBorder,
  inputStyles,
  oneBg,
  oneTx,
  roundBorder,
  themeGreenColor,
} from "@/global/styles/app.css";
import { packageUtility } from "../package.utility";
import { useWindowScroll } from "@mantine/hooks";
import { setPage as setPackagePage } from "../package.slice";
import { RootState } from "@/global/states/store";
import { getSearchTextInput } from "@/global/styles/global.styles";
import { useEffect, useRef } from "react";
import { I } from "@/global/components/components";

export const PackageComboboxTwo = ({ packages, placeholderComp }: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef<any>(null);
  const [, scrollTo] = useWindowScroll();

  const { auth } = useSelector((state: any) => state.auth);

  const {
    platform,
    sort: packageSort,
    order: packageOrder,
  } = useSelector((state: any) => state.package);

  const { isMobile, search, width } = useSelector(
    (state: RootState) => state.view
  );

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

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

  const handleOptionSubmit = (value: any) => {
    dispatch(setSearch(value));
    combobox.closeDropdown();
  };

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

  const handleClick = () => search && combobox.openDropdown();

  const handleBlur = () => {
    combobox.closeDropdown();
    dispatch(setIsSearchbarVisible(false));
  };

  const handleClearSearch = (event: any) => {
    event.preventDefault();
    dispatch(setSearch(""));
    handleBlur();
  };

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={handleOptionSubmit}
      styles={{
        dropdown: { maxWidth: isMobile ? "95%" : 500 },
      }}>
      <Combobox.Target>
        <Center w="100vw">
          <TextInput
            autoCapitalize="off"
            autoCorrect="off"
            autoComplete="off"
            ref={inputRef}
            classNames={{
              input: `${inputStyles} ${borderLC} ${circularBorder}`,
            }}
            styles={
              isMobile
                ? getSearchTextInput(isMobile, width)
                : {
                    input: {
                      height: 50,
                      minWidth: 500,
                      margin: 4,
                    },
                  }
            }
            placeholder={`Search packages ex - ${packageUtility.getPlaceholder(platform)}`}
            value={search}
            onChange={handleChange}
            onClick={handleClick}
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
        </Center>
      </Combobox.Target>

      <Combobox.Dropdown bg={oneBg}>
        <Combobox.Options>
          {registryPackage && (
            <Combobox.Group label="Package Registry">
              {registryPackage}
            </Combobox.Group>
          )}

          {repoPackages && (
            <Combobox.Group label={`${import.meta.env.VITE_APP_NAME} Database`}>
              {repoPackages}
              {seeAllButton}
            </Combobox.Group>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};
