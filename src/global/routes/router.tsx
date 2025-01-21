import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { AppLayout } from "@/global/components/layouts";
import {
  AboutPage,
  HomePage,
  VerifyAccountPage,
  VerifyEmailPage,
} from "../components/pages";
import {
  GetUserByIdItem,
  UpdateUserByIdItem,
  SignInUserItem,
  SignUpUserItem,
} from "@/user/items";
import { PackagesLayout } from "@/package/layouts";
import {
  GetPackagesByPlatformCustomList,
  SearchPackagesByPlatformCustomList,
} from "@/package/lists";
import {
  CreateFirstReviewItem,
  CreateNextReviewItem,
  GetReviewByIdItem,
  UpdateReviewByIdItem,
} from "@/review/items";
import { ReviewsLayout } from "@/review/layouts";
import {
  GetReviewsByPackageIdCustomList,
  GetReviewsByReviewerIdCustomList,
  SearchReviewsByPackageIdCustomList,
  SearchReviewsByReviewerIdCustomList,
} from "@/review/lists";
import { GetPackageByIdItem } from "@/package/items";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />} path="/" errorElement={<></>}>
      <Route path="/" element={<HomePage />} />
      <Route path="sign-up" element={<SignUpUserItem />} />
      <Route path="sign-in" element={<SignInUserItem />} />
      <Route path="about" element={<AboutPage />} />

      <Route element={<PackagesLayout />} path="packages" errorElement={<></>}>
        <Route
          path="platform/:platform"
          element={<GetPackagesByPlatformCustomList />}
        />
        <Route
          path="platform/:platform/search"
          element={<SearchPackagesByPlatformCustomList />}
        />
      </Route>

      <Route path="packages/:pid" element={<GetPackageByIdItem />} />

      <Route element={<ReviewsLayout />} path="reviews" errorElement={<></>}>
        <Route
          path="packageId/:pid"
          element={<GetReviewsByPackageIdCustomList />}
        />
        <Route
          path="reviewerId/:rwid"
          element={<GetReviewsByReviewerIdCustomList />}
        />
        <Route
          path="packageId/:pid/search/:search"
          element={<SearchReviewsByPackageIdCustomList />}
        />
        <Route
          path="reviewerId/:rwid/search/:search"
          element={<SearchReviewsByReviewerIdCustomList />}
        />
      </Route>

      <Route path="reviews/:rid" element={<GetReviewByIdItem />} />
      <Route path="reviews/:rid/edit" element={<UpdateReviewByIdItem />} />
      <Route path="reviews/first" element={<CreateFirstReviewItem />} />
      <Route path="reviews/next" element={<CreateNextReviewItem />} />

      <Route path="users/:uid" element={<GetUserByIdItem />} />
      <Route path="users/:uid/edit" element={<UpdateUserByIdItem />} />

      <Route
        path="users/verify-account/:token"
        element={<VerifyAccountPage />}
      />

      <Route path="users/verify-email/:token" element={<VerifyEmailPage />} />
      <Route path="*" element={<></>} />
    </Route>
  )
);

export const Router = () => {
  return <RouterProvider router={router} />;
};
