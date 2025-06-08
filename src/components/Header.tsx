import { Button, Flex, Popover, Switch, Typography } from "antd";
import { MoonFilled, SettingOutlined, SunFilled } from "@ant-design/icons";

import { Settings } from "./Settings";
import { useThemeStore } from "@/features/theme/store";

export const Header = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <header className="border-b border-solarized-base2 dark:border-solarized-base02 p-4 flex items-center gap-10 bg-solarized-base3 dark:bg-solarized-base03">
      <Typography.Title
        level={4}
        className="font-normal font-display text-primary-gradient mb-0"
      >
        UTILZZZ.
      </Typography.Title>
      <div className="flex-1" />

      <Flex
        align="center"
        gap={10}
      >
        <Popover
          content={<Settings />}
          trigger="click"
          styles={{
            body: {
              width: 300,
            },
          }}
        >
          <Button
            variant="outlined"
            icon={<SettingOutlined />}
          />
        </Popover>
        <MoonFilled className="text-solarized-base0 block" />
        <Switch
          checked={theme === "dark"}
          onChange={checked => setTheme(checked ? "dark" : "light")}
        />
        <SunFilled className="text-solarized-base0 block" />
      </Flex>
    </header>
  );
};
