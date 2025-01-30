import { I } from "@/global/components/components";
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
import { useSignUpUserForm } from "@/user/hooks/create";
import {
  ActionIcon,
  Anchor,
  Box,
  Button,
  Container,
  Group,
  PasswordInput,
  ScrollArea,
  Space,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { IconRefresh } from "@tabler/icons-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/global/states/store";
import { useDispatch } from "react-redux";
import { useAuthReroute } from "@/global/hooks";
import { setFocusedInput } from "@/global/states/view.slice";

export const SignUpUserFormLayout = () => {
  useAuthReroute();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { form, handleSignUpUser, isPending } = useSignUpUserForm();

  const { focusedInput, isMobile } = useSelector(
    (state: RootState) => state.view
  );

  const handleNavigateToSignIn = () => navigate("/sign-in");
  const handleFocus = (id: string) => dispatch(setFocusedInput(id));
  const handleBlur = () => dispatch(setFocusedInput(""));

  return (
    <Box component="div" bg={isMobile ? oneBg : twoBg} h="100%">
      <Container size={mainContentWidth} p="xl" h="100%">
        <Stack px="md" justify="center" align="center" h="100%">
          <form onSubmit={form.onSubmit(handleSignUpUser)}>
            <ScrollArea
              scrollbarSize={2}
              styles={{
                scrollbar: {
                  display: "none", // Hide Mantine's custom scrollbar
                },
                viewport: {
                  overflowY: "auto", // Ensure the browser scrollbar is used
                },
              }}>
              <Stack
                w={isMobile ? "100vw" : 400}
                gap="lg"
                p={isMobile ? "md" : "xl"}
                bg={oneBg}
                className={`${isMobile ? "" : `${borderLCStyle}`} ${roundBorderStyle}`}>
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
                      required
                      minLength={2}
                      maxLength={20}
                      styles={getFormTextInputStyles(
                        focusedInput === "firstname"
                      )}
                      wrapperProps={{
                        onFocus: () => handleFocus("firstname"),
                        onBlur: handleBlur,
                      }}
                      placeholder="John"
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
                      styles={getFormTextInputStyles(
                        focusedInput === "lastname"
                      )}
                      wrapperProps={{
                        onFocus: () => handleFocus("lastname"),
                        onBlur: handleBlur,
                      }}
                      placeholder="Doe"
                      key={form.key("lastname")}
                      {...form.getInputProps("lastname")}
                    />
                  </Stack>

                  <Stack gap={0}>
                    <Text>Username</Text>

                    <TextInput
                      required
                      minLength={3}
                      maxLength={20}
                      styles={getFormTextInputStyles(
                        focusedInput === "username"
                      )}
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
                    <Text>Email</Text>

                    <TextInput
                      required
                      minLength={5}
                      maxLength={20}
                      styles={getFormTextInputStyles(focusedInput === "email")}
                      wrapperProps={{
                        onFocus: () => handleFocus("email"),
                        onBlur: handleBlur,
                      }}
                      placeholder="johndoe@gmail.com"
                      key={form.key("email")}
                      {...form.getInputProps("email")}
                    />
                  </Stack>

                  <Stack gap={0}>
                    <Text>Password</Text>

                    <PasswordInput
                      required
                      minLength={6}
                      maxLength={20}
                      styles={getFormTextInputStyles(
                        focusedInput === "password"
                      )}
                      wrapperProps={{
                        onFocus: () => handleFocus("password"),
                        onBlur: handleBlur,
                      }}
                      placeholder="Password123!"
                      key={form.key("password")}
                      {...form.getInputProps("password")}
                    />
                  </Stack>

                  <Stack gap={0}>
                    <Text>Confirm Password</Text>

                    <PasswordInput
                      required
                      minLength={6}
                      maxLength={20}
                      styles={getFormTextInputStyles(
                        focusedInput === "confirmPassword"
                      )}
                      wrapperProps={{
                        onFocus: () => handleFocus("confirmPassword"),
                        onBlur: handleBlur,
                      }}
                      placeholder="Password123!"
                      key={form.key("confirmPassword")}
                      {...form.getInputProps("confirmPassword")}
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
                  Sign Up
                </Button>
              </Stack>
            </ScrollArea>
          </form>
        </Stack>
      </Container>
    </Box>
  );
};
