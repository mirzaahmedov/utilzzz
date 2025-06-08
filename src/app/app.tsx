import "./index.css";
import '@ant-design/v5-patch-for-react-19';

import { App as AntdApp, ConfigProvider, theme as antdTheme } from "antd";

import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@/features/theme/provider";
import { router } from "./router";
import { useThemeStore } from "@/features/theme/store";

const App = () => {
  const theme = useThemeStore(store => store.theme);

  return (
    <ConfigProvider
      theme={{
        algorithm:
          theme === "dark"
            ? antdTheme.darkAlgorithm
            : antdTheme.defaultAlgorithm,
        token: {
          colorPrimary: "#268bd2",
          colorText: theme === "dark" ? "#93a1a1" : "#586e75",
          colorBgElevated: theme === "dark" ? "#073642" : "#eee8d5",
          colorBgContainer: theme === "dark" ? "#002b36" : "#fdf6e3",
        },
      }}
    >
      <AntdApp className="h-full">
        <RouterProvider router={router} />
        <ThemeProvider />
      </AntdApp>
    </ConfigProvider>
  );
};

export default App;
