import { verifyEmail } from "@/user/user.network";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const useVerifyEmail = () => {
  let { token } = useParams();

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["verifyEmail", token],
    queryFn: () => verifyEmail(token),
    enabled: !!token,
  });

  return { data, error, isPending, isError };
};
