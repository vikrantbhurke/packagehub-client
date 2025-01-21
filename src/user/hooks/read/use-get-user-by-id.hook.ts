import { getUserById } from "@/user/user.network";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const useGetUserById = () => {
  let { rwid, uid } = useParams();

  const id = rwid || uid;

  const {
    data: user,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["getUserById", id],
    queryFn: () => getUserById(id),
    enabled: !!rwid || !!uid,
  });

  return { user, isPending, isError, error };
};
