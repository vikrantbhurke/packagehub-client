import { I } from "@/global/components/reusables";
import { fiveTx } from "@/global/styles/app.css";
import { ActionIcon } from "@mantine/core";
import {
  IconArrowBigDownFilled,
  IconArrowBigUpFilled,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export const ReviewVoterReadonlyButton = ({ children }: any) => {
  const navigate = useNavigate();

  const handleNavigateToSignIn = () => {
    navigate("/sign-in");
  };

  return (
    <>
      <ActionIcon c={fiveTx} onClick={handleNavigateToSignIn}>
        <I I={IconArrowBigUpFilled} />
      </ActionIcon>
      {children}
      <ActionIcon c={fiveTx} onClick={handleNavigateToSignIn}>
        <I I={IconArrowBigDownFilled} />
      </ActionIcon>
    </>
  );
};
