import { useEffect } from "react";
import { useSelector } from "react-redux";
import { setPage } from "../review.slice";
import { ReviewListItemLayout } from "../layouts";
import { useOutletContext } from "react-router-dom";
import { CustomList } from "@/global/components/lists";
import { oneBg, twoBg } from "@/global/styles/app.css";
import { useSearchReviewsByReviewerId } from "../hooks/read";
import { CustomError } from "@/global/components/errors";
import { CustomLoader } from "@/global/components/loaders";
import { SeoComponent } from "@/global/components/reusables";
import { PaginationPlaceholder } from "@/global/components/placeholders";

export const SearchReviewsByReviewerIdCustomList = () => {
  const { isMobile } = useSelector((state: any) => state.view);
  const { page } = useSelector((state: any) => state.review);
  const { reviews, isPending, isError, error } = useSearchReviewsByReviewerId();
  const setData = useOutletContext<any>();

  useEffect(() => {
    setData((data: any) => ({
      ...data,
      page: reviews?.page + 1 || 0,
      totalPages: reviews?.totalPages || 0,
      totalElements: reviews?.totalElements || 0,
    }));
  }, [reviews, setData]);

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

  if (!reviews?.content?.length)
    return (
      <>
        <CustomError message="Reviews not found." />
        <PaginationPlaceholder />
      </>
    );

  return (
    <>
      <SeoComponent
        title={`Reviews Page ${page}`}
        description={`Browse quotes on page ${page} and find inspiration.`}
      />
      <CustomList
        page={page}
        listBg={isMobile ? oneBg : twoBg}
        setPage={setPage}
        dataArray={reviews.content}
        totalPages={reviews.totalPages}
        ListItemLayout={ReviewListItemLayout}
      />
    </>
  );
};
