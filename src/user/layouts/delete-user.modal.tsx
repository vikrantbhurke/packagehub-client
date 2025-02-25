import { Button, Modal, Stack, Text } from "@mantine/core";
import { useDeleteUserById } from "../hooks/delete";
import { modal, modalOverlayProps } from "@/global/styles/global.styles";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/global/states/store";

export const DeleteUserModal = ({ opened, close }: any) => {
  const { auth } = useSelector((state: RootState) => state.auth);
  const { deleteUserByIdMutation, isPending, isSuccess } = useDeleteUserById();

  useEffect(() => {
    if (isSuccess) close();
  }, [isSuccess]);

  const handleDeleteUserById = () => {
    deleteUserByIdMutation(auth.id);
  };

  return (
    <Modal
      styles={modal}
      overlayProps={modalOverlayProps}
      opened={opened}
      onClose={close}
      centered>
      <Stack gap="lg">
        <Text ta="center">Are you sure you want to delete account?</Text>

        <Button
          fullWidth
          bg="red"
          disabled={isPending}
          loading={isPending}
          onClick={handleDeleteUserById}
          loaderProps={{ type: "dots" }}>
          Delete Account
        </Button>
      </Stack>
    </Modal>
  );
};
