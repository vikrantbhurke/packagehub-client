import { Center, Loader, Text } from "@mantine/core";
import { useSearchPackagesByPlatform } from "../hooks/read";
import { PackageComboboxOne } from "../layouts";
import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";

export const SearchPackagesByPlatformComboboxOne = () => {
  const { isPending, isError, packages } = useSearchPackagesByPlatform();
  const setData = useOutletContext<any>();

  useEffect(() => {
    if (setData)
      setData((data: any) => ({
        ...data,
        page: packages?.page + 1 || 0,
        totalPages: packages?.totalPages || 0,
        totalElements: packages?.totalElements || 0,
      }));
  }, [packages, setData]);

  const emptyPackages = {
    registry: null,
    repo: [],
  };

  if (isPending)
    return (
      <PackageComboboxOne
        packages={emptyPackages}
        placeholderComp={
          <Center>
            <Loader color="white" type="dots" />
          </Center>
        }
      />
    );

  if (isError)
    return (
      <PackageComboboxOne
        packages={emptyPackages}
        placeholderComp={
          <Text size="sm">An error occurred. Please try again.</Text>
        }
      />
    );

  if (!packages.registry && packages.repo.length !== 0)
    return (
      <PackageComboboxOne
        packages={emptyPackages}
        placeholderComp={<Text size="sm">No package found.</Text>}
      />
    );

  return <PackageComboboxOne packages={packages} placeholderComp={<></>} />;
};
