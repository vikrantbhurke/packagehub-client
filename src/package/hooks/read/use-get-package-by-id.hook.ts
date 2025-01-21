import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getPackageById } from "@/package/package.network";

export const useGetPackageById = () => {
  let { pid } = useParams();

  const {
    data: pkg,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["getPackageById", pid],
    queryFn: () => getPackageById(pid),
    enabled: !!pid,
  });

  return { pkg, isPending, isError, error };
};
