import { searchPackagesByPlatform } from "@/package/package.network";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "@/global/states/store";

export const useSearchPackagesByPlatform = () => {
  const { platform, sort, order, page } = useSelector(
    (state: RootState) => state.package
  );

  const { search } = useSelector((state: RootState) => state.view);

  const searchPackagesByPlatformDTO = {
    platform: platform as string,
    search,
    sort,
    order,
  };

  const {
    isError,
    isPending,
    data: packages,
  } = useQuery({
    queryKey: [
      "searchPackagesByPlatform",
      page - 1,
      ...Object.values(searchPackagesByPlatformDTO),
    ],

    queryFn: () =>
      searchPackagesByPlatform({
        page: page - 1,
        ...searchPackagesByPlatformDTO,
      }),

    enabled: !!search,
  });

  const prevPage = packages?.firstPage ? page : page - 1;
  const nextPage = packages?.lastPage ? page : page + 1;
  const lastPage = packages?.totalPages ? packages.totalPages : page;

  useQuery({
    queryKey: [
      "searchPackagesByPlatform",
      prevPage - 1,
      ...Object.values(searchPackagesByPlatformDTO),
    ],

    queryFn: () =>
      searchPackagesByPlatform({
        page: prevPage - 1,
        ...searchPackagesByPlatformDTO,
      }),

    enabled: !!prevPage && !!search,
  });

  useQuery({
    queryKey: [
      "searchPackagesByPlatform",
      nextPage - 1,
      ...Object.values(searchPackagesByPlatformDTO),
    ],

    queryFn: () =>
      searchPackagesByPlatform({
        page: nextPage - 1,
        ...searchPackagesByPlatformDTO,
      }),

    enabled: !!nextPage && !!search,
  });

  useQuery({
    queryKey: [
      "searchPackagesByPlatform",
      lastPage - 1,
      ...Object.values(searchPackagesByPlatformDTO),
    ],

    queryFn: () =>
      searchPackagesByPlatform({
        page: lastPage - 1,
        ...searchPackagesByPlatformDTO,
      }),

    enabled: !!lastPage && !!search,
  });

  return { isError, isPending, packages };
};
