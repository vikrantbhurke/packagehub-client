import { RootState } from "@/global/states/store";
import { oneBg, roundBorderStyle, twoBg } from "@/global/styles/app.css";
import { Box, Group, Skeleton, Space, Stack } from "@mantine/core";
import { useSelector } from "react-redux";

export const UserItemSkeleton = () => {
  const { isMobile } = useSelector((state: RootState) => state.view);

  return (
    <>
      <Box component="div" bg={isMobile ? oneBg : twoBg} h="100%">
        <Stack
          h="100%"
          gap="xl"
          align="center"
          justify={isMobile ? "start" : "space-between"}>
          <Space h={isMobile ? 50 : 90} />

          <Stack
            w={isMobile ? "100%" : 400}
            gap="xl"
            bg={oneBg}
            p={isMobile ? "md" : "xl"}
            className={`${roundBorderStyle}`}>
            <Stack align="center">
              <Group align="center" gap="md">
                <Skeleton height={80} circle />

                <Stack miw={200} gap="xs" align="center">
                  <Skeleton height={10} radius="sm" width="80%" />
                  <Skeleton height={10} radius="sm" width="80%" />
                  <Skeleton height={10} radius="sm" width="80%" />
                </Stack>
              </Group>
            </Stack>
          </Stack>

          <Space h={isMobile ? 50 : 90} />
        </Stack>
      </Box>
    </>
  );
};
