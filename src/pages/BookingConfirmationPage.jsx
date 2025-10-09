import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Chip,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  Switch,
  FormControlLabel,
  LinearProgress,
  Alert,
  Stepper,
  Step,
  StepLabel,
  Fab,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useBooking } from "../contexts/BookingContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

// Icons
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EmailIcon from "@mui/icons-material/Email";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import VibrationIcon from "@mui/icons-material/Vibration";
import RouteIcon from "@mui/icons-material/Route";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import DownloadIcon from "@mui/icons-material/Download";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import CloseIcon from "@mui/icons-material/Close";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import SpeedIcon from "@mui/icons-material/Speed";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import ThreeSixtyIcon from "@mui/icons-material/ThreeSixty";

const testDriveRoutes = [
  {
    id: "city",
    name: "City Performance",
    description: "Urban driving with traffic lights and tight corners",
    duration: "30 mins",
    highlights: ["Stop-and-go traffic", "Parking assist", "City comfort"],
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400",
  },
  {
    id: "highway",
    name: "Highway Cruiser",
    description: "Open road experience with highway speeds",
    duration: "45 mins",
    highlights: [
      "Highway acceleration",
      "Cruise control",
      "Long-range comfort",
    ],
    image: "/highway.jpg",
  },
  {
    id: "scenic",
    name: "Scenic Mountain Route",
    description: "Winding roads through beautiful landscapes",
    duration: "60 mins",
    highlights: ["Cornering dynamics", "Scenic views", "Photography stops"],
    image:
      "https://images.unsplash.com/photo-1729866466239-848816f3c453?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2NlbmljJTIwbW91bnRhaW4lMjByb2FkfGVufDB8fDB8fHww",
  },
];

const driveModesHaptics = [
  {
    id: "comfort",
    name: "Comfort Mode",
    description: "Smooth, refined driving experience",
    icon: <DriveEtaIcon />,
    vibration: "subtle",
  },
  {
    id: "sport",
    name: "Sport Mode",
    description: "Enhanced performance and responsiveness",
    icon: <SpeedIcon />,
    vibration: "medium",
  },
  {
    id: "sport_plus",
    name: "Sport Plus Mode",
    description: "Maximum performance and track-ready dynamics",
    icon: <ElectricBoltIcon />,
    vibration: "intense",
  },
];

const BookingConfirmationPage = () => {
  const navigate = useNavigate();
  const {
    selectedModel,
    bookingType,
    selectedCenter,
    bookingDetails,
    userInfo,
    resetBooking,
  } = useBooking();

  const [showWalletPass, setShowWalletPass] = useState(false);
  const [showARPreview, setShowARPreview] = useState(false);
  const [showHaptics, setShowHaptics] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [selectedDriveMode, setSelectedDriveMode] = useState(null);
  const [musicConnected, setMusicConnected] = useState(false);
  const [hapticEnabled, setHapticEnabled] = useState(false);

  // Simulate haptic feedback
  const triggerHapticFeedback = (intensity = "medium") => {
    if ("vibrate" in navigator && hapticEnabled) {
      const patterns = {
        subtle: [50],
        medium: [100, 50, 100],
        intense: [200, 100, 200, 100, 200],
      };
      navigator.vibrate(patterns[intensity] || patterns.medium);
    }
  };

  const handleDownloadWalletPass = () => {
    // Simulate wallet pass download
    const passData = {
      organizationName: "Porsche",
      description: "Test Drive Booking",
      logoText: "PORSCHE",
      foregroundColor: "rgb(255, 255, 255)",
      backgroundColor: "rgb(204, 0, 0)",
      serialNumber: `POR-${Date.now()}`,
      barcodeMessage: `Booking ID: ${Date.now()}`,
      generic: {
        headerFields: [
          {
            key: "date",
            label: "Date",
            value: new Intl.DateTimeFormat("en-AU").format(
              new Date(bookingDetails.date)
            ),
          },
        ],
        primaryFields: [
          {
            key: "model",
            label: "Model",
            value: selectedModel?.name,
          },
        ],
        secondaryFields: [
          {
            key: "time",
            label: "Time",
            value: bookingDetails.time,
          },
          {
            key: "location",
            label: "Location",
            value:
              bookingType === "center"
                ? selectedCenter?.name
                : "Concierge Delivery",
          },
        ],
      },
    };

    // Create downloadable file
    const dataStr = JSON.stringify(passData, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const exportFileDefaultName = "porsche-test-drive.pkpass";

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  const connectSpotify = () => {
    // Simulate Spotify connection
    setMusicConnected(true);
    setTimeout(() => {
      alert(
        "Spotify connected! Your playlist will be ready for your test drive."
      );
    }, 1000);
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

  const postDriveSteps = [
    {
      label: "Test Drive",
      description: "Enjoy your Porsche experience",
    },
    {
      label: "Photos Captured",
      description: "Professional photos taken during drive",
    },
    {
      label: "Digital Summary",
      description: "Receive personalized feature summary",
    },
    {
      label: "Follow-up",
      description: "Personal consultation within 2 hours",
    },
  ];

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <Box
        sx={{
          background:
            "linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)",
          color: "white",
          py: 8,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              radial-gradient(circle at 20% 50%, rgba(204, 0, 0, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(204, 0, 0, 0.1) 0%, transparent 50%)
            `,
          }}
        />

        <Container
          maxWidth="lg"
          sx={{ position: "relative", zIndex: 1, textAlign: "center" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <CheckCircleIcon sx={{ fontSize: 100, color: "#4CAF50", mb: 3 }} />
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                mb: 2,
                fontSize: { xs: "2.5rem", md: "3.5rem" },
                background: "linear-gradient(45deg, #ffffff 30%, #4CAF50 90%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Booking Confirmed!
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "rgba(255, 255, 255, 0.9)",
                mb: 4,
                maxWidth: "800px",
                mx: "auto",
              }}
            >
              Your Porsche {selectedModel?.name} test drive is confirmed. Get
              ready for an unforgettable experience.
            </Typography>
          </motion.div>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Booking Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 4,
              mb: 4,
              background: "linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)",
              border: "2px solid #4CAF50",
              borderRadius: 3,
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, mb: 4, color: "#1a1a1a" }}
            >
              Your Booking Details
            </Typography>

            <Grid container spacing={4}>
              <Grid
                size={{
                  xs: 12,
                  md: 6,
                }}
              >
                <List>
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
                </List>
              </Grid>

              <Grid
                size={{
                  xs: 12,
                  md: 6,
                }}
              >
                <List>
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

                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon>
                      <PersonIcon sx={{ color: "#CC0000" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Contact"
                      secondary={`${userInfo.name} - ${userInfo.phone}`}
                    />
                  </ListItem>

                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon>
                      <EmailIcon sx={{ color: "#CC0000" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Confirmation Email"
                      secondary={`Sent to ${userInfo.email}`}
                    />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Paper>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, mb: 3, color: "#1a1a1a" }}
          >
            Premium Experience Features
          </Typography>

          <Grid container spacing={3} sx={{ mb: 6 }}>
            {/* Wallet Pass */}
            <Grid
              size={{
                xs: 12,
                sm: 6,
                md: 3,
              }}
            >
              <Card
                onClick={() => setShowWalletPass(true)}
                sx={{
                  cursor: "pointer",
                  height: "100%",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 32px rgba(204, 0, 0, 0.15)",
                  },
                }}
              >
                <CardContent sx={{ textAlign: "center", p: 3 }}>
                  <AccountBalanceWalletIcon
                    sx={{ fontSize: 48, color: "#CC0000", mb: 2 }}
                  />
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    Wallet Pass
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Add to Apple Wallet
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* AR Preview */}
            <Grid
              size={{
                xs: 12,
                sm: 6,
                md: 3,
              }}
            >
              <Card
                onClick={() => setShowARPreview(true)}
                sx={{
                  cursor: "pointer",
                  height: "100%",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 32px rgba(204, 0, 0, 0.15)",
                  },
                }}
              >
                <CardContent sx={{ textAlign: "center", p: 3 }}>
                  <ViewInArIcon
                    sx={{ fontSize: 48, color: "#CC0000", mb: 2 }}
                  />
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    AR Preview
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    See in your driveway
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Haptics Experience */}
            <Grid
              size={{
                xs: 12,
                sm: 6,
                md: 3,
              }}
            >
              <Card
                onClick={() => setShowHaptics(true)}
                sx={{
                  cursor: "pointer",
                  height: "100%",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 32px rgba(204, 0, 0, 0.15)",
                  },
                }}
              >
                <CardContent sx={{ textAlign: "center", p: 3 }}>
                  <VibrationIcon
                    sx={{ fontSize: 48, color: "#CC0000", mb: 2 }}
                  />
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    Haptic Preview
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Feel the performance
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Music Connection */}
            <Grid
              size={{
                xs: 12,
                sm: 6,
                md: 3,
              }}
            >
              <Card
                onClick={connectSpotify}
                sx={{
                  cursor: "pointer",
                  height: "100%",
                  transition: "all 0.3s ease",
                  bgcolor: musicConnected ? "#4CAF50" : "white",
                  color: musicConnected ? "white" : "inherit",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 32px rgba(204, 0, 0, 0.15)",
                  },
                }}
              >
                <CardContent sx={{ textAlign: "center", p: 3 }}>
                  <MusicNoteIcon sx={{ fontSize: 48, mb: 2 }} />
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    {musicConnected ? "Spotify Connected" : "Connect Music"}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    {musicConnected ? "Ready for test drive" : "Your playlist"}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </motion.div>

        {/* Route Selection */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, mb: 3, color: "#1a1a1a" }}
          >
            Choose Your Test Drive Route
          </Typography>

          <Grid container spacing={3} sx={{ mb: 6 }}>
            {testDriveRoutes.map((route) => (
              <Grid
                size={{
                  xs: 12,
                  md: 4,
                }}
                key={route.id}
              >
                <Card
                  onClick={() => setSelectedRoute(route)}
                  sx={{
                    cursor: "pointer",
                    height: "100%",
                    border:
                      selectedRoute?.id === route.id
                        ? "2px solid #CC0000"
                        : "1px solid rgba(0, 0, 0, 0.1)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={route.image}
                    alt={route.name}
                    sx={{
                      width: "100%",
                      height: 180,
                      objectFit: "cover",
                    }}
                  />
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                      {route.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", mb: 2 }}
                    >
                      {route.description}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Chip
                        label={route.duration}
                        size="small"
                        sx={{ bgcolor: "#CC0000", color: "white" }}
                      />
                      {selectedRoute?.id === route.id && (
                        <CheckCircleIcon sx={{ color: "#4CAF50" }} />
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* Post-Drive Experience Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, mb: 3, color: "#1a1a1a" }}
          >
            Your Post-Drive Experience
          </Typography>

          <Paper
            elevation={0}
            sx={{ p: 4, bgcolor: "rgba(248, 249, 250, 0.8)" }}
          >
            <Stepper alternativeLabel>
              {postDriveSteps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {step.label}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {step.description}
                    </Typography>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>

            <Alert severity="info" sx={{ mt: 4 }}>
              <Typography variant="body2">
                <strong>Moment of Reflection Protocol:</strong> Within 2 hours
                of your test drive, you'll receive a personalized email with
                curated photos and a digital summary of key features discussed
                during your drive.
              </Typography>
            </Alert>
          </Paper>
        </motion.div>

        {/* Action Buttons */}
        <Box sx={{ textAlign: "center", mt: 6 }}>
          <Button
            variant="outlined"
            onClick={() => {
              resetBooking();
              navigate("/booking");
            }}
            sx={{
              mr: 3,
              px: 4,
              py: 2,
              borderColor: "#CC0000",
              color: "#CC0000",
            }}
          >
            Book Another Drive
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate("/")}
            sx={{
              px: 6,
              py: 2,
              bgcolor: "#CC0000",
              "&:hover": { bgcolor: "#B30000" },
            }}
          >
            Return Home
          </Button>
        </Box>
      </Container>

      {/* Wallet Pass Dialog */}
      <Dialog
        open={showWalletPass}
        onClose={() => setShowWalletPass(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            Digital Wallet Pass
            <IconButton onClick={() => setShowWalletPass(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: "center", p: 3 }}>
            <Box
              sx={{
                width: 300,
                height: 180,
                mx: "auto",
                mb: 3,
                bgcolor: "#CC0000",
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                color: "white",
                p: 3,
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                PORSCHE
              </Typography>
              <Typography variant="body1" sx={{ my: 2 }}>
                Test Drive Pass
              </Typography>
              <Typography variant="h6">{selectedModel?.name}</Typography>
              <Typography variant="body2">
                {formatDate(bookingDetails.date)}
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              onClick={handleDownloadWalletPass}
              sx={{ bgcolor: "#CC0000", "&:hover": { bgcolor: "#B30000" } }}
            >
              Add to Wallet
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      {/* AR Preview Dialog */}
      <Dialog
        open={showARPreview}
        onClose={() => setShowARPreview(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            AR Preview - {selectedModel?.name}
            <IconButton onClick={() => setShowARPreview(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: "center", p: 3 }}>
            <Box
              sx={{
                width: "100%",
                height: 300,
                bgcolor: "rgba(0, 0, 0, 0.1)",
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 3,
              }}
            >
              <Box sx={{ textAlign: "center" }}>
                <ThreeSixtyIcon
                  sx={{ fontSize: 80, color: "#CC0000", mb: 2 }}
                />
                <Typography variant="h6" sx={{ color: "text.secondary" }}>
                  AR Preview Coming Soon
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Point your camera at your driveway to see the{" "}
                  {selectedModel?.name}
                </Typography>
              </Box>
            </Box>
            <Alert severity="info">
              AR functionality requires camera permissions and a compatible
              device. This feature will be available in the upcoming mobile app.
            </Alert>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Haptics Dialog */}
      <Dialog
        open={showHaptics}
        onClose={() => setShowHaptics(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            Haptic Experience Preview
            <IconButton onClick={() => setShowHaptics(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ p: 3 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={hapticEnabled}
                  onChange={(e) => setHapticEnabled(e.target.checked)}
                />
              }
              label="Enable Haptic Feedback"
              sx={{ mb: 3 }}
            />

            <Typography variant="h6" sx={{ mb: 3 }}>
              Experience Drive Modes
            </Typography>

            <Grid container spacing={2}>
              {driveModesHaptics.map((mode) => (
                <Grid size={12} key={mode.id}>
                  <Card
                    onClick={() => {
                      setSelectedDriveMode(mode);
                      triggerHapticFeedback(mode.vibration);
                    }}
                    sx={{
                      cursor: "pointer",
                      border:
                        selectedDriveMode?.id === mode.id
                          ? "2px solid #CC0000"
                          : "1px solid rgba(0, 0, 0, 0.1)",
                      "&:hover": {
                        bgcolor: "rgba(204, 0, 0, 0.05)",
                      },
                    }}
                  >
                    <CardContent
                      sx={{ display: "flex", alignItems: "center", p: 2 }}
                    >
                      <Box sx={{ mr: 2, color: "#CC0000" }}>{mode.icon}</Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          {mode.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          {mode.description}
                        </Typography>
                      </Box>
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          triggerHapticFeedback(mode.vibration);
                        }}
                      >
                        <VibrationIcon />
                      </IconButton>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BookingConfirmationPage;
