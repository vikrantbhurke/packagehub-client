import { PackageListItemLayout } from "../layouts";
import { CustomList } from "@/global/components/lists";
import { useSearchPackagesByPlatform } from "../hooks/read";
import { CustomError } from "@/global/components/errors";
import { useSelector } from "react-redux";
import { oneBg, twoBg } from "@/global/styles/app.css";
import { setPage } from "../package.slice";
import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import { PaginationPlaceholder } from "@/global/components/placeholders";
import { RootState } from "@/global/states/store";
import { PackageListItemSkeleton } from "../skeletons";

export const SearchPackagesByPlatformCustomList = () => {
  const { isPending, isError, packages } = useSearchPackagesByPlatform();
  const { isMobile } = useSelector((state: RootState) => state.view);
  const { page } = useSelector((state: RootState) => state.package);

  const setData = useOutletContext<any>();

  useEffect(() => {
    setData((data: any) => ({
      ...data,
      page: packages?.page + 1 || 0,
      totalPages: packages?.totalPages || 0,
      totalElements: packages?.totalElements || 0,
    }));
  }, [packages, setData]);

  if (isPending)
    return (
      <CustomList
        page={page}
        listBg={isMobile ? oneBg : twoBg}
        setPage={setPage}
        dataArray={Array(3).fill({})}
        totalPages={1}
        ListItemLayout={PackageListItemSkeleton}
      />
    );

  if (isError)
    return (
      <>
        <CustomError message="Error" />
        <PaginationPlaceholder />
      </>
    );

  if (!packages.repo.length)
    return (
      <>
        <CustomError message="Error" />
        <PaginationPlaceholder />
      </>
    );

  return (
    <CustomList
      page={page}
      listBg={isMobile ? oneBg : twoBg}
      setPage={setPage}
      dataArray={packages.repo}
      totalPages={packages.totalPages}
      ListItemLayout={PackageListItemLayout}
    />
  );
};
