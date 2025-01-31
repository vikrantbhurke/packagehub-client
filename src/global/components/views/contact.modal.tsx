import { CreateCitedQuoteFormLayout } from "@/cited-quote/layouts";
import { oneTx } from "@/global/styles/app.css";
import { modal, modalOverlayProps } from "@/global/styles/global.styles";
import { CreateMessageFormLayout } from "@/message/layouts";
import { Modal, Tabs, Text } from "@mantine/core";
import { IconMail, IconMessage2 } from "@tabler/icons-react";
import { I } from "../reusables/icon";

export const ContactModal = ({ opened, close }: any) => {
  return (
    <Modal
      styles={modal}
      overlayProps={modalOverlayProps}
      opened={opened}
      onClose={close}
      centered>
      <Tabs defaultValue="message" color={oneTx}>
        <Tabs.List justify="center">
          <Tabs.Tab value="message" leftSection={<I I={IconMail} />}>
            <Text>Send A Message</Text>
          </Tabs.Tab>
          <Tabs.Tab value="cited-quote" leftSection={<I I={IconMessage2} />}>
            <Text>Cite A Quote</Text>
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="message" pt="md">
          <CreateMessageFormLayout />
        </Tabs.Panel>

        <Tabs.Panel value="cited-quote" pt="md">
          <CreateCitedQuoteFormLayout />
        </Tabs.Panel>
      </Tabs>
    </Modal>
  );
};
