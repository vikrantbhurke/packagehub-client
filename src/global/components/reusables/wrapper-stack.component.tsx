import { forwardRef } from "react";
import { Stack, StackProps } from "@mantine/core";
import { responsiveBreakpoint as rb } from "@/global/styles/global.styles";

interface WrapperStackComponentProps extends StackProps {
  mobP?: number;
  deskP?: number;
}

export const WrapperStackComponent = forwardRef<
  HTMLDivElement,
  WrapperStackComponentProps
>(({ mobP = 0, deskP = 8, ...props }, ref) => {
  return (
    <>
      <Stack {...props} ref={ref} p={mobP} hiddenFrom={rb} />
      <Stack {...props} ref={ref} p={deskP} visibleFrom={rb} />
    </>
  );
});

WrapperStackComponent.displayName = "WrapperStackComponent";
