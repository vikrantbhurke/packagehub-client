import { useOutletContext } from "react-router-dom";
import { useSearchPackagesByPlatform } from "../hooks/read";
import { PackageComboboxTwo } from "../layouts";
import { Text } from "@mantine/core";
import { useEffect } from "react";
import { PackageComboboxSkeleton } from "../skeletons";

export const SearchPackagesByPlatformComboboxTwo = () => {
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
      <PackageComboboxTwo
        packages={emptyPackages}
        placeholderComp={<PackageComboboxSkeleton />}
      />
    );

  if (isError)
    return (
      <PackageComboboxTwo
        packages={emptyPackages}
        placeholderComp={
          <Text size="sm">An error occurred. Please try again.</Text>
        }
      />
    );

  if (!packages.registry && packages.repo.length !== 0)
    return (
      <PackageComboboxTwo
        packages={emptyPackages}
        placeholderComp={<Text size="sm">No package found.</Text>}
      />
    );

  return <PackageComboboxTwo packages={packages} placeholderComp={<></>} />;
};
