import { I } from "@/global/components/components";
import { ActionIcon } from "@mantine/core";
import {
  IconArrowBigDownFilled,
  IconArrowBigUpFilled,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export const ReviewVoterReadonlyButtonLayout = ({ children }: any) => {
  const navigate = useNavigate();

  const handleNavigateToSignIn = () => {
    navigate("/sign-in");
  };

  return (
    <>
      <ActionIcon onClick={handleNavigateToSignIn}>
        <I I={IconArrowBigUpFilled} />
      </ActionIcon>
      {children}
      <ActionIcon onClick={handleNavigateToSignIn}>
        <I I={IconArrowBigDownFilled} />
      </ActionIcon>
    </>
  );
};
