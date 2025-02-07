import { RootState } from "@/global/states/store";
import { Box, Group, Skeleton, Stack } from "@mantine/core";
import { useSelector } from "react-redux";
import {
  oneBg,
  roundBorderStyle,
  twoBg,
  borderLCStyle,
  noBorderStyle,
} from "@/global/styles/app.css";

export const PackageItemSkeleton = () => {
  const { isMobile } = useSelector((state: RootState) => state.view);

  return (
    <Box component="div" bg={isMobile ? oneBg : twoBg} h="100%">
      <Stack
        h="100%"
        gap="xl"
        align="center"
        justify={isMobile ? "start" : "center"}>
        <Stack
          w={isMobile ? "100vw" : 600}
          gap="xl"
          p={isMobile ? "md" : "xl"}
          bg={oneBg}
          className={`${isMobile ? `${noBorderStyle}` : `${borderLCStyle} ${roundBorderStyle}`}`}>
          <Stack gap="xs">
            <Skeleton height={10} radius="sm" width="30%" mb="lg" />

            <Group justify="space-between" w="100%">
              <Group justify="start" gap="xs" w="80%">
                <Skeleton height={30} radius="sm" width="20%" />
                <Skeleton height={6} radius="sm" width="15%" />
                <Skeleton height={6} radius="sm" width="15%" />
              </Group>

              <Skeleton height={30} radius="sm" width="15%" />
            </Group>
          </Stack>

          <Skeleton height={10} radius="sm" width="100%" />

          <Stack gap="xs">
            <Skeleton height={36} radius="sm" width="100%" />
            <Skeleton height={36} radius="sm" width="100%" />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};
