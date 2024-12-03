import { CustomEnumCombobox, I } from "@/global/components/components";
import { oneBg, oneTx } from "@/global/styles/app.css";
import {
  footerHeight,
  formTextInput,
  getMainContentHeight,
  headerHeight,
  mainContentWidth,
} from "@/global/styles/global.styles";
import { useSignUpUserForm } from "@/user/hooks/create";
import {
  ActionIcon,
  Anchor,
  Button,
  Container,
  Group,
  Loader,
  PasswordInput,
  Space,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { IconRefresh } from "@tabler/icons-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Gender } from "../enums";
import { globalUtility } from "@/global/utilities";
import { RootState } from "@/global/states/store";
import { setGender } from "../user.slice";
import { useDispatch } from "react-redux";
import { useAuthReroute, useIsMobile } from "@/global/hooks";

export const SignUpUserFormLayout = () => {
  useAuthReroute();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { form, handleSignUpUser, isPending } = useSignUpUserForm();
  const { gender } = useSelector((state: RootState) => state.user);

  const handleNavigateToSignIn = () => navigate("/sign-in");

  const handleGender = (gender: Gender) => {
    dispatch(setGender(gender));
  };

  return (
    <Container size={mainContentWidth} p={0}>
      <form onSubmit={form.onSubmit(handleSignUpUser)}>
        <Stack
          px="md"
          justify="center"
          align="center"
          bg={oneBg}
          h={getMainContentHeight(headerHeight, footerHeight, 0, isMobile)}>
          <Stack maw={500} miw={400} gap="lg">
            <Stack gap={0}>
              <Group gap={0} align="center" justify="space-between">
                <Space w="md" />

                <Title order={3}>Welcome!</Title>

                {form.isDirty() ? (
                  <ActionIcon
                    bg="transparent"
                    c={oneTx}
                    aria-label="Refresh"
                    onClick={form.reset}>
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
              <Text c="dimmed" ta="center" mt={5}>
                Already have an account?{" "}
                <Anchor
                  c={oneTx}
                  underline="never"
                  onClick={handleNavigateToSignIn}>
                  Sign in
                </Anchor>
              </Text>
            </Stack>

            <Stack gap="sm">
              <Stack gap={0}>
                <Text>Firstname</Text>

                <TextInput
                  minLength={2}
                  maxLength={20}
                  styles={formTextInput}
                  required
                  placeholder="John"
                  key={form.key("firstname")}
                  {...form.getInputProps("firstname")}
                />
              </Stack>

              <Stack gap={0}>
                <Text>Lastname</Text>

                <TextInput
                  minLength={2}
                  maxLength={20}
                  styles={formTextInput}
                  required
                  placeholder="Doe"
                  key={form.key("lastname")}
                  {...form.getInputProps("lastname")}
                />
              </Stack>

              <Stack gap={0}>
                <Text>Username</Text>

                <TextInput
                  minLength={3}
                  maxLength={20}
                  styles={formTextInput}
                  required
                  placeholder="johndoe"
                  key={form.key("username")}
                  {...form.getInputProps("username")}
                />
              </Stack>

              <Stack gap={0}>
                <Text>Email</Text>

                <TextInput
                  minLength={5}
                  maxLength={20}
                  styles={formTextInput}
                  required
                  placeholder="johndoe@gmail.com"
                  key={form.key("email")}
                  {...form.getInputProps("email")}
                />
              </Stack>

              <Stack gap={0}>
                <Text>Password</Text>

                <PasswordInput
                  minLength={6}
                  maxLength={20}
                  styles={formTextInput}
                  required
                  placeholder="Password123!"
                  key={form.key("password")}
                  {...form.getInputProps("password")}
                />
              </Stack>

              <Stack gap={0}>
                <Text>Confirm Password</Text>

                <PasswordInput
                  minLength={6}
                  maxLength={20}
                  styles={formTextInput}
                  required
                  placeholder="Password123!"
                  key={form.key("confirmPassword")}
                  {...form.getInputProps("confirmPassword")}
                />
              </Stack>

              <Stack gap={0}>
                <Text>Gender</Text>

                <CustomEnumCombobox
                  EnumObject={Gender}
                  label="Order"
                  data={Object.values(Gender)}
                  handleValue={handleGender}
                  value={globalUtility.getKeyByValue(Gender, gender)}
                />
              </Stack>
            </Stack>

            <Button
              disabled={isPending}
              type="submit"
              fullWidth
              radius="sm"
              c={oneBg}
              bg={oneTx}>
              {isPending ? <Loader color={oneBg} type="dots" /> : "Sign Up"}
            </Button>
          </Stack>
        </Stack>
      </form>
    </Container>
  );
};
