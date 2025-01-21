import { Order } from "@/global/enums";
import { getPackagesByPlatform } from "@/package/package.network";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";

export const useGetPackagesByPlatform = () => {
  let { platform } = useParams();
  let [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || "1");
  const sort = searchParams.get("sort") as string;
  const order = searchParams.get("order") as Order;
  const rating = searchParams.get("rating") as string;

  const getPackagesByPlatformDTO = {
    platform: platform as string,
    sort,
    order,
    rating,
  };

  const {
    error,
    isError,
    isPending,
    data: packages,
  } = useQuery({
    queryKey: [
      "getPackagesByPlatform",
      page - 1,
      ...Object.values(getPackagesByPlatformDTO),
    ],

    queryFn: () =>
      getPackagesByPlatform({ page: page - 1, ...getPackagesByPlatformDTO }),
  });

  const prevPage = packages?.firstPage ? page : page - 1;
  const nextPage = packages?.lastPage ? page : page + 1;
  const lastPage = packages?.totalPages ? packages.totalPages : page;

  useQuery({
    queryKey: [
      "getPackagesByPlatform",
      prevPage - 1,
      ...Object.values(getPackagesByPlatformDTO),
    ],

    queryFn: () =>
      getPackagesByPlatform({
        page: prevPage - 1,
        ...getPackagesByPlatformDTO,
      }),

    enabled: !!prevPage,
  });

  useQuery({
    queryKey: [
      "getPackagesByPlatform",
      nextPage - 1,
      ...Object.values(getPackagesByPlatformDTO),
    ],

    queryFn: () =>
      getPackagesByPlatform({
        page: nextPage - 1,
        ...getPackagesByPlatformDTO,
      }),

    enabled: !!nextPage,
  });

  useQuery({
    queryKey: [
      "getPackagesByPlatform",
      lastPage - 1,
      ...Object.values(getPackagesByPlatformDTO),
    ],

    queryFn: () =>
      getPackagesByPlatform({
        page: lastPage - 1,
        ...getPackagesByPlatformDTO,
      }),

    enabled: !!lastPage,
  });

  return { error, packages, isPending, isError, platform };
};
