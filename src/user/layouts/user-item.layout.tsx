import { useDisclosure } from "@mantine/hooks";
import { modal } from "@/global/styles/global.styles";
import {
  Button,
  Stack,
  Grid,
  Avatar,
  Modal,
  Center,
  Image,
  Text,
  Box,
  Group,
  Title,
} from "@mantine/core";
import {
  oneTx,
  oneBg,
  border,
  roundBorder,
  twoBg,
  borderBottom,
} from "@/global/styles/app.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/global/states/store";
import { DeleteUserModalLayout } from "./delete-user-modal.layout";
import { I } from "@/global/components/components";
import { IconMailFilled, IconStarFilled } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { setPage } from "@/review/review.slice";

export const UserItemLayout = ({ user }: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [opened, { open, close }] = useDisclosure();
  const [picOpened, setPicOpened] = useState(false);

  const { isMobile } = useSelector((state: RootState) => state.view);

  const { sort, order, rating } = useSelector(
    (state: RootState) => state.review
  );

  const handleNavigateToUserReviews = () => {
    dispatch(setPage(1));
    navigate(
      `/reviews/reviewerId/${user.id}?page=1&sort=${sort}&order=${order}&rating=${rating}`
    );
  };

  return (
    <>
      <Modal
        c={oneTx}
        styles={modal}
        opened={picOpened}
        onClose={() => setPicOpened(false)}
        title="Profile Picture"
        centered>
        <Center>
          <Image src={user.profilepic} alt="Large Profile" radius="md" />
        </Center>
      </Modal>

      <Box component="div" bg={isMobile ? oneBg : twoBg} h="100%">
        <Stack
          h="100%"
          gap="xl"
          align="center"
          justify={isMobile ? "start" : "center"}>
          <Stack
            maw={isMobile ? 600 : 670}
            miw={isMobile ? "100%" : 470}
            gap="xl"
            p={isMobile ? "md" : "xl"}
            bg={oneBg}
            className={`${isMobile ? `${borderBottom}` : `${border} ${roundBorder}`}`}>
            <DeleteUserModalLayout opened={opened} close={close} />

            <Stack align="center">
              <Group align="center" gap="xl">
                {user.profilepic ? (
                  <>
                    <Avatar
                      src={user.profilepic}
                      size="xl"
                      radius="50%"
                      onClick={() => setPicOpened(true)}
                    />
                  </>
                ) : (
                  <Avatar size="xl">
                    {user.firstname[0]}
                    {user.lastname[0]}
                  </Avatar>
                )}

                <Stack gap="md" align="center">
                  <Stack gap={0} onClick={handleNavigateToUserReviews}>
                    <Title order={5}>
                      {user.firstname} {user.lastname}
                    </Title>

                    <Text size="sm" c="dimmed" td="underline">
                      @{user.username}
                    </Text>
                  </Stack>

                  <Stack gap={0}>
                    <Group gap="xs">
                      <I I={IconMailFilled} /> <Text>{user.email}</Text>
                    </Group>

                    <Group gap="xs">
                      <I I={IconStarFilled} /> <Text>123 reviews</Text>
                    </Group>
                  </Stack>
                </Stack>
              </Group>
            </Stack>

            <Grid>
              <Grid.Col span={6}>
                <Button
                  fullWidth
                  radius="sm"
                  bg="blue"
                  onClick={() => navigate(`/users/${user.id}/edit`)}>
                  Edit Profile
                </Button>
              </Grid.Col>

              <Grid.Col span={6}>
                <Button fullWidth radius="sm" bg="red" onClick={open}>
                  Delete Account
                </Button>
              </Grid.Col>

              <Grid.Col span={6}>
                <Button
                  fullWidth
                  radius="sm"
                  bg={oneTx}
                  c={oneBg}
                  onClick={handleNavigateToUserReviews}>
                  View Reviews
                </Button>
              </Grid.Col>
            </Grid>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};
