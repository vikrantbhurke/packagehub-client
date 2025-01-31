import { useEffect } from "react";
import { useSelector } from "react-redux";
import { setPage } from "../package.slice";
import { PackageListItemLayout } from "../layouts";
import { useOutletContext } from "react-router-dom";
import { CustomList } from "@/global/components/lists";
import { oneBg, twoBg } from "@/global/styles/app.css";
import { useGetPackagesByPlatform } from "../hooks/read";
import { CustomError } from "@/global/components/errors";
import { CustomLoader } from "@/global/components/loaders";
import { SeoComponent } from "@/global/components/reusables";
import { PaginationPlaceholder } from "@/global/components/placeholders";
import { RootState } from "@/global/states/store";

export const GetPackagesByPlatformCustomList = () => {
  const { isMobile } = useSelector((state: RootState) => state.view);
  const { page } = useSelector((state: RootState) => state.package);
  const { packages, isPending, isError, error } = useGetPackagesByPlatform();
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
      <>
        <CustomLoader />
        <PaginationPlaceholder />
      </>
    );

  if (isError)
    return (
      <>
        <CustomError message={error?.message} />
        <PaginationPlaceholder />
      </>
    );

  if (!packages.content.length)
    return (
      <>
        <CustomError message="Packages not found." />
        <PaginationPlaceholder />
      </>
    );

  return (
    <>
      <SeoComponent
        title={`Packages Page ${page}`}
        description={`Browse quotes on page ${page} and find inspiration.`}
      />
      <CustomList
        page={page}
        listBg={isMobile ? oneBg : twoBg}
        setPage={setPage}
        dataArray={packages.content}
        totalPages={packages.totalPages}
        ListItemLayout={PackageListItemLayout}
      />
    </>
  );
};
