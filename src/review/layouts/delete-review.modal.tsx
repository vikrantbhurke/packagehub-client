import { Button, Modal, Stack, Text } from "@mantine/core";
import { useDeleteReviewById } from "../hooks/delete";
import { modal, modalOverlayProps } from "@/global/styles/global.styles";
import { IconTrash } from "@tabler/icons-react";
import { useEffect } from "react";

export const DeleteReviewModal = ({ rid, opened, close }: any) => {
  const { deleteReviewByIdMutation, isPending, isSuccess } =
    useDeleteReviewById();

  useEffect(() => {
    if (isSuccess) close();
  }, [isSuccess]);

  const handleDeleteReviewById = () => {
    deleteReviewByIdMutation(rid);
  };

  return (
    <Modal
      styles={modal}
      overlayProps={modalOverlayProps}
      opened={opened}
      onClose={close}
      centered>
      <Stack gap="lg">
        <Text ta="center">Are you sure you want to delete this review?</Text>

        <Button
          onClick={handleDeleteReviewById}
          fullWidth
          bg="red"
          disabled={isPending}
          loading={isPending}
          leftSection={<IconTrash stroke={1.5} size={20} />}
          loaderProps={{ type: "dots" }}>
          Delete Review
        </Button>
      </Stack>
    </Modal>
  );
};
