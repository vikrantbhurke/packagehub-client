import { threeBg } from "@/global/styles/app.css";
import { Skeleton } from "@mui/material";

export const CustomSkeleton = ({
  a = "wave",
  v = "text",
  w = 100,
  h = 25,
  bgcolor = threeBg,
}: any) => {
  return (
    <Skeleton animation={a} variant={v} sx={{ bgcolor }} width={w} height={h} />
  );
};
