import { useGetPackageById } from "../hooks/read";
import { CustomError } from "@/global/components/errors";
import { PackageItemLayout } from "../layouts/package-item.layout";
import { SeoComponent } from "@/global/components/reusables";
import { PackageItemSkeleton } from "../skeletons";

export const GetPackageByIdItem = () => {
  const { pkg, isPending, isError, error } = useGetPackageById();

  if (isPending) return <PackageItemSkeleton />;
  if (isError) return <CustomError message={error?.message} />;
  if (!pkg) return <CustomError message="Package not found." />;

  return (
    <>
      <SeoComponent
        title={`Profile Page`}
        description="Learn more about Qool Quotes."
      />
      <PackageItemLayout pkg={pkg} />
    </>
  );
};
