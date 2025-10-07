import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
} from "@mui/material";
import { motion } from "framer-motion";
import { useBooking } from "../contexts/BookingContext";
import Navbar from "../components/Navbar";
import ChatModal from "../components/ChatModal";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import NatureIcon from "@mui/icons-material/Nature";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import FlashOnIcon from "@mui/icons-material/FlashOn";

const HomePage = () => {
  const navigate = useNavigate();
  const { updateSelectedModel } = useBooking();

  const features = [
    {
      icon: <SmartToyIcon sx={{ fontSize: 40, color: "#CC0000" }} />,
      title: "AI Concierge",
      description:
        "Intelligent chat assistant for personalized recommendations",
    },
    {
      icon: <ViewInArIcon sx={{ fontSize: 40, color: "#CC0000" }} />,
      title: "AR/VR Preview",
      description:
        "Visualize your Porsche in your driveway before test driving",
    },
    {
      icon: <FlashOnIcon sx={{ fontSize: 40, color: "#CC0000" }} />,
      title: "3-Click Booking",
      description: "Fastest luxury car booking experience ever created",
    },
  ];

  const porscheModels = [
    {
      name: "Taycan",
      title: "The All-Electric Performer",
      type: "Electric",
      price: "From $158,000",
      image: "/models/taycan.jpeg",
      icon: <ElectricBoltIcon sx={{ color: "#4CAF50" }} />,
    },
    {
      name: "911 Turbo",
      title: "The Iconic Legend",
      type: "Petrol",
      price: "From $231,000",
      image: "/models/911.jpeg",
      icon: <LocalGasStationIcon sx={{ color: "#FF9800" }} />,
    },
    {
      name: "Cayenne",
      title: "The Versatile Performer",
      type: "Hybrid",
      price: "From $131,000",
      image: "/models/cayenne.jpg",
      icon: <NatureIcon sx={{ color: "#2196F3" }} />,
    },
  ];

  const handleModelClick = (model) => {
    updateSelectedModel(model);
    navigate('/booking');
  };

  return (
    <>
      <Navbar />

      {/* Hero Video Section */}
      <Box
        sx={{
          height: "100vh",
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
            background:
              "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6))",
            zIndex: 1,
          }}
        />

        {/* Hero Content */}
        <Container
          maxWidth="lg"
          sx={{
            position: "relative",
            zIndex: 2,
            height: "100%",
            display: "flex",
            alignItems: "end",
            justifyContent: { xs: "center", md: "start" },
            py: 10,
          }}
        >
          <Box sx={{ textAlign: { xs: "center", md: "start" } }}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 800,
                  mb: 3,
                  color: "white",
                  textShadow: "2px 4px 16px rgba(0,0,0,0.8)",
                  fontSize: { xs: "2rem", sm: "3rem", md: "4rem" },
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                }}
              >
                The Next Generation
                <br />
                <Box
                  component="span"
                  sx={{
                    color: "#CC0000",
                    fontSize: { xs: "1.5rem", sm: "2.5rem", md: "3.5rem" },
                  }}
                >
                  Test Drive Experience
                </Box>
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 400,
                  mb: 6,
                  color: "rgba(255, 255, 255, 0.9)",
                  fontSize: { xs: "1rem", md: "1.5rem" },
                  maxWidth: "900px",
                  mx: "auto",
                }}
              >
                AI-powered concierge, AR previews, and 3-click booking.
                <br />
                Experience Porsche like never before.
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <Button
                variant="contained"
                color="primary"
                size="large"
                endIcon={<ArrowForwardIcon />}
                onClick={() => navigate('/model-selection')}
                sx={{
                  px: 6,
                  py: 2,
                  fontSize: "1rem",
                  fontWeight: 700,
                  borderRadius: 2,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  boxShadow: "0 16px 48px rgba(204, 0, 0, 0.6)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 20px 56px rgba(204, 0, 0, 0.8)",
                  },
                }}
              >
                Start Your Journey
              </Button>
            </motion.div>
          </Box>
        </Container>
      </Box>

      {/* Main Content - Bright Background */}
      <Box sx={{ bgcolor: "#F8F9FA", minHeight: "100vh" }}>
        {/* Features Section */}
        <Container maxWidth="lg" sx={{ py: 10 }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h2"
              sx={{
                textAlign: "center",
                fontWeight: 700,
                mb: 3,
                color: "black",
                fontSize: { xs: "2.5rem", md: "3.5rem" },
              }}
            >
              Revolutionary Features
            </Typography>
            <Typography
              variant="h6"
              sx={{
                textAlign: "center",
                color: "text.secondary",
                mb: 8,
                maxWidth: "800px",
                mx: "auto",
              }}
            >
              Experience the future of luxury car booking with our cutting-edge
              technology
            </Typography>
          </motion.div>

          <Grid container spacing={6}>
            {features.map((feature, index) => (
              <Grid
                size={{
                  xs: 12,
                  sm: 6,
                  md: 4,
                }}
                key={feature.title}
              >
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  whileHover={{ y: -8 }}
                >
                  <Card
                    sx={{
                      height: "100%",
                      bgcolor: "white",
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                      borderRadius: 4,
                      border: "1px solid rgba(0, 0, 0, 0.05)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        boxShadow: "0 16px 48px rgba(204, 0, 0, 0.15)",
                        transform: "translateY(-8px)",
                      },
                    }}
                  >
                    <CardContent sx={{ p: 5, textAlign: "center" }}>
                      <Box sx={{ mb: 3 }}>{feature.icon}</Box>
                      <Typography
                        variant="h5"
                        gutterBottom
                        sx={{ fontWeight: 700, color: "black", mb: 2 }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ color: "text.secondary", lineHeight: 1.8 }}
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

        {/* Models Showcase Section */}
        <Container maxWidth="lg" sx={{ py: 10 }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h2"
              sx={{
                textAlign: "center",
                fontWeight: 700,
                mb: 3,
                color: "black",
                fontSize: { xs: "2.5rem", md: "3.5rem" },
              }}
            >
              Your Porsche Awaits
            </Typography>
            <Typography
              variant="h6"
              sx={{
                textAlign: "center",
                color: "text.secondary",
                mb: 8,
                maxWidth: "700px",
                mx: "auto",
              }}
            >
              Discover our lineup of legendary sports cars, each designed to
              deliver pure driving emotion
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            {porscheModels.map((model, index) => (
              <Grid
                size={{
                  xs: 12,
                  sm: 6,
                  md: 4,
                }}
                key={model.name}
              >
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Box
                    onClick={() => handleModelClick(model)}
                    sx={{
                      height: 280,
                      position: "relative",
                      overflow: "hidden",
                      borderRadius: 4,
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        "& .model-image": {
                          transform: "scale(1.1)",
                        },
                        "& .arrow-icon": {
                          transform: "translateX(8px)",
                        },
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src={model.image}
                      alt={model.name}
                      className="model-image"
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.3s ease",
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background:
                          "linear-gradient(transparent, rgba(0,0,0,0.8))",
                        p: 3,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: "white",
                          textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                        }}
                      >
                        {model.name}
                      </Typography>
                      <ArrowForwardIcon
                        className="arrow-icon"
                        sx={{
                          color: "white",
                          mr: 4,
                          fontSize: 28,
                          transition: "transform 0.3s ease",
                        }}
                      />
                    </Box>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {/* CTA Section */}
          <Box sx={{ textAlign: "center", mt: 10 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Typography
                variant="h4"
                sx={{ fontWeight: 700, mb: 4, color: "black" }}
              >
                Ready to Experience Porsche?
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                endIcon={<ArrowForwardIcon />}
                onClick={() => navigate('/model-selection')}
                sx={{
                  px: 8,
                  py: 3,
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  borderRadius: 2,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  boxShadow: "0 12px 40px rgba(204, 0, 0, 0.3)",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 16px 48px rgba(204, 0, 0, 0.4)",
                  },
                }}
              >
                Book Your Test Drive
              </Button>
            </motion.div>
          </Box>
        </Container>
      </Box>
      
      {/* Chat Modal with Full Booking Flow */}
      <ChatModal />
    </>
  );
};

export default HomePage;
