import { getFormTextInputStyles, modal } from "@/global/styles/global.styles";
import {
  ActionIcon,
  Group,
  Space,
  Stack,
  TextInput,
  PasswordInput,
  Button,
  Grid,
  Avatar,
  Modal,
  Center,
  Image,
  Text,
  Box,
  FileButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useUpdateUserByIdForm } from "../hooks/update";
import { IconRefresh } from "@tabler/icons-react";
import {
  oneTx,
  borderLCStyle,
  oneBg,
  roundBorderStyle,
  twoBg,
  fiveTx,
} from "@/global/styles/app.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/global/states/store";
import { useRef, useState } from "react";
import { I } from "@/global/components/reusables";
import { useDispatch } from "react-redux";
import { setFocusedInput } from "@/global/states/view.slice";
import { DeleteProfilePicModal } from "./delete-profile-pic.modal";

export const UpdateUserByIdFormLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((state: RootState) => state.auth);
  const [picViewOpened, setOpened] = useState(false);
  const [picDeleteOpened, { open, close }] = useDisclosure();
  const [file, setFile] = useState<any>(null);
  const resetRef = useRef<() => void>(null);

  const clearFile = () => {
    setFile(null);
    resetRef.current?.();
  };

  const { focusedInput, isMobile } = useSelector(
    (state: RootState) => state.view
  );

  const { user, form, handleUpdateUserById, isPending } =
    useUpdateUserByIdForm();

  const handleFocus = (id: string) => dispatch(setFocusedInput(id));
  const handleBlur = () => dispatch(setFocusedInput(""));
  const handleCancel = () => navigate(-1);

  return (
    <Box component="div" bg={isMobile ? oneBg : twoBg} h="100%">
      <Stack px="md" h="100%" gap="xl" justify="center" align="center" py="xl">
        <form onSubmit={form.onSubmit(handleUpdateUserById)}>
          <Stack
            w={isMobile ? "100vw" : 400}
            gap="lg"
            bg={oneBg}
            p={isMobile ? "md" : "xl"}
            className={`${isMobile ? "" : `${borderLCStyle}`} ${roundBorderStyle}`}>
            <Modal
              c={oneTx}
              styles={modal}
              opened={picViewOpened}
              onClose={() => setOpened(false)}
              title="Profile Picture"
              centered>
              <Center>
                <Image src={user.profilepic} alt="Large Profile" radius="md" />
              </Center>
            </Modal>

            <DeleteProfilePicModal opened={picDeleteOpened} close={close} />

            <Group gap={0} align="center" justify="space-between">
              <Space w="xl" />

              {user.profilepic ? (
                <>
                  <Avatar
                    src={user.profilepic}
                    size="xl"
                    radius="50%"
                    onClick={() => setOpened(true)}
                  />
                </>
              ) : (
                <Avatar size="xl">
                  {user.firstname[0]}
                  {user.lastname[0]}
                </Avatar>
              )}

              {form.isDirty() ? (
                <ActionIcon aria-label="Refresh" onClick={form.reset}>
                  <I I={IconRefresh} />
                </ActionIcon>
              ) : (
                <ActionIcon
                  disabled
                  c="transparent"
                  aria-label="Refresh Disabled"
                />
              )}
            </Group>

            <Stack gap="sm">
              <Stack>
                {file && (
                  <Text p="xs" fz="xs" bg={twoBg} className={roundBorderStyle}>
                    Selected file: {file.name}
                  </Text>
                )}

                <Grid>
                  <Grid.Col span={4}>
                    <FileButton
                      resetRef={resetRef}
                      onChange={(file) => {
                        setFile(file);
                        form.setFieldValue("profilepic", file);
                      }}
                      accept="image/*">
                      {(props) => (
                        <Button fullWidth bg={fiveTx} c={oneBg} {...props}>
                          Upload
                        </Button>
                      )}
                    </FileButton>
                  </Grid.Col>

                  <Grid.Col span={4}>
                    <Button
                      disabled={!file}
                      color="yellow"
                      fullWidth
                      onClick={clearFile}>
                      Reset
                    </Button>
                  </Grid.Col>

                  <Grid.Col span={4}>
                    {user.id === auth.id && user.profilepic ? (
                      <Button fullWidth bg="red" c="white" onClick={open}>
                        Delete
                      </Button>
                    ) : (
                      <Button disabled fullWidth>
                        Delete
                      </Button>
                    )}
                  </Grid.Col>
                </Grid>
              </Stack>

              <Stack gap={0}>
                <Text>Firstname</Text>
                <TextInput
                  required
                  minLength={2}
                  maxLength={20}
                  styles={getFormTextInputStyles(focusedInput === "firstname")}
                  wrapperProps={{
                    onFocus: () => handleFocus("firstname"),
                    onBlur: handleBlur,
                  }}
                  key={form.key("firstname")}
                  {...form.getInputProps("firstname")}
                />
              </Stack>

              <Stack gap={0}>
                <Text>Lastname</Text>
                <TextInput
                  required
                  minLength={2}
                  maxLength={20}
                  styles={getFormTextInputStyles(focusedInput === "lastname")}
                  wrapperProps={{
                    onFocus: () => handleFocus("lastname"),
                    onBlur: handleBlur,
                  }}
                  key={form.key("lastname")}
                  {...form.getInputProps("lastname")}
                />
              </Stack>

              <Stack gap={0}>
                <Text>Email</Text>
                <TextInput
                  minLength={5}
                  maxLength={20}
                  styles={getFormTextInputStyles(focusedInput === "email")}
                  wrapperProps={{
                    onFocus: () => handleFocus("email"),
                    onBlur: handleBlur,
                  }}
                  placeholder={user.email}
                  key={form.key("email")}
                  {...form.getInputProps("email")}
                />
              </Stack>

              <Stack gap={0}>
                <Text>New Password</Text>
                <PasswordInput
                  minLength={6}
                  maxLength={20}
                  styles={getFormTextInputStyles(focusedInput === "password")}
                  wrapperProps={{
                    onFocus: () => handleFocus("password"),
                    onBlur: handleBlur,
                  }}
                  placeholder=""
                  key={form.key("password")}
                  {...form.getInputProps("password")}
                />
              </Stack>

              <Stack gap={0}>
                <Text>Confirm Password</Text>
                <PasswordInput
                  minLength={6}
                  maxLength={20}
                  styles={getFormTextInputStyles(
                    focusedInput === "confirmPassword"
                  )}
                  wrapperProps={{
                    onFocus: () => handleFocus("confirmPassword"),
                    onBlur: handleBlur,
                  }}
                  placeholder=""
                  key={form.key("confirmPassword")}
                  {...form.getInputProps("confirmPassword")}
                />
              </Stack>
            </Stack>

            <Grid>
              <Grid.Col span={6}>
                <Button
                  disabled={isPending}
                  type="submit"
                  fullWidth
                  bg="blue"
                  loading={isPending}
                  loaderProps={{ type: "dots" }}>
                  Update Profile
                </Button>
              </Grid.Col>

              <Grid.Col span={6}>
                <Button fullWidth bg="yellow" onClick={handleCancel}>
                  Cancel
                </Button>
              </Grid.Col>
            </Grid>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
};
