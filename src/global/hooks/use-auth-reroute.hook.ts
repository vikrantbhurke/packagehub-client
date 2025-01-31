import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../states/store";

export const useAuthReroute = () => {
  const navigate = useNavigate();
  const { auth } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (auth.id) navigate("/");
  }, [auth, navigate]);
};
