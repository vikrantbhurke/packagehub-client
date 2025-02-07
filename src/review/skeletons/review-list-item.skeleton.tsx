import { Group, Skeleton, Stack } from "@mantine/core";

export const ReviewListItemSkeleton = () => {
  return (
    <Stack p="md" gap="lg">
      <Stack gap="xs">
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
  );
};
