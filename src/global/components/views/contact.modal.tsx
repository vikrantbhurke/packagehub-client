import { modal, modalOverlayProps } from "@/global/styles/global.styles";
import { CreateMessageFormLayout } from "@/message/layouts";
import { Modal } from "@mantine/core";

export const ContactModal = ({ opened, close }: any) => {
  return (
    <Modal
      styles={modal}
      overlayProps={modalOverlayProps}
      opened={opened}
      onClose={close}
      title="Contact Us"
      centered>
      <CreateMessageFormLayout />
    </Modal>
  );
};
