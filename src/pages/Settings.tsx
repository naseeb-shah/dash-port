import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CreateNewUser from "../components/CreateNewUser";
import { UserList } from "../components/UserList";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      style={{
        flexGrow: 1,
        width: "100%",
        display: value === index ? "flex" : "none",
      }}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        paddingTop: "48px",
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{
          borderRight: 1,
          borderColor: "divider",
          width: "200px",
          "& .Mui-selected": {
          // Success color for the active tab
           
          },
        }}
      >
        <Tab label="Create User" {...a11yProps(0)} />
        <Tab label="Users List" {...a11yProps(1)} />
        
      </Tabs>
      <TabPanel value={value} index={0}>
        <CreateNewUser setValue={setValue} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <UserList />
      </TabPanel>
   
    </Box>
  );
}
