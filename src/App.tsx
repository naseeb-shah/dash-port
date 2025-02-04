import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route ,Navigate} from "react-router-dom";
import Navbar from "./components/Navbar";
import { Home } from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PrivateRoute from "./pages/PrivateRoute"; // Import the PrivateRoute component
import { DownloadRequests } from "./pages/Download";
import  Settings from "./pages/Settings";


const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0, // Extra small devices (mobile)
      sm: 480, // Small devices (tablets)
      md: 1280, // Medium devices (laptops)
      lg: 1440, // Large devices (desktops)
      xl: 2560, // Extra large devices
    },
  },
  typography: {
    fontFamily: [
      "Matter-TRIAL" // Custom font
     
    ].join(","),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <Routes>
          {/* Public route for authentication */}
          <Route path="/auth" element={<Auth />} />

          {/* Private routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/download" element={<DownloadRequests />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          {/* Redirect all other routes to /auth */}
          <Route path="*" element={<Navigate to="/auth" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;