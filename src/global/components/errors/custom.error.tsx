import { RootState } from "@/global/states/store";
import { oneBg, twoBg } from "@/global/styles/app.css";
import { Stack, Text } from "@mantine/core";
import { useSelector } from "react-redux";

export const CustomError = ({ message }: any) => {
  const { isMobile } = useSelector((state: RootState) => state.view);

  return (
    <Stack
      justify="center"
      align="center"
      h="100%"
      bg={isMobile ? oneBg : twoBg}>
      <Text>{message}</Text>
    </Stack>
  );
};
