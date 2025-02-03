import {
  Box
} from "@mui/material";
// import { textStyle } from "../components/Navbar";

import RoleList from "../components/List";


export const DownloadRequests = () => {
  return (
    <Box>
      <Box
        paddingTop={"0px"}
        width={"1280px"}
        margin={"auto"}
        sx={{
          boxSizing: "border-box",
          paddingTop: { xs: "76px", lg: "12px", md: "12px" },
          width: { xs: "356px", lg: "1440px", md: "1280px", sm: "1024px" },
          margin: { xs: "auto", lg: "auto", md: "auto" },
          paddingBottom: { xs: "40px", lg: "80px", md: "80px" },
        }}
      >
       
        <RoleList from="download" />
      </Box>
    </Box>
  );
};
