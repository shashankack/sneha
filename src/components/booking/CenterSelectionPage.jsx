import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Chip,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Alert,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { motion, AnimatePresence } from "framer-motion";
import { useBooking } from "../../contexts/BookingContext";
import { porscheCenters, conciergeService } from "../../data/centers";

// Icons
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import HomeIcon from "@mui/icons-material/Home";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PhoneIcon from "@mui/icons-material/Phone";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const CenterSelectionPage = ({ onNext, onBack }) => {
  const {
    selectedModel,
    bookingType,
    setBookingType,
    selectedCenter,
    setSelectedCenter,
    bookingDetails,
    updateBookingDetails,
  } = useBooking();

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [showConciergeDetails, setShowConciergeDetails] = useState(false);
  const dateTimeRef = React.useRef(null);

  const handleServiceTypeChange = (event) => {
    const newBookingType = event.target.value;
    setBookingType(newBookingType);
    setShowConciergeDetails(newBookingType === "concierge");

    // Clear center selection if switching to concierge
    if (newBookingType === "concierge") {
      setSelectedCenter(null);
    }
  };

  const handleCenterSelect = (center) => {
    setSelectedCenter(center);

    // Scroll to date/time section after a short delay
    setTimeout(() => {
      if (dateTimeRef.current) {
        dateTimeRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 300);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    updateBookingDetails({ date });
  };

  const handleTimeChange = (event) => {
    const time = event.target.value;
    setSelectedTime(time);
    updateBookingDetails({ time });
  };

  const handleAddressChange = (event) => {
    const address = event.target.value;
    setDeliveryAddress(address);
    updateBookingDetails({ address });
  };

  const isFormValid = () => {
    if (bookingType === "center") {
      return selectedCenter && selectedDate && selectedTime;
    } else if (bookingType === "concierge") {
      return selectedDate && selectedTime && deliveryAddress.trim();
    }
    return false;
  };

  const getAvailableTimes = () => {
    if (bookingType === "center" && selectedCenter) {
      return selectedCenter.availableTimes;
    }
    // For concierge, more flexible times
    return [
      "09:00 AM",
      "10:00 AM",
      "11:00 AM",
      "12:00 PM",
      "01:00 PM",
      "02:00 PM",
      "03:00 PM",
      "04:00 PM",
      "05:00 PM",
      "06:00 PM",
    ];
  };

  const isDateAvailable = (date) => {
    if (bookingType === "center" && selectedCenter) {
      const dateString = date.toISOString().split("T")[0];
      return selectedCenter.availableDates.includes(dateString);
    }
    // For concierge, more flexible dates (next 30 days)
    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 30);

    return date >= today && date <= maxDate;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ p: 4 }}>
        {/* Selected Model Display */}
        {selectedModel && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card
              sx={{
                mb: 4,
                background: "linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)",
                border: "1px solid #CC0000",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    src={selectedModel.image}
                    sx={{ width: 60, height: 60, mr: 3 }}
                  />
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700, color: "#CC0000" }}
                    >
                      Selected Model: {selectedModel.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {selectedModel.title} • {selectedModel.price}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Service Type Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, mb: 3, color: "#1a1a1a" }}
          >
            Choose Your Test Drive Experience
          </Typography>

          <Grid container spacing={3} sx={{ mb: 4 }}>
            {/* Center Visit Option */}
            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  onClick={() => setBookingType("center")}
                  sx={{
                    cursor: "pointer",
                    height: "100%",
                    border:
                      bookingType === "center"
                        ? "2px solid #CC0000"
                        : "2px solid transparent",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 4, textAlign: "center" }}>
                    <DirectionsCarIcon
                      sx={{ fontSize: 48, color: "#CC0000", mb: 2 }}
                    />
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                      Visit Porsche Center
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", mb: 3 }}
                    >
                      Experience our premium showroom and meet with our
                      specialists
                    </Typography>
                    <Chip
                      label="FREE"
                      size="small"
                      sx={{
                        bgcolor: "#4CAF50",
                        color: "white",
                        fontWeight: 700,
                      }}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>

            {/* Concierge Service Option */}
            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  onClick={() => setBookingType("concierge")}
                  sx={{
                    cursor: "pointer",
                    height: "100%",
                    border:
                      bookingType === "concierge"
                        ? "2px solid #CC0000"
                        : "2px solid transparent",
                    transition: "all 0.3s ease",
                    background:
                      "linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)",
                    "&:hover": {
                      boxShadow: "0 8px 32px rgba(204, 0, 0, 0.15)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 4, textAlign: "center" }}>
                    <HomeIcon sx={{ fontSize: 48, color: "#CC0000", mb: 2 }} />
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                      Concierge Service
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", mb: 3 }}
                    >
                      We bring your Porsche to your location with premium
                      white-glove service
                    </Typography>
                    <Chip
                      label={`$${conciergeService.deposit} REFUNDABLE DEPOSIT`}
                      size="small"
                      sx={{
                        bgcolor: "#CC0000",
                        color: "white",
                        fontWeight: 700,
                      }}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>

        <Divider sx={{ my: 4 }} />

        {/* Concierge Service Details */}
        <AnimatePresence>
          {bookingType === "concierge" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
            >
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
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Premium Concierge Service Benefits
                </Typography>
              </Alert>

              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  mb: 4,
                  bgcolor: "rgba(248, 249, 250, 0.8)",
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                  borderRadius: 3,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                  What's Included
                </Typography>
                <List>
                  {conciergeService.features.map((feature, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemIcon>
                        <CheckCircleIcon sx={{ color: "#4CAF50" }} />
                      </ListItemIcon>
                      <ListItemText primary={feature} />
                    </ListItem>
                  ))}
                </List>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", mt: 2 }}
                >
                  {conciergeService.description}
                </Typography>
              </Paper>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Center Selection (for center booking) */}
        <AnimatePresence>
          {bookingType === "center" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                Select Porsche Center
              </Typography>
              <Grid container spacing={3} sx={{ mb: 4 }}>
                {porscheCenters.map((center) => (
                  <Grid
                    size={{
                      xs: 12,
                      md: 4,
                    }}
                    key={center.id}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card
                        onClick={() => handleCenterSelect(center)}
                        sx={{
                          cursor: "pointer",
                          height: "100%",
                          border:
                            selectedCenter?.id === center.id
                              ? "2px solid #CC0000"
                              : "1px solid rgba(0, 0, 0, 0.1)",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                          },
                        }}
                      >
                        <CardContent sx={{ p: 3 }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "flex-start",
                              mb: 2,
                            }}
                          >
                            <LocationOnIcon
                              sx={{ color: "#CC0000", mr: 1, mt: 0.5 }}
                            />
                            <Box>
                              <Typography
                                variant="h6"
                                sx={{ fontWeight: 700, mb: 1 }}
                              >
                                {center.name}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{ color: "text.secondary", mb: 2 }}
                              >
                                {center.address}
                              </Typography>
                              <Box
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                <PhoneIcon
                                  sx={{
                                    fontSize: 16,
                                    color: "text.secondary",
                                    mr: 1,
                                  }}
                                />
                                <Typography
                                  variant="body2"
                                  sx={{ color: "text.secondary" }}
                                >
                                  {center.phone}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Delivery Address (for concierge booking) */}
        <AnimatePresence>
          {bookingType === "concierge" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                Delivery Address
              </Typography>
              <TextField
                fullWidth
                label="Enter your address for vehicle delivery"
                value={deliveryAddress}
                onChange={handleAddressChange}
                placeholder="123 Main Street, Sydney NSW 2000"
                sx={{ mb: 4 }}
                InputProps={{
                  startAdornment: (
                    <HomeIcon sx={{ color: "text.secondary", mr: 1 }} />
                  ),
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Date and Time Selection */}
        {(bookingType === "center" && selectedCenter) ||
        (bookingType === "concierge" && deliveryAddress) ? (
          <motion.div
            ref={dateTimeRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
              Select Date & Time
            </Typography>

            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid
                size={{
                  xs: 12,
                  md: 6,
                }}
              >
                <DatePicker
                  label="Test Drive Date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  shouldDisableDate={(date) => !isDateAvailable(date)}
                  minDate={new Date()}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      InputProps: {
                        startAdornment: (
                          <AccessTimeIcon
                            sx={{ color: "text.secondary", mr: 1 }}
                          />
                        ),
                      },
                    },
                  }}
                />
              </Grid>

              <Grid
                size={{
                  xs: 12,
                  md: 6,
                }}
              >
                <FormControl fullWidth>
                  <InputLabel>Select Time</InputLabel>
                  <Select
                    value={selectedTime}
                    onChange={handleTimeChange}
                    label="Select Time"
                    disabled={!selectedDate}
                  >
                    {getAvailableTimes().map((time) => (
                      <MenuItem key={time} value={time}>
                        {time}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </motion.div>
        ) : null}

        {/* Action Buttons */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 6 }}>
          <Button
            variant="outlined"
            onClick={onBack}
            sx={{
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
            Back to AI Concierge
          </Button>

          <Button
            variant="contained"
            onClick={onNext}
            disabled={!isFormValid()}
            sx={{
              px: 6,
              py: 1.5,
              bgcolor: "#CC0000",
              "&:hover": {
                bgcolor: "#B30000",
                transform: "translateY(-2px)",
              },
              "&:disabled": {
                bgcolor: "rgba(0, 0, 0, 0.12)",
              },
            }}
          >
            Continue to Payment
          </Button>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default CenterSelectionPage;
