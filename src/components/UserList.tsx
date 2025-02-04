import { Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { API } from "../utilis/api";
import { APIUrls } from "../utilis/urls";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

interface User {
  email: string;
  active?: boolean;
  otpExpires?: string;
}


export const UserList: React.FC = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });


  useEffect(() => {
    setLoading(true)
    API.getData(APIUrls.authUrl + "/all-user")
      .then((response) => {
        setUserData(response);
        setLoading(false)
      })
      .catch((e) => {
        console.error(e?.data?.massage);
        setLoading(false)
      });
  }, []);
  const toggleStatus = (index: number) => {
    const updatedUsers:any = [...userData];
    updatedUsers[index].active = !updatedUsers[index].active;
    setUserData(updatedUsers);
  };

  const viewDetails = (user: User) => {
    console.log("User Details:", { email: user.email, active: user.active, otpExpires: user.otpExpires });
  };
  return   <TableContainer component={Paper} sx={{
    marginLeft:'24px',minHeight:size.height
  }}>


   {loading?  <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          margin:"auto",
          marginTop:"100px",
          marginBottom:"100px"
        }}
      >
        <CircularProgress size={54} color="info" />
      </Box>:
  <Table>
    <TableHead>
      <TableRow>
        <TableCell><b>Email</b></TableCell>
        <TableCell><b>Status</b></TableCell>
        <TableCell><b>OTP Expiry</b></TableCell>
        <TableCell><b>Actions</b></TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {userData.map((user:any, index) => (
        <TableRow key={index}>
          <TableCell>{user.email}</TableCell>
          <TableCell>{user.active ? "Active ✅" : "Inactive ❌"}</TableCell>
          <TableCell>{user.otpExpires ? new Date(user.otpExpires).toLocaleString() : "N/A"}</TableCell>
          <TableCell>
            <Button variant="contained" color={user.active ? "secondary" : "primary"} onClick={() => toggleStatus(index)}>
              {user.active ? "Deactivate" : "Activate"}
            </Button>
            
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>}
</TableContainer>
};
