import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import axios from "axios";
import { API } from "../utilis/api";
import { APIUrls } from "../utilis/urls";
import { useNavigate } from "react-router-dom";

const OTPForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [step, setStep] = useState<"send" | "verify">("send");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate=useNavigate()

  const handleSendOTP = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await API.postData(APIUrls.authUrl+"/send-otp", { email });
      setSuccess("OTP sent successfully. Check your email.");
      setStep("verify");
    } catch (err:any) {
        console.log(err,"err is here")
      setError(err?.data?.message||"Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response :any= await axios.post(APIUrls.authUrl+"/verify-otp", { email, otp });
      setSuccess(response.data.message);
      localStorage.setItem("token",response.data.token)
      navigate("/")
      // Optionally, you can redirect the user or store the token in localStorage
    } catch (err:any) {
      setError(err?.data?.message||"Invalid or expired OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "white",
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" component="h1" sx={{ color: "#1976D2", mb: 4 }}>
          OTP Verification
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ width: "100%", mb: 2 }}>
            {success}
          </Alert>
        )}

        {step === "send" ? (
          <>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 3 }}
              required
            />
            <Button
              fullWidth
              variant="contained"
              onClick={handleSendOTP}
              disabled={loading}
              sx={{ backgroundColor: "#1976D2", color: "white" }}
            >
              {loading ? <CircularProgress size={24} /> : "Send OTP"}
            </Button>
          </>
        ) : (
          <>
            <TextField
              fullWidth
              label="OTP"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              sx={{ mb: 3 }}
              required
            />
            <Button
              fullWidth
              variant="contained"
              onClick={handleVerifyOTP}
              disabled={loading}
              sx={{ backgroundColor: "#1976D2", color: "white" }}
            >
              {loading ? <CircularProgress size={24} /> : "Verify OTP"}
            </Button>
          </>
        )}
      </Box>
    </Container>
  );
};

export default OTPForm;