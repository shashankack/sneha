import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  TextField,
  Avatar,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  FormControlLabel,
  Checkbox,
  Alert,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  InputAdornment,
} from "@mui/material";
import { motion } from "framer-motion";
import { useBooking } from "../../contexts/BookingContext";
import { useAuth } from "../../App";
import { conciergeService } from "../../data/centers";

// Icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PaymentIcon from "@mui/icons-material/Payment";
import SecurityIcon from "@mui/icons-material/Security";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import PersonIcon from "@mui/icons-material/Person";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LockIcon from "@mui/icons-material/Lock";

const VerificationPaymentPage = ({ onFinish, onBack }) => {
  const {
    selectedModel,
    bookingType,
    selectedCenter,
    bookingDetails,
    userInfo,
    updateUserInfo,
    paymentInfo,
    updatePaymentInfo,
  } = useBooking();

  const { isAuthenticated, login } = useAuth();

  const [step, setStep] = useState(0); // 0: User Info, 1: Payment (if needed), 2: Review
  const [loading, setLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(!isAuthenticated);
  const [loginData, setLoginData] = useState({
    porscheId: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");

  // Ref for scrolling to review section
  const reviewSectionRef = useRef(null);

  // Show login dialog if not authenticated or when component first mounts (payment step requires fresh auth)
  useEffect(() => {
    if (!isAuthenticated) {
      setShowLoginDialog(true);
    }
  }, [isAuthenticated]);

  // Always show login dialog when this component first mounts (payment requires fresh authentication)
  useEffect(() => {
    setShowLoginDialog(true);
  }, []);

  // Scroll to review section when step changes to 1
  useEffect(() => {
    if (step === 1 && reviewSectionRef.current) {
      reviewSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [step]);

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

      // Pre-fill user's email from Porsche ID and basic info
      updateUserInfo({
        email: loginData.porscheId,
        name: "Porsche User", // Default name for demo
        phone: "+61 400 000 000", // Default phone for demo
      });

      setShowLoginDialog(false);
      setLoginError("");

      // Skip directly to appropriate step based on booking type
      if (bookingType === "concierge") {
        setStep(0); // Go to payment for concierge (was step 1)
      } else {
        setStep(1); // Skip to review for center visits (was step 2)
      }
    } else {
      setLoginError("Invalid credentials. Please try again.");
    }
  };

  const handleCancelLogin = () => {
    // Go back to previous step if user cancels login
    if (onBack) {
      onBack();
    }
  };

  const handlePaymentInfoChange = (field) => (event) => {
    updatePaymentInfo({ [field]: event.target.value });
  };

  const isPaymentInfoValid = () => {
    if (bookingType === "center") return true; // No payment needed for center visits
    return paymentInfo.cardNumber && paymentInfo.expiry && paymentInfo.cvc;
  };

  const handleSubmit = async () => {
    if (!agreedToTerms) return;

    setLoading(true);

    // Simulate booking process
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setLoading(false);
    setShowConfirmation(true);

    // Auto-redirect after showing confirmation
    setTimeout(() => {
      onFinish();
    }, 3000);
  };

  const formatDate = (date) => {
    if (!date) return "";
    return new Intl.DateTimeFormat("en-AU", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date));
  };

  const getStepContent = () => {
    switch (step) {
      case 0:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box sx={{ p: 4 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
                <Avatar sx={{ bgcolor: "#CC0000", mr: 3 }}>
                  <PaymentIcon />
                </Avatar>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    Payment Information
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Secure payment for your concierge service deposit
                  </Typography>
                </Box>
              </Box>

              <Alert severity="info" sx={{ mb: 4 }}>
                You're paying a refundable deposit of $
                {conciergeService.deposit}. This amount will be fully refunded
                when you purchase your Porsche.
              </Alert>

              <Grid container spacing={3}>
                <Grid
                  size={{
                    xs: 12,
                    md: 4,
                  }}
                >
                  <TextField
                    fullWidth
                    label="Card Number"
                    value={paymentInfo.cardNumber}
                    onChange={handlePaymentInfoChange("cardNumber")}
                    placeholder="1234 5678 9012 3456"
                    InputProps={{
                      startAdornment: (
                        <CreditCardIcon
                          sx={{ color: "text.secondary", mr: 1 }}
                        />
                      ),
                    }}
                  />
                </Grid>
                <Grid
                  size={{
                    xs: 12,
                    md: 4,
                  }}
                >
                  <TextField
                    fullWidth
                    label="Expiry Date"
                    value={paymentInfo.expiry}
                    onChange={handlePaymentInfoChange("expiry")}
                    placeholder="MM/YY"
                  />
                </Grid>
                <Grid
                  size={{
                    xs: 12,
                    md: 4,
                  }}
                >
                  <TextField
                    fullWidth
                    label="CVC"
                    value={paymentInfo.cvc}
                    onChange={handlePaymentInfoChange("cvc")}
                    placeholder="123"
                    InputProps={{
                      startAdornment: (
                        <SecurityIcon sx={{ color: "text.secondary", mr: 1 }} />
                      ),
                    }}
                  />
                </Grid>
              </Grid>

              <Box
                sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}
              >
                <Button
                  variant="outlined"
                  onClick={onBack}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderColor: "#CC0000",
                    color: "#CC0000",
                  }}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  onClick={() => setStep(1)}
                  disabled={!isPaymentInfoValid()}
                  sx={{
                    px: 4,
                    py: 1.5,
                    bgcolor: "#CC0000",
                    "&:hover": { bgcolor: "#B30000" },
                  }}
                >
                  Continue to Review
                </Button>
              </Box>
            </Box>
          </motion.div>
        );

      case 1:
        return (
          <motion.div
            ref={reviewSectionRef}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box sx={{ p: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 4 }}>
                Review Your Booking
              </Typography>

              {/* Booking Summary */}
              <Paper
                elevation={0}
                sx={{ p: 3, mb: 4, bgcolor: "rgba(248, 249, 250, 0.8)" }}
              >
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                  Booking Details
                </Typography>

                <List sx={{ py: 0 }}>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon>
                      <DirectionsCarIcon sx={{ color: "#CC0000" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Vehicle"
                      secondary={`${selectedModel?.name} - ${selectedModel?.title}`}
                    />
                  </ListItem>

                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon>
                      <CalendarTodayIcon sx={{ color: "#CC0000" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Date"
                      secondary={formatDate(bookingDetails.date)}
                    />
                  </ListItem>

                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon>
                      <AccessTimeIcon sx={{ color: "#CC0000" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Time"
                      secondary={bookingDetails.time}
                    />
                  </ListItem>

                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon>
                      <LocationOnIcon sx={{ color: "#CC0000" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Location"
                      secondary={
                        bookingType === "center"
                          ? selectedCenter?.name
                          : `Concierge Delivery - ${bookingDetails.address}`
                      }
                    />
                  </ListItem>
                </List>

                {bookingType === "concierge" && (
                  <Box
                    sx={{ mt: 3, p: 3, bgcolor: "#CC0000", borderRadius: 2 }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ color: "white", fontWeight: 700, mb: 1 }}
                    >
                      Total: ${conciergeService.deposit}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "rgba(255, 255, 255, 0.8)" }}
                    >
                      Refundable deposit for concierge service
                    </Typography>
                  </Box>
                )}
              </Paper>

              {/* Contact Information */}
              <Paper
                elevation={0}
                sx={{ p: 3, mb: 4, bgcolor: "rgba(248, 249, 250, 0.8)" }}
              >
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                  Contact Information
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Name:</strong> {userInfo.name || "Porsche ID User"}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Email:</strong> {userInfo.email || "user@porsche.com"}
                </Typography>
                <Typography variant="body1">
                  <strong>Phone:</strong>{" "}
                  {userInfo.phone || "Available via Porsche ID"}
                </Typography>
              </Paper>

              {/* Terms and Conditions */}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    sx={{ color: "#CC0000" }}
                  />
                }
                label={
                  <Typography variant="body2">
                    I agree to the <strong>Terms and Conditions</strong> and{" "}
                    <strong>Privacy Policy</strong>
                  </Typography>
                }
                sx={{ mb: 4 }}
              />

              {/* Submit Button */}
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  variant="outlined"
                  onClick={() => setStep(0)}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderColor: "#CC0000",
                    color: "#CC0000",
                  }}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={!agreedToTerms || loading}
                  sx={{
                    px: 6,
                    py: 1.5,
                    bgcolor: "#CC0000",
                    "&:hover": { bgcolor: "#B30000" },
                  }}
                >
                  {loading ? (
                    <>
                      <CircularProgress
                        size={20}
                        sx={{ mr: 2, color: "white" }}
                      />
                      Processing...
                    </>
                  ) : (
                    "Confirm Booking"
                  )}
                </Button>
              </Box>
            </Box>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <>
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
                Verify Porsche ID
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Please verify your Porsche ID to continue
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
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
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
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
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
              Your Porsche ID ensures secure access to your booking and payment
              information.
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
            Verify Porsche ID
          </Button>
        </DialogActions>
      </Dialog>

      {getStepContent()}

      {/* Confirmation Dialog */}
      <Dialog
        open={showConfirmation}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 2,
          },
        }}
      >
        <DialogContent sx={{ textAlign: "center", p: 4 }}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <CheckCircleIcon sx={{ fontSize: 80, color: "#4CAF50", mb: 2 }} />
          </motion.div>

          <Typography
            variant="h4"
            sx={{ fontWeight: 700, mb: 2, color: "#CC0000" }}
          >
            Booking Confirmed!
          </Typography>

          <Typography variant="body1" sx={{ color: "text.secondary", mb: 3 }}>
            Your test drive has been successfully booked. You'll receive a
            confirmation email shortly.
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Redirecting to confirmation page...
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VerificationPaymentPage;
