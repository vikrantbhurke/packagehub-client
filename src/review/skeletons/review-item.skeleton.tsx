import { Box, Group, Skeleton, Stack } from "@mantine/core";
import { useSelector } from "react-redux";
import { RootState } from "@/global/states/store";
import {
  oneBg,
  roundBorderStyle,
  twoBg,
  borderLCStyle,
  noBorderStyle,
} from "@/global/styles/app.css";

export const ReviewItemSkeleton = () => {
  const { isMobile } = useSelector((state: RootState) => state.view);

  return (
    <Box component="div" bg={isMobile ? oneBg : twoBg} h="100%">
      <Stack
        h="100%"
        gap="lg"
        align="center"
        justify={isMobile ? "start" : "center"}>
        <Stack
          w={isMobile ? "100vw" : 600}
          gap="xl"
          p={isMobile ? "md" : "xl"}
          bg={oneBg}
          className={`${isMobile ? `${noBorderStyle}` : `${borderLCStyle} ${roundBorderStyle}`}`}>
          <Stack gap="lg">
            <Group justify="space-between">
              <Group w="70%">
                <Skeleton height={40} circle />

                <Stack gap="xs" w="40%">
                  <Skeleton height={8} radius="sm" width="50%" />
                  <Skeleton height={6} radius="sm" width="50%" />
                </Stack>
              </Group>

              <Skeleton height={30} radius="sm" width="15%" />
            </Group>

            <Stack gap="xs" align="stretch">
              <Skeleton height={8} radius="sm" width="15%" />
              <Skeleton height={6} radius="sm" width="20%" />
            </Stack>
          </Stack>

          <Stack gap="xs">
            <Skeleton height={10} radius="sm" width="60%" mb="lg" />

            <Skeleton height={10} radius="sm" width="100%" />
            <Skeleton height={10} radius="sm" width="100%" />
            <Skeleton height={10} radius="sm" width="90%" />
          </Stack>

          <Group w="100%">
            <Skeleton height={30} radius="sm" width="15%" />
            <Skeleton height={30} radius="sm" width="15%" />
            <Skeleton height={30} radius="sm" width="15%" />
          </Group>
        </Stack>
      </Stack>
    </Box>
  );
};
