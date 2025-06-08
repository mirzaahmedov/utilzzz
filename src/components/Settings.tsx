import { Flex, InputNumber, Typography } from "antd";

import { useSettingsStore } from "@/features/settings/store";

export const Settings = () => {
  const { fontSize, setSettings } = useSettingsStore();
  return (
    <div className="w-full max-w-md">
      <Typography.Title level={5}>Settings</Typography.Title>
      <Flex
        align="center"
        justify="space-between"
        gap={10}
      >
        <label>Font Size</label>
        <InputNumber
          value={fontSize}
          onChange={value => setSettings({ fontSize: value ?? 16 })}
        />
      </Flex>
    </div>
  );
};
