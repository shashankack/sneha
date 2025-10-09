import React, { useState } from "react";
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
  IconButton,
  FormControl,
  Divider,
  Chip,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";

const ConciergeDetails = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [formData, setFormData] = useState({
    // Personal Details
    firstName: "",
    lastName: "",
    email: "",
    phone: "",

    // Delivery Address
    streetAddress: "",
    suburb: "",
    state: "NSW",
    postcode: "",

    // Preferences
    deliveryDate: null,
    deliveryTime: "",
    specialInstructions: "",

    // Vehicle Selection (from previous flow)
    selectedModel: sessionStorage.getItem("selectedModel") || "Taycan",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: "",
      });
    }
  };

  const handleDateChange = (newDate) => {
    setFormData({
      ...formData,
      deliveryDate: newDate,
    });

    // Clear error when user selects a date
    if (errors.deliveryDate) {
      setErrors({
        ...errors,
        deliveryDate: "",
      });
    }
  };

  const shouldDisableDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const maxDate = new Date(today);
    maxDate.setDate(maxDate.getDate() + 30);

    return date < today || date > maxDate;
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "streetAddress",
      "suburb",
      "postcode",
      "deliveryTime",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field] || formData[field].trim() === "") {
        newErrors[field] = "This field is required";
      }
    });

    // Date validation (separate handling for Date object)
    if (!formData.deliveryDate) {
      newErrors.deliveryDate = "This field is required";
    }

    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    // Postcode validation
    if (formData.postcode && !/^\d{4}$/.test(formData.postcode)) {
      newErrors.postcode = "Please enter a valid 4-digit postcode";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Store concierge details in sessionStorage for the payment page
      sessionStorage.setItem("conciergeDetails", JSON.stringify(formData));

      // Navigate to payment page
      navigate("/payment");
    }
  };

  const handleGoBack = () => {
    logout();
    navigate("/");
  };

  const states = ["NSW", "VIC", "QLD", "SA", "WA", "TAS", "NT", "ACT"];
  const timeSlots = [
    "9:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "1:00 PM - 2:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
    "4:00 PM - 5:00 PM",
    "6:00 PM - 7:00 PM",
  ];

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ minHeight: "100vh", bgcolor: "#F8F9FA" }}>
        <Navbar />

      <Container maxWidth="lg" sx={{ pt: 12, pb: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
            <IconButton onClick={handleGoBack} sx={{ mr: 2, color: "#CC0000" }}>
              <ArrowBackIcon />
            </IconButton>
            <Box>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  color: "black",
                  mb: 1,
                }}
              >
                Concierge Delivery Details
              </Typography>
              <Typography variant="h6" color="text.secondary">
                We'll bring your {formData.selectedModel} test drive to you
              </Typography>
            </Box>
          </Box>

          <Grid container spacing={4}>
            {/* Main Form */}
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
                {/* Personal Details Section */}
                <Box sx={{ mb: 4 }}>
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
                    <PersonIcon sx={{ color: "#CC0000" }} />
                    Personal Details
                  </Typography>

                  <Grid container spacing={3}>
                    <Grid
                      size={{
                        xs: 12,
                        sm: 6,
                      }}
                    >
                      <TextField
                        fullWidth
                        label="First Name"
                        value={formData.firstName}
                        onChange={handleInputChange("firstName")}
                        error={!!errors.firstName}
                        helperText={errors.firstName}
                        sx={{
                          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                            {
                              borderColor: "#CC0000",
                            },
                        }}
                      />
                    </Grid>
                    <Grid
                      size={{
                        xs: 12,
                        sm: 6,
                      }}
                    >
                      <TextField
                        fullWidth
                        label="Last Name"
                        value={formData.lastName}
                        onChange={handleInputChange("lastName")}
                        error={!!errors.lastName}
                        helperText={errors.lastName}
                        sx={{
                          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                            {
                              borderColor: "#CC0000",
                            },
                        }}
                      />
                    </Grid>
                    <Grid
                      size={{
                        xs: 12,
                        sm: 6,
                      }}
                    >
                      <TextField
                        fullWidth
                        label="Email Address"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange("email")}
                        error={!!errors.email}
                        helperText={errors.email}
                        sx={{
                          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                            {
                              borderColor: "#CC0000",
                            },
                        }}
                      />
                    </Grid>
                    <Grid
                      size={{
                        xs: 12,
                        sm: 6,
                      }}
                    >
                      <TextField
                        fullWidth
                        label="Phone Number"
                        value={formData.phone}
                        onChange={handleInputChange("phone")}
                        error={!!errors.phone}
                        helperText={errors.phone}
                        placeholder="0412 345 678"
                        sx={{
                          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                            {
                              borderColor: "#CC0000",
                            },
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>

                <Divider sx={{ my: 4 }} />

                {/* Delivery Address Section */}
                <Box sx={{ mb: 4 }}>
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
                    <LocationOnIcon sx={{ color: "#CC0000" }} />
                    Delivery Address
                  </Typography>

                  <Grid container spacing={3}>
                    <Grid size={12}>
                      <TextField
                        fullWidth
                        label="Street Address"
                        value={formData.streetAddress}
                        onChange={handleInputChange("streetAddress")}
                        error={!!errors.streetAddress}
                        helperText={errors.streetAddress}
                        placeholder="123 Collins Street"
                        sx={{
                          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                            {
                              borderColor: "#CC0000",
                            },
                        }}
                      />
                    </Grid>
                    <Grid
                      size={{
                        xs: 12,
                        sm: 6,
                      }}
                    >
                      <TextField
                        fullWidth
                        label="Suburb"
                        value={formData.suburb}
                        onChange={handleInputChange("suburb")}
                        error={!!errors.suburb}
                        helperText={errors.suburb}
                        sx={{
                          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                            {
                              borderColor: "#CC0000",
                            },
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 3 }}>
                      <FormControl fullWidth>
                        <InputLabel>State</InputLabel>
                        <Select
                          value={formData.state}
                          onChange={handleInputChange("state")}
                          label="State"
                          sx={{
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#CC0000",
                            },
                          }}
                        >
                          {states.map((state) => (
                            <MenuItem key={state} value={state}>
                              {state}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 3 }}>
                      <TextField
                        fullWidth
                        label="Postcode"
                        value={formData.postcode}
                        onChange={handleInputChange("postcode")}
                        error={!!errors.postcode}
                        helperText={errors.postcode}
                        placeholder="2000"
                        sx={{
                          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                            {
                              borderColor: "#CC0000",
                            },
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>

                <Divider sx={{ my: 4 }} />

                {/* Delivery Preferences Section */}
                <Box sx={{ mb: 4 }}>
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
                    <CalendarTodayIcon sx={{ color: "#CC0000" }} />
                    Delivery Preferences
                  </Typography>

                  <Grid container spacing={3}>
                    <Grid
                      size={{
                        xs: 12,
                        sm: 6,
                      }}
                    >
                      <DatePicker
                        label="Preferred Delivery Date"
                        value={formData.deliveryDate}
                        onChange={handleDateChange}
                        shouldDisableDate={shouldDisableDate}
                        minDate={new Date()}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            error: !!errors.deliveryDate,
                            helperText: errors.deliveryDate,
                            InputProps: {
                              startAdornment: <CalendarTodayIcon sx={{ mr: 1, color: "#CC0000" }} />,
                            },
                            sx: {
                              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#CC0000",
                              },
                            },
                          },
                        }}
                      />
                    </Grid>
                    <Grid
                      size={{
                        xs: 12,
                        sm: 6,
                      }}
                    >
                      <FormControl fullWidth error={!!errors.deliveryTime}>
                        <InputLabel>Preferred Time Slot</InputLabel>
                        <Select
                          value={formData.deliveryTime}
                          onChange={handleInputChange("deliveryTime")}
                          label="Preferred Time Slot"
                          startAdornment={<AccessTimeIcon sx={{ mr: 1, color: "#CC0000" }} />}
                          sx={{
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#CC0000",
                            },
                          }}
                        >
                          {timeSlots.map((slot) => (
                            <MenuItem key={slot} value={slot}>
                              {slot}
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.deliveryTime && (
                          <Typography
                            variant="caption"
                            color="error"
                            sx={{ mt: 1, ml: 2 }}
                          >
                            {errors.deliveryTime}
                          </Typography>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid size={12}>
                      <TextField
                        fullWidth
                        label="Special Instructions (Optional)"
                        multiline
                        rows={3}
                        value={formData.specialInstructions}
                        onChange={handleInputChange("specialInstructions")}
                        placeholder="Any specific delivery instructions, preferred parking location, access codes, etc."
                        sx={{
                          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                            {
                              borderColor: "#CC0000",
                            },
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>

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
                    <strong>Concierge Delivery Service:</strong>
                    <br />
                    • Our professional driver will deliver your selected Porsche
                    to your specified address
                    <br />
                    • Delivery includes a comprehensive vehicle overview and
                    test drive guidance
                    <br />
                    • Service includes pickup at the end of your test drive
                    period
                    <br />• $500 service fee (fully refundable with
                    vehicle purchase)
                  </Typography>
                </Alert>

                <Box
                  sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}
                >
                  <Button
                    variant="outlined"
                    onClick={handleGoBack}
                    sx={{
                      borderColor: "#CC0000",
                      color: "#CC0000",
                      px: 4,
                      py: 1.5,
                      "&:hover": {
                        borderColor: "#AA0000",
                        bgcolor: "rgba(204, 0, 0, 0.04)",
                      },
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{
                      bgcolor: "#CC0000",
                      px: 4,
                      py: 1.5,
                      "&:hover": { bgcolor: "#AA0000" },
                    }}
                  >
                    Continue to Payment
                  </Button>
                </Box>
              </Paper>
            </Grid>

            {/* Summary Sidebar */}
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
                  position: "sticky",
                  top: 100,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, mb: 3, color: "black" }}
                >
                  Service Summary
                </Typography>

                <Box sx={{ mb: 3 }}>
                  <Chip
                    label="Concierge Delivery"
                    sx={{
                      bgcolor: "#CC0000",
                      color: "white",
                      fontWeight: 600,
                      mb: 2,
                    }}
                  />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    Selected Vehicle:
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    Porsche {formData.selectedModel}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Service Type:
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    Door-to-door delivery & pickup
                  </Typography>
                </Box>

                {formData.deliveryDate && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Delivery Date:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {formData.deliveryDate.toLocaleDateString('en-AU', { 
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </Typography>
                  </Box>
                )}

                {formData.deliveryTime && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Time Slot:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {formData.deliveryTime}
                    </Typography>
                  </Box>
                )}

                <Divider sx={{ my: 2 }} />

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Concierge Service Fee:
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, color: "#CC0000" }}
                  >
                    $500
                  </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Total: $500
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Fully refundable with vehicle purchase
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </Box>
    </LocalizationProvider>
  );
};

export default ConciergeDetails;
