import { I } from "@/global/components/components";
import { useAuthReroute } from "@/global/hooks";
import { RootState } from "@/global/states/store";
import { setFocusedInput } from "@/global/states/view.slice";
import {
  oneBg,
  oneTx,
  borderLCStyle,
  roundBorderStyle,
  twoBg,
} from "@/global/styles/app.css";
import {
  getFormTextInputStyles,
  mainContentWidth,
} from "@/global/styles/global.styles";
import { useSignInUserForm } from "@/user/hooks/create";
import {
  ActionIcon,
  Anchor,
  Box,
  Button,
  Container,
  Group,
  PasswordInput,
  Space,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { IconRefresh } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const SignInUserFormLayout = () => {
  useAuthReroute();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { form, handleSignInUser, isPending } = useSignInUserForm();

  const { focusedInput, isMobile } = useSelector(
    (state: RootState) => state.view
  );

  const handleNavigateToSignUp = () => navigate("/sign-up");
  const handleFocus = (id: string) => dispatch(setFocusedInput(id));
  const handleBlur = () => dispatch(setFocusedInput(""));

  return (
    <Box component="div" bg={isMobile ? oneBg : twoBg} h="100%">
      <Container size={mainContentWidth} p="xl" h="100%">
        <Stack px="md" justify="center" align="center" h="100%">
          <form onSubmit={form.onSubmit(handleSignInUser)}>
            <Stack
              w={isMobile ? "100vw" : 400}
              gap="lg"
              bg={oneBg}
              p={isMobile ? "md" : "xl"}
              className={`${isMobile ? "" : `${borderLCStyle}`} ${roundBorderStyle}`}>
              <Stack gap={0}>
                <Group gap={0} align="center" justify="space-between">
                  <Space w="md" />

                  <Title order={3}>Welcome back!</Title>

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

                <Text c="dimmed" ta="center" mt={5}>
                  Do not have an account yet?{" "}
                  <Anchor
                    c={oneTx}
                    underline="never"
                    onClick={handleNavigateToSignUp}>
                    Create account
                  </Anchor>
                </Text>
              </Stack>

              <Stack gap="sm">
                <Stack gap={0}>
                  <Text>Username</Text>

                  <TextInput
                    required
                    minLength={3}
                    maxLength={20}
                    styles={getFormTextInputStyles(focusedInput === "username")}
                    wrapperProps={{
                      onFocus: () => handleFocus("username"),
                      onBlur: handleBlur,
                    }}
                    placeholder="johndoe"
                    key={form.key("username")}
                    {...form.getInputProps("username")}
                  />
                </Stack>

                <Stack gap={0}>
                  <Text>Password</Text>

                  <PasswordInput
                    required
                    minLength={6}
                    maxLength={20}
                    styles={getFormTextInputStyles(focusedInput === "password")}
                    wrapperProps={{
                      onFocus: () => handleFocus("password"),
                      onBlur: handleBlur,
                    }}
                    placeholder="Password123!"
                    key={form.key("password")}
                    {...form.getInputProps("password")}
                  />
                </Stack>
              </Stack>

              <Button
                disabled={isPending}
                type="submit"
                fullWidth
                c={oneBg}
                bg={oneTx}
                loading={isPending}
                loaderProps={{ type: "dots", color: oneBg }}>
                Sign In
              </Button>
            </Stack>
          </form>
        </Stack>
      </Container>
    </Box>
  );
};
