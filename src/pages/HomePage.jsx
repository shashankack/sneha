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
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import NatureIcon from "@mui/icons-material/Nature";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import { porscheModels as allPorscheModels } from "../data/models";
import { video } from "framer-motion/client";

const HomePage = () => {
  const navigate = useNavigate();
  const { updateSelectedModel } = useBooking();
  const [hoveredModel, setHoveredModel] = React.useState(null);
  const [playingVideo, setPlayingVideo] = React.useState(null);
  const videoRefs = React.useRef({});
  const hoverTimeouts = React.useRef({});

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features-section");
    if (featuresSection) {
      featuresSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleBookTestDrive = () => {
    navigate("/booking");
    window.scrollTo({ top: 0 });
  };

  const features = [
    {
      icon: <DriveEtaIcon sx={{ fontSize: 40, color: "#CC0000" }} />,
      title: "Concierge Booking",
      description:
        "AI-powered assistant to find your perfect Porsche model and test drive route.",
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

  // Map icon based on type
  const getModelIcon = (type) => {
    switch (type) {
      case "Electric":
        return <ElectricBoltIcon sx={{ color: "#4CAF50" }} />;
      case "Petrol":
        return <LocalGasStationIcon sx={{ color: "#FF9800" }} />;
      case "Hybrid":
        return <NatureIcon sx={{ color: "#2196F3" }} />;
      default:
        return <DriveEtaIcon sx={{ color: "#CC0000" }} />;
    }
  };

  // Convert data to HomePage model format
  const porscheModels = allPorscheModels.map((model) => ({
    name: model.name,
    title: model.title,
    type: model.type,
    price: model.price,
    image: model.image,
    video: model.video,
    icon: getModelIcon(model.type),
  }));

  const handleModelClick = (model) => {
    // Store selected model in sessionStorage for the service selection
    sessionStorage.setItem("selectedModel", model.name);
    updateSelectedModel(model);
    navigate("/service-selection");
  };

  const handleMouseEnter = (index) => {
    setHoveredModel(index);

    // Clear any existing timeout for this model
    if (hoverTimeouts.current[index]) {
      clearTimeout(hoverTimeouts.current[index]);
    }

    // Set a timeout to play video after 500ms delay
    hoverTimeouts.current[index] = setTimeout(() => {
      const video = videoRefs.current[index];
      if (video && porscheModels[index].video) {
        video.play().catch((err) => console.log("Video play error:", err));
        setPlayingVideo(index);
      }
    }, 500);
  };

  const handleMouseLeave = (index) => {
    setHoveredModel(null);

    // Clear the timeout if mouse leaves before video starts
    if (hoverTimeouts.current[index]) {
      clearTimeout(hoverTimeouts.current[index]);
    }

    // Pause and reset video, then load to show poster image again
    const video = videoRefs.current[index];
    if (video) {
      video.pause();
      video.currentTime = 0;
      video.load(); // This reloads the video and shows the poster image
      setPlayingVideo(null);
    }
  };

  // Cleanup timeouts on unmount
  React.useEffect(() => {
    return () => {
      Object.values(hoverTimeouts.current).forEach((timeout) =>
        clearTimeout(timeout)
      );
    };
  }, []);

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
                  mx: { xs: "auto", md: 0 },
                }}
              >
                AI-powered concierge, AR previews, and 3-click booking.
                <br />
                Experience Porsche like never before.
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                onClick={handleBookTestDrive}
                sx={{
                  px: 6,
                  py: 2.5,
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  borderRadius: 2,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  bgcolor: "#CC0000",
                  color: "white",
                  boxShadow: "0 12px 40px rgba(204, 0, 0, 0.4)",
                  "&:hover": {
                    bgcolor: "#B30000",
                    transform: "translateY(-4px)",
                    boxShadow: "0 16px 48px rgba(204, 0, 0, 0.5)",
                  },
                  transition: "all 0.3s ease",
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
        <Container maxWidth="lg" sx={{ py: 10 }} id="features-section">
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
        <Container maxWidth="xl" sx={{ py: 10 }}>
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

          <Box
            sx={{
              overflowX: "auto",
              overflowY: "hidden",
              py: 4,
              "&::-webkit-scrollbar": {
                height: 3,
              },
              "&::-webkit-scrollbar-track": {
                bgcolor: "rgba(0, 0, 0, 0.05)",
                borderRadius: 4,
              },
              "&::-webkit-scrollbar-thumb": {
                bgcolor: "#CC0000",
                borderRadius: 4,
                "&:hover": {
                  bgcolor: "#AA0000",
                },
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 4,
                minWidth: "min-content",
              }}
            >
              {porscheModels.map((model, index) => (
                <Box
                  key={model.name}
                  sx={{
                    flexShrink: 0,
                    width:
                      hoveredModel === index
                        ? 600
                        : hoveredModel !== null
                        ? 300
                        : 400,
                    transition: "width 0.3s ease",
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2, duration: 0.8 }}
                    animate={{
                      scale: hoveredModel === index ? 1.05 : 1,
                    }}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={() => handleMouseLeave(index)}
                  >
                    <Box
                      onClick={() => handleModelClick(model)}
                      sx={{
                        height: 400,
                        position: "relative",
                        overflow: "hidden",
                        borderRadius: 4,
                        cursor: "pointer",
                        transition: "all 0.3s ease",

                        "&:hover": {
                          "& .model-video": {
                            transform: "scale(1.1)",
                          },
                          "& .arrow-icon": {
                            transform: "translateX(8px)",
                          },
                        },
                      }}
                    >
                      {model.video ? (
                        <Box
                          component="video"
                          ref={(el) => (videoRefs.current[index] = el)}
                          src={model.video}
                          poster={model.image}
                          muted
                          loop
                          className="model-video"
                          sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            transition: "transform 0.3s ease",
                          }}
                        />
                      ) : (
                        <Box
                          component="img"
                          src={model.image}
                          alt={model.name}
                          className="model-video"
                          sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            transition: "transform 0.3s ease",
                          }}
                        />
                      )}
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
                </Box>
              ))}
            </Box>
          </Box>

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
                onClick={handleBookTestDrive}
                sx={{
                  px: 8,
                  py: 3,
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  borderRadius: 2,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  boxShadow: "0 12px 40px rgba(204, 0, 0, 0.3)",
                  transition: "all 0.3s ease",
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
    </>
  );
};

export default HomePage;
