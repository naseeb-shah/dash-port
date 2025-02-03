import { Box, Typography, Button, Modal, TextField } from "@mui/material";
// import { textStyle } from "../components/Navbar";
import { ReactComponent as Arrow } from "../assets/images/arrow.svg";
import { ReactComponent as Log } from "../assets/images/play.svg";
import { ReactComponent as Asterik } from "../assets/images/as.svg";


import { useState } from "react";
import RoleList from "../components/List";



export const Home = () => {
  const [content,setContent]=useState<null|[]>(null)
  return (
    <Box >
      <Box
        paddingTop={"0px"}
        width={"1280px"}
        margin={"auto"}
   
        
        sx={{
          boxSizing: "border-box",
          paddingTop: { xs: "76px", lg: "12px", md: "12px" },
          width: { xs: "356px", lg: "1440px", md: "1280px" ,sm:"1024px"},
          margin: { xs: "auto", lg: "auto", md: "auto" },
          paddingBottom: { xs: "40px", lg: "80px", md: "80px" },
        }}
      >
      
<RoleList />
        
      </Box>
   
    </Box>
  );
};
