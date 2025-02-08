import { CustomSkeleton } from "@/global/components/reusables";
import { fiveBg } from "@/global/styles/app.css";
import { Group, Stack } from "@mantine/core";

export const PackageComboboxSkeleton = () => {
  return (
    <Group justify="space-between">
      <Stack gap={0}>
        <CustomSkeleton bgcolor={fiveBg} />
        <CustomSkeleton h={15} bgcolor={fiveBg} />
      </Stack>

      <CustomSkeleton v="rounded" w={50} h={30} bgcolor={fiveBg} />
    </Group>
  );
};
