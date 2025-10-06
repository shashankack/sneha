import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Divider,
  Chip,
} from "@mui/material";
import { motion } from "framer-motion";
import { useBooking } from "../contexts/BookingContext";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VerifiedIcon from "@mui/icons-material/Verified";
import SpeedIcon from "@mui/icons-material/Speed";

const HomePage = () => {
  const { nextStep } = useBooking();

  const features = [
    {
      icon: <SmartToyIcon sx={{ fontSize: 40 }} />,
      title: "AI Concierge",
      description: "Personalized model recommendations",
    },
    {
      icon: <ViewInArIcon sx={{ fontSize: 40 }} />,
      title: "AR/VR Preview",
      description: "Visualize in your driveway",
    },
    {
      icon: <FlashOnIcon sx={{ fontSize: 40 }} />,
      title: "Instant Booking",
      description: "Confirmed in seconds",
    },
  ];

  const benefits = [
    { icon: <LocalShippingIcon />, text: "Concierge Delivery Available" },
    { icon: <VerifiedIcon />, text: "Verified Porsche Experience" },
    { icon: <SpeedIcon />, text: "3-Click Simplicity" },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "black",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Video Background */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        >
          <source
            src="https://res.cloudinary.com/dhlowafw0/video/upload/v1759769558/Porsche_Taycan_Turbo_S_mhcviq.mp4"
            type="video/mp4"
          />
        </video>
      </Box>

      {/* Video Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7))",
          zIndex: 1,
        }}
      />

      {/* Overlay Pattern */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(circle at 50% 50%, transparent 0%, rgba(0,0,0,0.4) 100%)",
          zIndex: 2,
        }}
      />

      {/* Content */}
      <Container
        maxWidth="lg"
        sx={{ position: "relative", zIndex: 3, py: { xs: 6, md: 10 } }}
      >
        {/* Header Section */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <Typography
              variant="h1"
              sx={{
                fontWeight: 800,
                mb: 2,
                color: "white",
                textShadow: "2px 4px 16px rgba(0,0,0,0.8)",
                fontSize: { xs: "2.5rem", sm: "3.5rem", md: "5rem" },
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              The Next Generation
              <br />
              <Box component="span" sx={{ color: "#CC0000" }}>
                Test Drive
              </Box>
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 300,
                mb: 2,
                color: "rgba(255, 255, 255, 0.9)",
                textShadow: "1px 2px 8px rgba(0,0,0,0.6)",
                fontSize: { xs: "1.25rem", md: "1.75rem" },
                maxWidth: "800px",
                mx: "auto",
              }}
            >
              Experience luxury redefined. Book your Porsche test drive in just
              3 clicks.
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Box sx={{ mt: 5, mb: 6 }}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  onClick={nextStep}
                  sx={{
                    px: 8,
                    py: 2.5,
                    fontSize: { xs: ".8rem", md: "1.25rem" },
                    fontWeight: 700,
                    borderRadius: 1,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    boxShadow: "0 12px 40px rgba(204, 0, 0, 0.5)",
                    background:
                      "linear-gradient(135deg, #CC0000 0%, #990000 100%)",
                    "&:hover": {
                      boxShadow: "0 16px 48px rgba(204, 0, 0, 0.7)",
                      background:
                        "linear-gradient(135deg, #E60000 0%, #CC0000 100%)",
                    },
                  }}
                >
                  Start Your Journey
                </Button>
              </motion.div>
              <Typography
                variant="body2"
                sx={{
                  mt: 2,
                  color: "rgba(255, 255, 255, 0.7)",
                  fontSize: "0.875rem",
                }}
              >
                No commitments. Just pure driving excitement.
              </Typography>
            </Box>
          </motion.div>

          {/* Benefits Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: { xs: 2, md: 4 },
                flexWrap: "wrap",
                mb: 8,
              }}
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.text}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -4 }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 1,
                      bgcolor: "rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(10px)",
                      px: 3,
                      py: 1.5,
                      borderRadius: 2,
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      width: 300,
                    }}
                  >
                    <Box sx={{ color: "#CC0000" }}>{benefit.icon}</Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "white",
                        fontWeight: 500,
                        fontSize: "0.875rem",
                      }}
                    >
                      {benefit.text}
                    </Typography>
                  </Box>
                </motion.div>
              ))}
            </Box>
          </motion.div>

          <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)", mb: 8 }} />
        </Box>

        {/* Feature Cards */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {features.map((feature, index) => (
            <Grid
              size={{
                xs: 12,
                sm: 4,
              }}
              key={feature.title}
            >
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.15, duration: 0.6 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <Card
                  sx={{
                    bgcolor: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: 3,
                    transition: "all 0.3s ease",
                    height: "100%",
                    "&:hover": {
                      bgcolor: "rgba(255, 255, 255, 0.08)",
                      border: "1px solid rgba(204, 0, 0, 0.5)",
                      boxShadow: "0 12px 40px rgba(204, 0, 0, 0.2)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 4, textAlign: "center" }}>
                    <Box
                      sx={{
                        color: "#CC0000",
                        mb: 2,
                        display: "inline-flex",
                        p: 2,
                        borderRadius: 2,
                        bgcolor: "rgba(204, 0, 0, 0.1)",
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography
                      variant="h5"
                      gutterBottom
                      sx={{ fontWeight: 600, color: "white", mb: 1.5 }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;
