import React, { useState } from "react";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { API } from "../utilis/api";
import { APIUrls } from "../utilis/urls";

type SetLoading = React.Dispatch<React.SetStateAction<boolean>>;

interface StatusSelectProps {
  initialStatus?: string;
  id: string;
  setLoading: SetLoading;
  fetchRequests: () => Promise<void>;
}

const StatusSelect: React.FC<StatusSelectProps> = ({
  initialStatus = "New",
  setLoading,
  id,
  fetchRequests,
}) => {
  const [status, setStatus] = useState<string>(initialStatus);

  const handleChange = async (event: SelectChangeEvent<string>) => {
    try {
      setLoading(true);
      const status = event.target.value;
      const response: any = await API.getData(
        APIUrls.baseUrl + `/request/status/${id}/${status}`
      );

      fetchRequests();
    } catch (error) {
      console.error("Error fetching requests", error);
      setLoading(false);
    }
  };

  return (
    <Select value={status} onChange={handleChange} variant="outlined">
      <MenuItem value="New">New</MenuItem>
      <MenuItem value="Progress">Progress</MenuItem>
      <MenuItem value="Closed">Closed</MenuItem>
    </Select>
  );
};

export default StatusSelect;
