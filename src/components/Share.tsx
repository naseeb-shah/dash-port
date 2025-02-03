import React, { useEffect, useState } from "react";
import {
  Modal,
  Typography,
  TextField,
  Chip,
  Box,
  Button,
  Grid,
} from "@mui/material";
import { API } from "../utilis/api";
import { APIUrls } from "../utilis/urls";

interface EmailInputModalProps {
  open: boolean;
  onClose: () => void;
  item: any;
}

const EmailInputModal: React.FC<EmailInputModalProps> = ({
  open,
  onClose,
  item,
}) => {
  const [emails, setEmails] = useState<string[]>([]); // List of valid emails
  const [inputValue, setInputValue] = useState<string>(""); // Current input value
  const [error, setError] = useState<string>(""); // Validation error message

  // Email validation regex
  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
    setError(""); // Clear error on input change
  };

  // Handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
      const email = inputValue.trim();

      if (email && validateEmail(email)) {
        if (!emails.includes(email)) {
          setEmails([...emails, email]); // Add email to the list
          setInputValue(""); // Clear input field
        } else {
          setError("Email already added.");
        }
      } else {
        setError("Please enter a valid email address.");
      }
    }
  };
  useEffect(() => {
    if (item?.share) {
      setEmails(item.share);
    } else {
      setEmails([]);
    }
  }, [item]);
  // Handle chip delete
  const handleDeleteEmail = (emailToDelete: string): void => {
    setEmails(emails.filter((email) => email !== emailToDelete));
  };

  const handleSubmit = async () => {
    try {
      const response: any = await API.postData(
        APIUrls.baseUrl + `/request/share`,
        {
          emails,
          id: item?._id?.toString(),
        }
      )
        .then((x: any) => {
          console.log(x, "response");
        })
        .catch((e: any) => {
          console.error(e);
        });
    } catch (e) {}
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" fontWeight={"600"}>
          Request Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography fontSize={"20px"}>Name : {item.fullName}</Typography>
            <Typography>Role : {item.role}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography fontSize={"20px"}>
              {" "}
              Organization : {item.organization}
            </Typography>
            <Typography>{new Date(item.createdAt).toDateString()}</Typography>
          </Grid>
        </Grid>
        <Typography variant="h6">Enter Email Addresses</Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 0.5,
            mb: 1,
            marginTop: "8px",
          }}
        >
          {emails.map((email) => (
            <Chip
              key={email}
              label={email}
              onDelete={() => handleDeleteEmail(email)}
            />
          ))}
        </Box>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Enter email and press Enter"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          error={!!error}
          helperText={error}
        />

        <Box display={"flex"} width={"100%"} justifyContent={"flex-end"}>
          <Button
            variant="contained"
            color="warning"
            sx={{ marginTop: "16px", marginRight: "16px" }}
            onClick={() => onClose()}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="success"
            sx={{ marginTop: "16px" }}
            onClick={() => handleSubmit()}
          >
            Share
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EmailInputModal;
