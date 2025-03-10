import { Button, Modal, Stack, Text } from "@mantine/core";
import { useDeleteReviewsByReviewerId } from "../hooks/delete";
import { modal, modalOverlayProps } from "@/global/styles/global.styles";
import { useSelector } from "react-redux";
import { RootState } from "@/global/states/store";
import { useEffect } from "react";

export const DeleteReviewsModal = ({ opened, close }: any) => {
  const { auth } = useSelector((state: RootState) => state.auth);

  const { deleteReviewsByReviewerIdMutation, isPending, isSuccess } =
    useDeleteReviewsByReviewerId();

  useEffect(() => {
    if (isSuccess) close();
  }, [isSuccess]);

  const handleDeleteReviewsByReviewerId = () => {
    deleteReviewsByReviewerIdMutation(auth.id);
    close();
  };

  return (
    <Modal
      styles={modal}
      overlayProps={modalOverlayProps}
      opened={opened}
      onClose={close}
      centered>
      <Stack gap="lg">
        <Text ta="center">
          Are you sure you want to delete all your reviews?
        </Text>

        <Button
          onClick={handleDeleteReviewsByReviewerId}
          fullWidth
          bg="red"
          disabled={isPending}
          loading={isPending}
          loaderProps={{ type: "dots" }}>
          Delete Reviews
        </Button>
      </Stack>
    </Modal>
  );
};
