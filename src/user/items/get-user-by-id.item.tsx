import { useGetUserById } from "../hooks/read";
import { CustomError } from "@/global/components/errors";
import { UserItemLayout } from "../layouts/user-item.layout";
import { SeoComponent } from "@/global/components/reusables";
import { UserItemSkeleton } from "../skeletons";

export const GetUserByIdItem = () => {
  const { user, isPending, isError, error } = useGetUserById();

  if (isPending) return <UserItemSkeleton />;
  if (isError) return <CustomError message={error?.message} />;
  if (!user) return <CustomError message="User not found." />;

  return (
    <>
      <SeoComponent
        title={`Profile Page`}
        description="Learn more about Qool Quotes."
      />
      <UserItemLayout user={user} />
    </>
  );
};
