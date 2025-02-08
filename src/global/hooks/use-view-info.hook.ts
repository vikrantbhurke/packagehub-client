import { useViewportSize } from "@mantine/hooks";
import { Breakpoint } from "../enums";
import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { setIsMobile, setWidth } from "../states/view.slice";

export const useViewInfo = () => {
  const dispatch = useDispatch();
  const { width } = useViewportSize();

  useLayoutEffect(() => {
    if (width < Breakpoint.sm) dispatch(setIsMobile(true));
    else dispatch(setIsMobile(false));
    dispatch(setWidth(width));
  }, [width]);
};
