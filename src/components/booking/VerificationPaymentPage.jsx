import React, { useState } from "react";
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
} from "@mui/material";
import { motion } from "framer-motion";
import { useBooking } from "../../contexts/BookingContext";
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

  const [step, setStep] = useState(0); // 0: User Info, 1: Payment (if needed), 2: Review
  const [loading, setLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleUserInfoChange = (field) => (event) => {
    updateUserInfo({ [field]: event.target.value });
  };

  const handlePaymentInfoChange = (field) => (event) => {
    updatePaymentInfo({ [field]: event.target.value });
  };

  const isUserInfoValid = () => {
    return userInfo.name && userInfo.email && userInfo.phone;
  };

  const isPaymentInfoValid = () => {
    if (bookingType === "center") return true; // No payment needed for center visits
    return paymentInfo.cardNumber && paymentInfo.expiry && paymentInfo.cvc;
  };

  const handleNextStep = () => {
    if (step === 0 && isUserInfoValid()) {
      if (bookingType === "concierge") {
        setStep(1); // Go to payment
      } else {
        setStep(2); // Skip payment for center visits
      }
    } else if (step === 1 && isPaymentInfoValid()) {
      setStep(2); // Go to review
    }
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
                  <AccountCircleIcon />
                </Avatar>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    Your Information
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Please provide your contact details for the booking
                  </Typography>
                </Box>
              </Box>

              <Grid container spacing={3}>
                <Grid
                  size={{
                    xs: 12,
                    md: 4,
                  }}
                >
                  <TextField
                    fullWidth
                    label="Full Name"
                    value={userInfo.name}
                    onChange={handleUserInfoChange("name")}
                    InputProps={{
                      startAdornment: (
                        <PersonIcon sx={{ color: "text.secondary", mr: 1 }} />
                      ),
                    }}
                  />
                </Grid>
                <Grid
                  size={{
                    xs: 12,
                    md: 4,
                  }}
                  md={6}
                >
                  <TextField
                    fullWidth
                    label="Email Address"
                    type="email"
                    value={userInfo.email}
                    onChange={handleUserInfoChange("email")}
                    InputProps={{
                      startAdornment: (
                        <EmailIcon sx={{ color: "text.secondary", mr: 1 }} />
                      ),
                    }}
                  />
                </Grid>
                <Grid
                  size={{
                    xs: 12,
                    md: 4,
                  }}
                  md={6}
                >
                  <TextField
                    fullWidth
                    label="Phone Number"
                    value={userInfo.phone}
                    onChange={handleUserInfoChange("phone")}
                    InputProps={{
                      startAdornment: (
                        <PhoneIcon sx={{ color: "text.secondary", mr: 1 }} />
                      ),
                    }}
                  />
                </Grid>
              </Grid>

              <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end", flexDirection: { xs: "column", sm: "row" } }}>
                {/* Back Button (bottom level) */}
                {step === 0 && (
                  <Button
                    variant="outlined"
                    onClick={onBack}
                    sx={{
                      mr: { xs: 0, sm: 2 },
                      mb: { xs: 2, sm: 0 },
                      px: 4,
                      py: 1.5,
                      borderColor: "#CC0000",
                      color: "#CC0000",
                      "&:hover": {
                        borderColor: "#B30000",
                        bgcolor: "rgba(204, 0, 0, 0.05)",
                      },
                    }}
                  >
                    Back to Service Selection
                  </Button>
                )}
                <Button
                  variant="contained"
                  onClick={handleNextStep}
                  disabled={!isUserInfoValid()}
                  sx={{
                    px: 4,
                    py: 1.5,
                    bgcolor: "#CC0000",
                    "&:hover": { bgcolor: "#B30000" },
                  }}
                >
                  Continue
                </Button>
              </Box>
            </Box>
          </motion.div>
        );

      case 1:
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
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Expiry Date"
                    value={paymentInfo.expiry}
                    onChange={handlePaymentInfoChange("expiry")}
                    placeholder="MM/YY"
                  />
                </Grid>
                <Grid item xs={6}>
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
                  onClick={handleNextStep}
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

      case 2:
        return (
          <motion.div
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
                  <strong>Name:</strong> {userInfo.name}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Email:</strong> {userInfo.email}
                </Typography>
                <Typography variant="body1">
                  <strong>Phone:</strong> {userInfo.phone}
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
                  onClick={() => setStep(bookingType === "concierge" ? 1 : 0)}
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
