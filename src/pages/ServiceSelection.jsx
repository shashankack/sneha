import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../App";
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Grid,
  Card,
  CardContent,
  IconButton,
  Chip,
  Alert,
} from "@mui/material";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import HomeIcon from "@mui/icons-material/Home";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

const ServiceSelection = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [selectedModel, setSelectedModel] = useState(null);

  useEffect(() => {
    // Get selected model from sessionStorage
    const model = sessionStorage.getItem("selectedModel");
    if (!model) {
      // If no model selected, redirect back to home
      navigate("/");
      return;
    }
    setSelectedModel(model);
  }, [navigate]);

  const handleServiceSelection = (serviceType) => {
    // Store selected service type first
    sessionStorage.setItem("serviceType", serviceType);

    // Set authentication for protected routes
    login();

    // Use setTimeout to ensure state update completes before navigation
    setTimeout(() => {
      // Both services now go to booking page
      // The booking page will handle skipping steps based on service type
      navigate("/booking");
    }, 0);
  };

  const handleGoBack = () => {
    // Clear any stored data and go back to home
    sessionStorage.removeItem("selectedModel");
    navigate("/");
  };

  const services = [
    {
      id: "centre",
      title: "Centre Visit",
      subtitle: "Visit our Porsche Centre",
      description:
        "Experience your selected Porsche at one of our premium centres with expert guidance.",
      features: [
        "Professional test drive guidance",
        "Access to full vehicle range",
        "Expert consultation",
        "Immediate availability",
        "Premium centre facilities",
      ],
      icon: <DriveEtaIcon sx={{ fontSize: 60, color: "#CC0000" }} />,
      price: "Free",
      priceNote: "No charge for centre visits",
      buttonText: "Book Centre Visit",
      recommended: false,
    },
    {
      id: "concierge",
      title: "Concierge Delivery",
      subtitle: "We come to you",
      description:
        "Our concierge service delivers your selected Porsche directly to your preferred location.",
      features: [
        "Door-to-door delivery service",
        "Personal vehicle presentation",
        "Flexible scheduling",
        "Professional driver/consultant",
        "Pickup included",
      ],
      icon: <LocalShippingIcon sx={{ fontSize: 60, color: "#CC0000" }} />,
      price: "$500",
      priceNote: "Fully refundable with vehicle purchase",
      buttonText: "Book Concierge Service",
      recommended: true,
    },
  ];

  if (!selectedModel) {
    return null; // Don't render while redirecting
  }

  return (
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
                Choose Your Test Drive Experience
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Selected: Porsche {selectedModel}
              </Typography>
            </Box>
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
            <Typography variant="body1">
              <strong>Quick Booking Process:</strong> Select your preferred
              service below, complete the details, and secure your test drive
              with a refundable deposit.
            </Typography>
          </Alert>

          <Grid container spacing={4} sx={{ mt: 2 }}>
            {services.map((service) => (
              <Grid
                size={{
                  xs: 12,
                  sm: 6,
                }}
                key={service.id}
              >
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card
                    elevation={service.recommended ? 12 : 4}
                    sx={{
                      height: "100%",
                      position: "relative",
                      border: service.recommended
                        ? "2px solid #CC0000"
                        : "none",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.02)",
                        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
                      },
                    }}
                    onClick={() => handleServiceSelection(service.id)}
                  >
                    {service.recommended && (
                      <Chip
                        label="Recommended"
                        sx={{
                          position: "absolute",
                          top: 16,
                          right: 16,
                          bgcolor: "#CC0000",
                          color: "white",
                          fontWeight: 600,
                          zIndex: 1,
                        }}
                      />
                    )}

                    <CardContent
                      sx={{
                        p: 4,
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Box sx={{ textAlign: "center", mb: 3 }}>
                        {service.icon}
                        <Typography
                          variant="h4"
                          sx={{
                            fontWeight: 700,
                            mt: 2,
                            mb: 1,
                            color: "black",
                          }}
                        >
                          {service.title}
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{
                            color: "#CC0000",
                            fontWeight: 600,
                          }}
                        >
                          {service.subtitle}
                        </Typography>
                      </Box>

                      <Typography
                        variant="body1"
                        sx={{
                          color: "text.secondary",
                          mb: 3,
                          lineHeight: 1.6,
                        }}
                      >
                        {service.description}
                      </Typography>

                      <Box sx={{ mb: 3, flexGrow: 1 }}>
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 600, mb: 2, color: "black" }}
                        >
                          Included Features:
                        </Typography>
                        {service.features.map((feature, index) => (
                          <Typography
                            key={index}
                            variant="body2"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mb: 1,
                              color: "text.secondary",
                            }}
                          >
                            <Box
                              sx={{
                                width: 6,
                                height: 6,
                                borderRadius: "50%",
                                bgcolor: "#CC0000",
                                mr: 2,
                              }}
                            />
                            {feature}
                          </Typography>
                        ))}
                      </Box>

                      <Box sx={{ textAlign: "center", mt: "auto" }}>
                        <Typography
                          variant="h4"
                          sx={{
                            fontWeight: 700,
                            color:
                              service.price === "Free" ? "green" : "#CC0000",
                            mb: 1,
                          }}
                        >
                          {service.price}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.secondary",
                            mb: 3,
                          }}
                        >
                          {service.priceNote}
                        </Typography>

                        <Button
                          variant="contained"
                          size="large"
                          fullWidth
                          sx={{
                            bgcolor: "#CC0000",
                            py: 2,
                            fontSize: "1.1rem",
                            fontWeight: 700,
                            "&:hover": { bgcolor: "#AA0000" },
                          }}
                        >
                          {service.buttonText}
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 6, textAlign: "center" }}>
            <Typography variant="body1" color="text.secondary">
              All deposits are fully refundable. Service fees are refunded with
              vehicle purchase.
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ServiceSelection;
