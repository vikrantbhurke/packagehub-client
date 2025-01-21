import { RootState } from "@/global/states/store";
import { useSelector } from "react-redux";

export const CompOneOrTwoRoute = ({ clearance, childOne, childTwo }: any) => {
  const { auth } = useSelector((state: RootState) => state.auth);

  return clearance.includes(auth.role) ? childOne : childTwo;
};
