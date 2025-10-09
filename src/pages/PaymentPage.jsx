import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../App";
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  Alert,
  Divider,
  IconButton,
  InputAdornment,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SecurityIcon from "@mui/icons-material/Security";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";

const PaymentPage = () => {
  const navigate = useNavigate();
  const { logout, isAuthenticated, login } = useAuth();

  // Check for concierge details from previous flow
  const conciergeDetails = JSON.parse(
    sessionStorage.getItem("conciergeDetails") || "{}"
  );
  const selectedModel = sessionStorage.getItem("selectedModel") || "Taycan";
  const serviceType = sessionStorage.getItem("serviceType") || "centre";
  const isConciergeService =
    serviceType === "concierge" && Object.keys(conciergeDetails).length > 0;

  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvc: "",
    cardholderName: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(!isAuthenticated);
  const [loginData, setLoginData] = useState({
    porscheId: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");

  // Show login dialog if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      setShowLoginDialog(true);
    }
  }, [isAuthenticated]);

  const handleLoginInputChange = (field) => (event) => {
    setLoginData({
      ...loginData,
      [field]: event.target.value,
    });
    setLoginError(""); // Clear error on input
  };

  const handleLogin = () => {
    // Simple validation for demo purposes
    if (!loginData.porscheId || !loginData.password) {
      setLoginError("Please enter both Porsche ID and password");
      return;
    }

    // Simulate login - in production this would be an API call
    if (loginData.password.length >= 6) {
      login();
      setShowLoginDialog(false);
      setLoginError("");
    } else {
      setLoginError("Invalid credentials. Please try again.");
    }
  };

  const handleCancelLogin = () => {
    // Return to previous page if user cancels login
    navigate(-1);
  };

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handlePayment = () => {
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      
      // Navigate to booking confirmation page
      navigate("/booking-confirmation");
    }, 3000);
  };

  const handleReturnHome = () => {
    // Clear session storage
    sessionStorage.removeItem("conciergeDetails");
    sessionStorage.removeItem("selectedModel");
    logout(); // Clear authentication
    navigate("/");
  };

  const isFormValid = () => {
    const { cardNumber, expiryDate, cvc, cardholderName } = formData;
    return cardNumber && expiryDate && cvc && cardholderName;
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#F8F9FA" }}>
      <Navbar />

      {/* Porsche ID Login Dialog */}
      <Dialog 
        open={showLoginDialog} 
        onClose={() => {}} 
        maxWidth="sm" 
        fullWidth
        disableEscapeKeyDown
      >
        <DialogTitle>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <LockIcon sx={{ color: "#CC0000", fontSize: 32 }} />
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                Porsche ID Verification
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Please sign in to continue with payment
              </Typography>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Porsche ID (Email)"
              value={loginData.porscheId}
              onChange={handleLoginInputChange("porscheId")}
              placeholder="your.email@example.com"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: "#CC0000" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#CC0000",
                },
              }}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={loginData.password}
              onChange={handleLoginInputChange("password")}
              placeholder="Enter your password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: "#CC0000" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#CC0000",
                },
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleLogin();
              }}
            />
            {loginError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {loginError}
              </Alert>
            )}
            <Typography variant="caption" color="text.secondary">
              Your Porsche ID ensures secure access to your booking and payment information.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={handleCancelLogin} sx={{ color: "text.secondary" }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleLogin}
            disabled={!loginData.porscheId || !loginData.password}
            sx={{
              bgcolor: "#CC0000",
              "&:hover": { bgcolor: "#A00000" },
              px: 4,
            }}
          >
            Sign In
          </Button>
        </DialogActions>
      </Dialog>

      <Container maxWidth="md" sx={{ pt: 12, pb: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
            <IconButton
              onClick={handleReturnHome}
              sx={{ mr: 2, color: "#CC0000" }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: "black",
              }}
            >
              Complete Your Booking
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {/* Payment Form */}
            <Grid
              size={{
                xs: 12,
                md: 8,
              }}
            >
              <Paper
                elevation={8}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    mb: 3,
                    color: "black",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <CreditCardIcon sx={{ color: "#CC0000" }} />
                  Payment Details
                </Typography>

                <Alert
                  severity="info"
                  sx={{
                    mb: 4,
                    bgcolor: "rgba(204, 0, 0, 0.05)",
                    border: "1px solid rgba(204, 0, 0, 0.2)",
                    "& .MuiAlert-icon": {
                      color: "#CC0000",
                    },
                  }}
                >
                  <Typography variant="body2">
                    <strong>{isConciergeService ? "Concierge Service Fee: $500" : "Refundable Deposit: $500"}</strong>
                    <br />
                    {isConciergeService 
                      ? "This service fee is fully refundable with vehicle purchase."
                      : "This deposit secures your test drive and will be refunded within 3-5 business days."}
                  </Typography>
                </Alert>

                <Grid container spacing={3}>
                  <Grid size={12}>
                    <TextField
                      fullWidth
                      label="Cardholder Name"
                      value={formData.cardholderName}
                      onChange={handleInputChange("cardholderName")}
                      placeholder="John Doe"
                      sx={{
                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                          {
                            borderColor: "#CC0000",
                          },
                      }}
                    />
                  </Grid>

                  <Grid size={12}>
                    <TextField
                      fullWidth
                      label="Card Number"
                      value={formData.cardNumber}
                      onChange={handleInputChange("cardNumber")}
                      placeholder="4532 1234 5678 9012"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CreditCardIcon sx={{ color: "#CC0000" }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                          {
                            borderColor: "#CC0000",
                          },
                      }}
                    />
                  </Grid>

                  <Grid size={6}>
                    <TextField
                      fullWidth
                      label="Expiry Date"
                      value={formData.expiryDate}
                      onChange={handleInputChange("expiryDate")}
                      placeholder="12/28"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CalendarTodayIcon sx={{ color: "#CC0000" }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                          {
                            borderColor: "#CC0000",
                          },
                      }}
                    />
                  </Grid>

                  <Grid size={6}>
                    <TextField
                      fullWidth
                      label="CVC"
                      value={formData.cvc}
                      onChange={handleInputChange("cvc")}
                      placeholder="123"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SecurityIcon sx={{ color: "#CC0000" }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                          {
                            borderColor: "#CC0000",
                          },
                      }}
                    />
                  </Grid>
                </Grid>

                <Box sx={{ mt: 4 }}>
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={handlePayment}
                    disabled={!isFormValid() || isProcessing}
                    sx={{
                      bgcolor: "#CC0000",
                      py: 2,
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      "&:hover": { bgcolor: "#AA0000" },
                      "&:disabled": {
                        bgcolor: "rgba(0, 0, 0, 0.12)",
                        color: "rgba(0, 0, 0, 0.26)",
                      },
                    }}
                  >
                    {isProcessing
                      ? "Processing Payment..."
                      : `Confirm Payment ($${
                          isConciergeService ? "700" : "500"
                        })`}
                  </Button>
                </Box>
              </Paper>
            </Grid>

            {/* Order Summary */}
            <Grid
              size={{
                xs: 12,
                md: 4,
              }}
            >
              <Paper
                elevation={4}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  bgcolor: "rgba(204, 0, 0, 0.02)",
                  border: "1px solid rgba(204, 0, 0, 0.1)",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, mb: 3, color: "black" }}
                >
                  Booking Summary
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Vehicle:
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    Porsche {selectedModel}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Service:
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {isConciergeService ? "Concierge Delivery" : "Centre Visit"}
                  </Typography>
                </Box>

                {isConciergeService && conciergeDetails.deliveryDate && (
                  <>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Delivery Address:
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {conciergeDetails.streetAddress},{" "}
                        {conciergeDetails.suburb}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {conciergeDetails.state} {conciergeDetails.postcode}
                      </Typography>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Date & Time:
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {new Date(
                          conciergeDetails.deliveryDate
                        ).toLocaleDateString()}
                        , {conciergeDetails.deliveryTime}
                      </Typography>
                    </Box>
                  </>
                )}

                {!isConciergeService && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Date & Time:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      As scheduled in chat
                    </Typography>
                  </Box>
                )}

                <Divider sx={{ my: 2 }} />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {isConciergeService ? "Service Fee:" : "Deposit:"}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, color: "#CC0000" }}
                  >
                    $500
                  </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Total:
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, color: "#CC0000" }}
                  >
                    $500
                  </Typography>
                </Box>

                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ mt: 1, display: "block" }}
                >
                  Fully refundable with vehicle purchase
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default PaymentPage;
