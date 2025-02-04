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

type SetValue = React.Dispatch<React.SetStateAction<number>>;

interface OTPFormProps {
  setValue: SetValue;
}

const OTPForm: React.FC<OTPFormProps> = ({ setValue }) => {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [step, setStep] = useState<"send" | "verify">("send");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSendOTP = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await API.postData(APIUrls.authUrl + "/create-user", { email })
        .then((e) => {
          setSuccess(e?.data?.massage);
          setStep("verify");
        })
        .catch((e) => {
          throw e;
        });
      // setSuccess("OTP sent successfully. Check your email.");
    } catch (err: any) {
      console.log(err, "err is here");
      setError(err?.data?.message || "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response: any = await API.postData(
        APIUrls.authUrl + "/create-user/verify-otp",
        { email, otp }
      );
      setSuccess(response.data.message);
      setValue(1);
    } catch (err: any) {
      setError(
        err?.data?.message || "Invalid or expired OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        marginTop: "32px",
        display: "flex",
        flexDirection: "column",
        width: "90%",
        alignItems: "left",
        backgroundColor: "white",
        padding: 4,
        borderRadius: 2,
        margin: "auto",
        maxWidth: "1280px",
        minHeight:size.height
      }}
    >
      <Typography
        fontSize={"22px"}
        sx={{ color: "#1976D2", mb: 1, fontWeight: 800 }}
      >
        Create New user
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

      {false ? (
        <>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 3, maxWidth: "400px" }}
            required
          />
          <Button
            variant="contained"
            onClick={handleSendOTP}
            disabled={loading}
            sx={{
              backgroundColor: "#1976D2",
              color: "white",
              maxWidth: "400px",
            }}
          >
            {loading ? <CircularProgress size={24} /> : "Send OTP"}
          </Button>
        </>
      ) : (
        <>
          <TextField            fullWidth
            label="OTP"
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            sx={{ mb: 3  ,maxWidth: "400px"}}
            required
          />
          <Button
            
            variant="contained"
            onClick={handleVerifyOTP}
            disabled={loading}
            sx={{ backgroundColor: "#1976D2", color: "white" , maxWidth: "400px"}}
          >
            {loading ? <CircularProgress size={24} /> : "Verify OTP"}
          </Button>
        </>
      )}
    </Box>
  );
};

export default OTPForm;
