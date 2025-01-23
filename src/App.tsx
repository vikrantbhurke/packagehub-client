import "./App.css";
import "@mantine/dates/styles.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Notifications } from "@mantine/notifications";
import { resolveCssVariables } from "@/global/styles/css.variables";
import { theme } from "@/global/styles/theme";
import { Router } from "@/global/routes";
import { store } from "@/global/states/store";
import { configureAxios } from "@/global/networks";

export const queryClient = new QueryClient();
configureAxios();
// App entry point
const App = () => {
  return (
    <HelmetProvider>
      <Provider store={store}>
        <ColorSchemeScript defaultColorScheme="dark" />
        <MantineProvider
          theme={theme}
          defaultColorScheme="dark"
          cssVariablesResolver={resolveCssVariables}>
          <QueryClientProvider client={queryClient}>
            <Notifications />
            <Router />
          </QueryClientProvider>
        </MantineProvider>
      </Provider>
    </HelmetProvider>
  );
};

export default App;
