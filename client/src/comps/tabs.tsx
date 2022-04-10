import React from "react";
import { Box, Tab, TabProps } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

interface ITabsProps {
  items: Array<{
    props: TabProps;
    component: React.ReactNode;
  }>;
}

export const Tabs = ({ items }: ITabsProps) => {
  const [value, setValue] = React.useState("");

  return (
    <TabContext value={value}>
      <Box width="100%" sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TabList
          centered
          sx={{ mb: { xs: 0, md: 4 } }}
          onChange={(e, newValue) => setValue(newValue)}
        >
          {items.map(({ props }) => (
            <Tab {...props} />
          ))}
        </TabList>
      </Box>
      {items.map(({ props: { value }, component }) => (
        <TabPanel value={value}>{component}</TabPanel>
      ))}
    </TabContext>
  );
};
