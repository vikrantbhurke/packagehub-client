import { Group, Skeleton, Stack } from "@mantine/core";

export const PackageComboboxSkeleton = () => {
  return (
    <Group w="100%" justify="space-between" p="xs">
      <Stack w="60%" gap="xs">
        <Skeleton height={10} radius="sm" width="30%" />
        <Skeleton height={6} radius="sm" width="20%" />
      </Stack>

      <Skeleton height={30} radius="sm" width="15%" />
    </Group>
  );
};
