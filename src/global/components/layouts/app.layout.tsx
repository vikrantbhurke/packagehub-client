import { AppShell } from "@mantine/core";
import { HeaderLayout, AsideLayout, MainLayout, FooterLayout } from "./index";
import {
  layoutCompHeight,
  getAppShellStyles,
  responsiveBreakpoint,
} from "@/global/styles/global.styles";
import {
  noBorderStyle,
  oneTxOneBgStyle,
  oneTxTwoBgStyle,
} from "@/global/styles/app.css";
import { useViewInfo } from "@/global/hooks";
import { useSelector } from "react-redux";

export const AppLayout = () => {
  useViewInfo();
  const { isMobile } = useSelector((state: any) => state.view);
  const { header, footer } = getAppShellStyles(
    isMobile,
    layoutCompHeight,
    layoutCompHeight
  );

  return (
    <AppShell
      header={header}
      footer={footer}
      className={`${oneTxTwoBgStyle}`}
      p={0}>
      <AppShell.Header
        visibleFrom={responsiveBreakpoint}
        style={{ zIndex: 2 }}
        className={`${`${oneTxTwoBgStyle} ${noBorderStyle}`}`}>
        <HeaderLayout />
      </AppShell.Header>

      <AppShell.Header
        hiddenFrom={responsiveBreakpoint}
        style={{ zIndex: 2 }}
        className={`${oneTxOneBgStyle} ${noBorderStyle}`}>
        <HeaderLayout />
      </AppShell.Header>

      <AppShell.Aside className={`${oneTxTwoBgStyle} ${noBorderStyle}`}>
        <AsideLayout />
      </AppShell.Aside>

      <AppShell.Main
        className={`${oneTxTwoBgStyle} ${noBorderStyle}`}
        h="100vh">
        <MainLayout />
      </AppShell.Main>

      <AppShell.Footer
        style={{ zIndex: 2 }}
        className={`${oneTxOneBgStyle} ${noBorderStyle}`}
        hiddenFrom={responsiveBreakpoint}>
        <FooterLayout />
      </AppShell.Footer>
    </AppShell>
  );
};
