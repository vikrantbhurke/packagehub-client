import { useGetPackageById } from "../hooks/read";
import { CustomError } from "@/global/components/errors";
import { PackageItemLayout } from "../layouts/package-item.layout";
import { SeoComponent } from "@/global/components/reusables";

export const GetPackageByIdItem = () => {
  const { pkg, isPending, isError, error } = useGetPackageById();

  if (isError) return <CustomError message={error?.message} />;
  if (!pkg && !isPending) return <CustomError message="Package not found." />;

  return (
    <>
      <SeoComponent
        title={`Profile Page`}
        description="Learn more about Qool Quotes."
      />
      <PackageItemLayout pkg={pkg} isPending={isPending} />
    </>
  );
};
