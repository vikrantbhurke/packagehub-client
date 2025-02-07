import { Group, Skeleton, Stack } from "@mantine/core";

export const PackageListItemSkeleton = () => {
  return (
    <Stack p="md" gap="lg">
      <Skeleton height={10} radius="sm" width="20%" />

      <Group justify="space-between" w="100%">
        <Group justify="start" gap="xs" w="80%">
          <Skeleton height={30} radius="sm" width="20%" />
          <Skeleton height={6} radius="sm" width="15%" />
          <Skeleton height={6} radius="sm" width="15%" />
        </Group>

        <Skeleton height={30} radius="sm" width="15%" />
      </Group>

      <Skeleton height={10} radius="sm" width="100%" />

      <Stack gap="xs">
        <Skeleton height={36} radius="sm" width="100%" />
        <Skeleton height={36} radius="sm" width="100%" />
      </Stack>
    </Stack>
  );
};
