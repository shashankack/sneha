import React, { useState } from "react";
import {
  Box,
  Container,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Fade,
  LinearProgress,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useBooking } from "../contexts/BookingContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

// Step Components
import AIConciergePage from "../components/booking/AIConciergePage";
import CenterSelectionPage from "../components/booking/CenterSelectionPage";
import VerificationPaymentPage from "../components/booking/VerificationPaymentPage";

// Icons
import SmartToyIcon from "@mui/icons-material/SmartToy";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PaymentIcon from "@mui/icons-material/Payment";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const steps = [
  {
    label: "AI Concierge",
    description: "Let our AI help you find the perfect Porsche",
    icon: <SmartToyIcon />,
  },
  {
    label: "Service & Location",
    description: "Choose your preferred center and service",
    icon: <LocationOnIcon />,
  },
  {
    label: "Verification & Payment",
    description: "Complete your booking details",
    icon: <PaymentIcon />,
  },
];

const BookingPage = () => {
  const navigate = useNavigate();
  const {
    step,
    setStep,
    selectedModel,
    bookingType,
    resetBooking,
    nextStep,
    prevStep,
  } = useBooking();

  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    setLoading(true);
    // Simulate processing time for premium experience
    await new Promise((resolve) => setTimeout(resolve, 800));
    nextStep();
    setLoading(false);
  };

  const handleBack = () => {
    prevStep();
  };

  const handleFinish = () => {
    // Navigate to confirmation page
    navigate("/booking-confirmation");
  };

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return <AIConciergePage onNext={handleNext} />;
      case 1:
        return <CenterSelectionPage onNext={handleNext} onBack={handleBack} />;
      case 2:
        return (
          <VerificationPaymentPage
            onFinish={handleFinish}
            onBack={handleBack}
          />
        );
      default:
        return "Unknown step";
    }
  };

  const isStepCompleted = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return selectedModel !== null;
      case 1:
        return bookingType !== null;
      case 2:
        return false; // Will be completed when payment is processed
      default:
        return false;
    }
  };

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
        {/* Animated Background Pattern */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              radial-gradient(circle at 20% 50%, rgba(204, 0, 0, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(204, 0, 0, 0.05) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(204, 0, 0, 0.08) 0%, transparent 50%)
            `,
            animation: "float 20s ease-in-out infinite",
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate("/")}
                sx={{
                  color: "white",
                  fontWeight: 600,
                  fontSize: "1rem",
                  textTransform: "none",
                  "&:hover": {
                    color: "#CC0000",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                Back to Home
              </Button>
            </Box>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                mb: 2,
                fontSize: { xs: "2.5rem", md: "3.5rem" },
                textAlign: "center",
                background: "linear-gradient(45deg, #ffffff 30%, #CC0000 90%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Book Your Porsche Experience
            </Typography>
            <Typography
              variant="h6"
              sx={{
                textAlign: "center",
                color: "rgba(255, 255, 255, 0.8)",
                mb: 4,
                maxWidth: "800px",
                mx: "auto",
              }}
            >
              Three simple steps to your ultimate driving experience. Our AI
              concierge will guide you through the entire process.
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Progress Stepper */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              mb: 4,
              background: "linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)",
              border: "1px solid rgba(0, 0, 0, 0.08)",
              borderRadius: 3,
            }}
          >
            <Stepper
              activeStep={step}
              alternativeLabel
              sx={{
                "& .MuiStepLabel-label": {
                  fontWeight: 600,
                  fontSize: "1rem",
                },
                "& .MuiStepIcon-root": {
                  fontSize: "2rem",
                  "&.Mui-active": {
                    color: "#CC0000",
                  },
                  "&.Mui-completed": {
                    color: "#CC0000",
                  },
                },
              }}
            >
              {steps.map((stepInfo, index) => (
                <Step key={stepInfo.label} completed={isStepCompleted(index)}>
                  <StepLabel
                    icon={
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 56,
                          height: 56,
                          borderRadius: "50%",
                          backgroundColor:
                            step >= index ? "#CC0000" : "rgba(0, 0, 0, 0.1)",
                          color: step >= index ? "white" : "rgba(0, 0, 0, 0.5)",
                          transition: "all 0.3s ease",
                          fontSize: "1.5rem",
                        }}
                      >
                        {stepInfo.icon}
                      </Box>
                    }
                  >
                    <Typography variant="h6" sx={{ fontWeight: 700, mt: 1 }}>
                      {stepInfo.label}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        maxWidth: 200,
                        mx: "auto",
                      }}
                    >
                      {stepInfo.description}
                    </Typography>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>

            {loading && (
              <Box sx={{ mt: 3 }}>
                <LinearProgress
                  sx={{
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: "#CC0000",
                    },
                  }}
                />
              </Box>
            )}
          </Paper>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 3,
                  overflow: "hidden",
                  border: "1px solid rgba(0, 0, 0, 0.08)",
                  minHeight: "500px",
                }}
              >
                {getStepContent(step)}
              </Paper>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </Container>

      {/* Global Styles for Animations */}
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-20px) rotate(1deg);
          }
          66% {
            transform: translateY(-10px) rotate(-1deg);
          }
        }
      `}</style>
    </>
  );
};

export default BookingPage;
