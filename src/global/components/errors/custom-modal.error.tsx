import { oneBg, roundBorderStyle } from "@/global/styles/app.css";
import { Center, Group, Pagination, Space, Stack, Text } from "@mantine/core";

export const CustomModalError = ({ message }: any) => {
  return (
    <Stack
      gap={2}
      p={3}
      h={200}
      bg={oneBg}
      className={roundBorderStyle}
      justify="space-between">
      <Space />

      <Center>
        <Text>{message}</Text>
      </Center>

      <Pagination.Root value={0} onChange={() => {}} total={0}>
        <Group gap={5} justify="space-evenly" py={2}>
          <Pagination.Previous w="49%" />
          <Pagination.Next w="49%" />
        </Group>
      </Pagination.Root>
    </Stack>
  );
};
