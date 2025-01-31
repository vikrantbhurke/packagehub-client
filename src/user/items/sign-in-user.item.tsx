import { SeoComponent } from "@/global/components/reusables";
import { SignInUserFormLayout } from "../layouts";

export const SignInUserItem = () => {
  return (
    <>
      <SeoComponent
        title="Sign In Page"
        description="Sign in to existing account."
      />
      <SignInUserFormLayout />
    </>
  );
};
