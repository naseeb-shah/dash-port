import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  InputAdornment,
  Pagination,
  Grid,
  Box,
  Modal,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { API } from "../utilis/api";
import { APIUrls } from "../utilis/urls";
import { FileDownload } from "@mui/icons-material";
import EmailInputModal from "./Share";
import StatusSelect from "./Status";
import { exportToExcel } from "../utilis/xl";
interface RequestListProps {
  from?: string;
}

const RequestList: React.FC<RequestListProps> = ({ from }) => {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchCriteria, setSearchCriteria] = useState<string>("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [forward, setForward] = useState(false);
  const [itemToForward, setItemToForward] = useState(null);
  const onClose = () => {
    setForward(false);
  };

  const handleForward = (item: any) => {
    setItemToForward(item);
    setForward(true);
  };

  const fetchRequests = async (page: number) => {
    setLoading(true);
    try {
      const response: any = await API.getData(
        APIUrls.baseUrl +
          `/request/${
            from != "download" ? "search" : "search-download"
          }?search=${searchQuery}&page=${page}&startDate=${startDate}&endDate=${endDate}&by=${searchCriteria}`
      );

      setRequests(response.data);
      setTotalPages(response.pagination.totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching requests", error);
      setLoading(false);
    }
  };

  const DownloadExcel = async () => {
    setLoading(true);
   exportToExcel(requests,"Requests")
   setLoading(false)
  };
  

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchCriteriaChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSearchCriteria(event.target.value as string);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };
  const handleSearch = () => {
    fetchRequests(page);
  };
  const handleDateSearch = () => {
    fetchRequests(page);
  };
  useEffect(() => {
    fetchRequests(page);
  }, [page]);

  return (
    <Paper
      sx={{ width: "100%", maxWidth: "1960px", margin: "auto", padding: 2 }}
    >
      {from == "download" ? (
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          marginTop={"16x"}
          marginBottom={"16px"}
        >
          <Typography fontWeight={"700"} fontSize={"34px"} color="info" fontFamily={"Matter-TRIAL"}>
            Download
          </Typography>
          <Button
            variant="contained"
            color="info"
            startIcon={<FileDownload />}
            onClick={() => DownloadExcel()}
            
            sx={{
              height: "54px",
              fontFamily:"Matter-TRIAL"
            }}
          >
            Download Excel : {requests.length}
          </Button>
        </Box>
      ) : (
        <Typography variant="h6" gutterBottom fontFamily={"Matter-TRIAL"}>
          User Requests
        </Typography>
      )}

      {/* Search Bar and Criteria */}
      <TextField
        label={"Search"}
        sx={{ width: "300px", margin: "8px" }}
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <FormControl>
        <InputLabel id="demo-simple-select-label">By</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={searchCriteria}
          label="Age"
          sx={{ width: "300px", margin: "8px", fontFamily:"Matter-TRIAL" }}
          onChange={(e) => setSearchCriteria(e.target.value)}
        >
          <MenuItem value={"fullName"}>Person Name</MenuItem>
          <MenuItem value={"workEmail"}>Email</MenuItem>
          <MenuItem value={"organization"}>Organization</MenuItem>
          <MenuItem value={"role"}>Role</MenuItem>
          <MenuItem value={"all"}>All</MenuItem>
        </Select>
      </FormControl>

      <TextField
        type={"date"}
        placeholder="Start Date"
        onChange={(e) => setStartDate(e.target.value)}
        sx={{ width: "300px", margin: "8px" }}
      />
      <TextField
        type={"date"}
        placeholder="End Date"
        onChange={(e) => setEndDate(e.target.value)}
        sx={{ width: "300px", margin: "8px" }}
      />

      <Button
        variant="contained"
        sx={{ width: "150px", height: "55px", fontSize: "20px", margin: "8px" }}
        onClick={() => fetchRequests(page)}
      >
        Search
      </Button>

      {itemToForward && (
        <EmailInputModal
          open={forward}
          onClose={onClose}
          item={itemToForward}
        />
      )}

      {/* Request List */}
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <List>
          {requests.map((request: any) => (
            <ListItem
              key={request._id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                "&:hover": {
                  backgroundColor: "lightblue", // Changes background on hover
                },
              }}
            >
              <ListItemText
                primary={request.fullName}
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {request.organization} - {request.workEmail}
                    </Typography>
                    <br />
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.secondary"
                    >
                      Role: {request.role}
                    </Typography>
                    <br />
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.secondary"
                    >
                      Message: {request.message}
                    </Typography>
                  </>
                }
              />

            
             <StatusSelect setLoading={setLoading} fetchRequests={()=>fetchRequests(page)}  initialStatus={request.status} id={request._id}/>
              <Chip
                label={request.status}
                color={
                  request.status == "New"
                    ? "primary"
                    : request.status == "Progress"
                    ? "secondary"
                    : "error"
                }
                sx={{ marginLeft: 2 }}
              />
                {from != "download" && (
                <Button
                  variant="outlined"
                  color="info"
                  sx={{ marginRight: 2 ,marginLeft:2}}
                  onClick={() => handleForward(request)}
                >
                  Froward
                </Button>
              )}
            </ListItem>
          ))}
        </List>
      )}

      {/* Pagination */}
      {from != "download" && (
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
          sx={{ marginTop: 2, display: "flex", justifyContent: "center" }}
        />
      )}
    </Paper>
  );
};

export default RequestList;
