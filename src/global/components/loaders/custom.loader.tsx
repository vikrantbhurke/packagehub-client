import { oneBg, oneTx, twoBg } from "@/global/styles/app.css";
import { Loader, Stack } from "@mantine/core";
import { useSelector } from "react-redux";

export const CustomLoader = () => {
  const { isMobile } = useSelector((state: any) => state.view);

  return (
    <Stack
      justify="center"
      align="center"
      h="100%"
      bg={isMobile ? oneBg : twoBg}>
      <Loader type="dots" color={oneTx} />
    </Stack>
  );
};
