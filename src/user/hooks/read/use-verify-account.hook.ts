import { verifyAccount } from "@/user/user.network";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const useVerifyAccount = () => {
  let { token } = useParams();

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["verifyAccount", token],
    queryFn: () => verifyAccount(token),
    enabled: !!token,
  });

  return { data, error, isPending, isError };
};
