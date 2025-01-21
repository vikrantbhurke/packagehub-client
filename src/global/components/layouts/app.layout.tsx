import { AppShell } from "@mantine/core";
import { HeaderLayout, AsideLayout, MainLayout, FooterLayout } from "./index";
import {
  footerHeight,
  getAppShell,
  headerHeight,
  responsiveBreakpoint,
} from "@/global/styles/global.styles";
import { noBorder, oneTxOneBg, oneTxTwoBg } from "@/global/styles/app.css";
import { useViewInfo } from "@/global/hooks";
import { useSelector } from "react-redux";

export const AppLayout = () => {
  useViewInfo();
  const { isMobile } = useSelector((state: any) => state.view);
  const { header, footer } = getAppShell(isMobile, footerHeight, headerHeight);

  return (
    <AppShell header={header} footer={footer} className={`${oneTxTwoBg}`} p={0}>
      <AppShell.Header
        visibleFrom={responsiveBreakpoint}
        style={{ zIndex: 2 }}
        className={`${`${oneTxTwoBg} ${noBorder}`}`}>
        <HeaderLayout />
      </AppShell.Header>

      <AppShell.Header
        hiddenFrom={responsiveBreakpoint}
        style={{ zIndex: 2 }}
        className={`${oneTxOneBg} ${noBorder}`}>
        <HeaderLayout />
      </AppShell.Header>

      <AppShell.Aside className={`${oneTxTwoBg} ${noBorder}`}>
        <AsideLayout />
      </AppShell.Aside>

      <AppShell.Main className={`${oneTxTwoBg} ${noBorder}`} h="100vh">
        <MainLayout />
      </AppShell.Main>

      <AppShell.Footer
        style={{ zIndex: 2 }}
        className={`${oneTxOneBg} ${noBorder}`}
        hiddenFrom={responsiveBreakpoint}>
        <FooterLayout />
      </AppShell.Footer>
    </AppShell>
  );
};
