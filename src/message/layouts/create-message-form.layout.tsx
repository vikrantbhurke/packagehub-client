import { useCreateMessageForm } from "../hooks/create";
import {
  ActionIcon,
  Button,
  Group,
  Space,
  Stack,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { getFormTextInput } from "@/global/styles/global.styles";
import { CustomEnumCombobox, I } from "@/global/components/components";
import { globalUtility } from "@/global/utilities";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/global/states/store";
import { Reason } from "../enums";
import { setReason } from "../message.slice";
import { IconRefresh } from "@tabler/icons-react";
import { messageUtility } from "../message.utility";
import { setFocusedInput } from "@/global/states/view.slice";
import { inputStyles } from "@/global/styles/app.css";

export const CreateMessageFormLayout = () => {
  const dispatch = useDispatch();
  const { form, handleCreateMessage, isPending } = useCreateMessageForm();
  const { reason } = useSelector((state: RootState) => state.message);
  const { focusedInput } = useSelector((state: RootState) => state.view);

  const handleFocus = (id: string) => dispatch(setFocusedInput(id));
  const handleBlur = () => dispatch(setFocusedInput(""));
  const handleReason = (order: any) => dispatch(setReason(order));

  return (
    <form onSubmit={form.onSubmit(handleCreateMessage)}>
      <Stack gap="md">
        <Group gap={0} align="center" justify="space-between">
          <Space w="md" />

          <Text ta="center">Tell us what's on your mind.</Text>

          {form.isDirty() ? (
            <ActionIcon size="xs" aria-label="Refresh" onClick={form.reset}>
              <I I={IconRefresh} />
            </ActionIcon>
          ) : (
            <ActionIcon
              disabled
              c="transparent"
              size="xs"
              aria-label="Refresh Disabled"
            />
          )}
        </Group>

        <Stack gap={0} align="flex-start">
          <Text ta="center">Reason</Text>

          <CustomEnumCombobox
            id="reason"
            EnumObject={Reason}
            label="Reason"
            data={Object.values(Reason)}
            handleValue={handleReason}
            value={globalUtility.getKeyByValue(Reason, reason)}
          />
        </Stack>

        <Stack gap={0} align="flex-start">
          <Group justify="space-between" w="100%">
            <Text>Title</Text>
            <Text
              fz="xs"
              c={messageUtility.getTitleColor(form.values.title.length)}>
              {form.values.title.length} / 50
            </Text>
          </Group>

          <TextInput
            minLength={5}
            maxLength={50}
            w="100%"
            placeholder="Title of your message..."
            classNames={{ input: inputStyles }}
            styles={getFormTextInput(focusedInput === "title")}
            wrapperProps={{
              onFocus: () => handleFocus("title"),
              onBlur: handleBlur,
            }}
            key={form.key("title")}
            {...form.getInputProps("title")}
          />
        </Stack>

        <Stack gap={0} align="flex-start">
          <Group justify="space-between" w="100%">
            <Text>Description</Text>
            <Text
              fz="xs"
              c={messageUtility.getDescriptionColor(
                form.values.description.length
              )}>
              {form.values.description.length} / 500
            </Text>
          </Group>

          <Textarea
            minRows={2}
            maxRows={2}
            minLength={5}
            maxLength={500}
            w="100%"
            placeholder="Description of your message..."
            classNames={{ input: inputStyles }}
            styles={getFormTextInput(focusedInput === "description")}
            wrapperProps={{
              onFocus: () => handleFocus("description"),
              onBlur: handleBlur,
            }}
            key={form.key("description")}
            {...form.getInputProps("description")}
          />
        </Stack>

        <Stack gap={0} align="flex-start">
          <Group justify="space-between" w="100%">
            <Text>Email</Text>
          </Group>

          <TextInput
            minLength={5}
            maxLength={20}
            w="100%"
            placeholder="johndoe@gmail.com"
            classNames={{ input: inputStyles }}
            styles={getFormTextInput(focusedInput === "email")}
            wrapperProps={{
              onFocus: () => handleFocus("email"),
              onBlur: handleBlur,
            }}
            key={form.key("email")}
            {...form.getInputProps("email")}
          />
        </Stack>

        <Button
          type="submit"
          fullWidth
          bg="green"
          loading={isPending}
          loaderProps={{ type: "dots" }}>
          Send Message
        </Button>
      </Stack>
    </form>
  );
};
