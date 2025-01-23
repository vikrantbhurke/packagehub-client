import { Button, Modal, Stack, Text } from "@mantine/core";
import { useDeleteProfilePicById } from "../hooks/delete";
import { modal, modalOverlayProps } from "@/global/styles/global.styles";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/global/states/store";

export const DeleteProfilePicModalLayout = ({ opened, close }: any) => {
  const { auth } = useSelector((state: RootState) => state.auth);

  const { deleteProfilePicByIdMutation, isPending, isSuccess } =
    useDeleteProfilePicById();

  const handleDeleteProfilePicById = () => {
    deleteProfilePicByIdMutation(auth.id);
  };

  useEffect(() => {
    if (isSuccess) close();
  }, [isSuccess]);

  return (
    <Modal
      styles={modal}
      overlayProps={modalOverlayProps}
      opened={opened}
      onClose={close}
      centered>
      <Stack gap="lg">
        <Text ta="center">
          Are you sure you want to delete your profile pic?
        </Text>

        <Button
          onClick={handleDeleteProfilePicById}
          fullWidth
          bg="red"
          loading={isPending}
          loaderProps={{ type: "dots" }}>
          Delete Profile Pic
        </Button>
      </Stack>
    </Modal>
  );
};
