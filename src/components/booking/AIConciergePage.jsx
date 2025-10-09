import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  Avatar,
  IconButton,
  Divider,
  LinearProgress,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useBooking } from "../../contexts/BookingContext";
import { porscheModels } from "../../data/models";

// Icons
import SmartToyIcon from "@mui/icons-material/SmartToy";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";

const aiQuestions = [
  {
    id: "driving_style",
    question: "How would you describe your ideal driving experience?",
    options: [
      {
        value: "performance",
        label: "Pure Performance & Speed",
        weight: { 911: 3, taycan: 2, cayenne: 1, macan: 2, panamera: 3 },
      },
      {
        value: "luxury",
        label: "Luxury & Comfort",
        weight: { 911: 1, taycan: 2, cayenne: 3, macan: 2, panamera: 3 },
      },
      {
        value: "eco",
        label: "Eco-Friendly & Efficient",
        weight: { 911: 0, taycan: 3, cayenne: 2, macan: 1, panamera: 2 },
      },
      {
        value: "versatile",
        label: "Versatile & Practical",
        weight: { 911: 1, taycan: 2, cayenne: 3, macan: 3, panamera: 2 },
      },
    ],
  },
  {
    id: "usage",
    question: "How do you plan to use your Porsche primarily?",
    options: [
      {
        value: "daily",
        label: "Daily Commuting",
        weight: { 911: 1, taycan: 3, cayenne: 2, macan: 3, panamera: 2 },
      },
      {
        value: "weekend",
        label: "Weekend Adventures",
        weight: { 911: 3, taycan: 2, cayenne: 2, macan: 2, panamera: 2 },
      },
      {
        value: "track",
        label: "Track Days & Sports Driving",
        weight: { 911: 3, taycan: 2, cayenne: 0, macan: 1, panamera: 2 },
      },
      {
        value: "family",
        label: "Family Transportation",
        weight: { 911: 0, taycan: 2, cayenne: 3, macan: 3, panamera: 3 },
      },
    ],
  },
  {
    id: "vehicle_size",
    question: "What vehicle size best suits your lifestyle?",
    options: [
      {
        value: "compact",
        label: "Compact & Agile",
        weight: { 911: 3, taycan: 2, cayenne: 0, macan: 2, panamera: 1 },
      },
      {
        value: "midsize",
        label: "Midsize Versatility",
        weight: { 911: 1, taycan: 2, cayenne: 2, macan: 3, panamera: 2 },
      },
      {
        value: "fullsize",
        label: "Full-Size Luxury",
        weight: { 911: 0, taycan: 1, cayenne: 3, macan: 1, panamera: 3 },
      },
      {
        value: "flexible",
        label: "Size Doesn't Matter",
        weight: { 911: 2, taycan: 2, cayenne: 2, macan: 2, panamera: 2 },
      },
    ],
  },
  {
    id: "priority",
    question: "What's most important to you in a vehicle?",
    options: [
      {
        value: "performance",
        label: "Raw Performance",
        weight: { 911: 3, taycan: 2, cayenne: 1, macan: 2, panamera: 3 },
      },
      {
        value: "technology",
        label: "Latest Technology",
        weight: { 911: 2, taycan: 3, cayenne: 2, macan: 2, panamera: 3 },
      },
      {
        value: "heritage",
        label: "Heritage & Tradition",
        weight: { 911: 3, taycan: 1, cayenne: 1, macan: 1, panamera: 2 },
      },
      {
        value: "sustainability",
        label: "Environmental Responsibility",
        weight: { 911: 0, taycan: 3, cayenne: 2, macan: 1, panamera: 2 },
      },
    ],
  },
  {
    id: "seating",
    question: "What's your preferred driving position?",
    options: [
      {
        value: "low-sports",
        label: "Low Sports Car Seating",
        weight: { 911: 3, taycan: 3, cayenne: 0, macan: 0, panamera: 2 },
      },
      {
        value: "elevated",
        label: "Elevated SUV Position",
        weight: { 911: 0, taycan: 0, cayenne: 3, macan: 3, panamera: 0 },
      },
      {
        value: "sedan",
        label: "Executive Sedan Comfort",
        weight: { 911: 1, taycan: 2, cayenne: 1, macan: 1, panamera: 3 },
      },
      {
        value: "flexible",
        label: "No Strong Preference",
        weight: { 911: 2, taycan: 2, cayenne: 2, macan: 2, panamera: 2 },
      },
    ],
  },
];

const AIConciergePage = ({ onNext }) => {
  const { selectedModel, updateSelectedModel, aiAnswers, setAiAnswers } =
    useBooking();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState(null);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // AI Voice Synthesis
  const speakText = (text) => {
    if (isVoiceEnabled && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      speechSynthesis.speak(utterance);
    }
  };

  // Calculate AI Suggestion based on answers
  const calculateSuggestion = () => {
    const scores = { 911: 0, taycan: 0, cayenne: 0, macan: 0, panamera: 0 };

    Object.entries(answers).forEach(([questionId, answer]) => {
      const question = aiQuestions.find((q) => q.id === questionId);
      const option = question?.options.find((opt) => opt.value === answer);

      if (option) {
        Object.entries(option.weight).forEach(([model, weight]) => {
          scores[model] += weight;
        });
      }
    });

    const suggestedModelId = Object.entries(scores).reduce((a, b) =>
      scores[a[0]] > scores[b[0]] ? a : b
    )[0];

    const suggestedModel = porscheModels.find(
      (model) => model.id === suggestedModelId
    );
    return suggestedModel;
  };

  const handleAnswerSelect = (questionId, value) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    // Auto-advance to next question
    setTimeout(() => {
      if (currentQuestion < aiQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        const nextQuestion = aiQuestions[currentQuestion + 1];
        speakText(nextQuestion.question);
      } else {
        // All questions answered, show AI analysis
        setIsAnalyzing(true);
        setTimeout(() => {
          const suggestion = calculateSuggestion();
          setAiSuggestion(suggestion);
          setShowSuggestion(true);
          setIsAnalyzing(false);
          speakText(
            `Based on your preferences, I recommend the ${suggestion.name}. ${suggestion.description}`
          );
        }, 2000);
      }
    }, 800);
  };

  const handleModelSelect = (model) => {
    updateSelectedModel(model);
    setAiAnswers(Object.entries(answers));
    onNext();
  };

  const handleAcceptSuggestion = () => {
    handleModelSelect(aiSuggestion);
  };

  // Speak first question on mount
  useEffect(() => {
    if (isVoiceEnabled && aiQuestions[0]) {
      setTimeout(() => {
        speakText(
          `Welcome to Porsche AI Concierge. ${aiQuestions[0].question}`
        );
      }, 1000);
    }
  }, [isVoiceEnabled]);

  return (
    <Box sx={{ p: 4 }}>
      {/* AI Assistant Header */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <Avatar
          sx={{
            width: 64,
            height: 64,
            bgcolor: "#CC0000",
            mr: 3,
            boxShadow: "0 8px 32px rgba(204, 0, 0, 0.3)",
          }}
        >
          <SmartToyIcon sx={{ fontSize: 32, color: "white" }} />
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, color: "#CC0000", mb: 1 }}
          >
            Porsche AI Concierge
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            Let me help you find the perfect Porsche for your lifestyle
          </Typography>
        </Box>
        <IconButton
          onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
          sx={{
            bgcolor: isVoiceEnabled ? "#CC0000" : "rgba(0, 0, 0, 0.1)",
            color: isVoiceEnabled ? "white" : "inherit",
            "&:hover": {
              bgcolor: isVoiceEnabled ? "#B30000" : "rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          {isVoiceEnabled ? <VolumeUpIcon /> : <VolumeOffIcon />}
        </IconButton>
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* Questions Section */}
      {!showSuggestion && !isAnalyzing && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ mb: 4 }}>
            <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
              Question {currentQuestion + 1} of {aiQuestions.length}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={((currentQuestion + 1) / aiQuestions.length) * 100}
              sx={{
                height: 8,
                borderRadius: 4,
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#CC0000",
                },
              }}
            />
          </Box>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              <Typography
                variant="h5"
                sx={{ fontWeight: 600, mb: 4, color: "#1a1a1a" }}
              >
                {aiQuestions[currentQuestion]?.question}
              </Typography>

              <Grid container spacing={3}>
                {aiQuestions[currentQuestion]?.options.map((option) => (
                  <Grid
                    size={{
                      xs: 12,
                      sm: 6,
                      md: 4,
                    }}
                    key={option.value}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card
                        onClick={() =>
                          handleAnswerSelect(
                            aiQuestions[currentQuestion].id,
                            option.value
                          )
                        }
                        sx={{
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          border:
                            answers[aiQuestions[currentQuestion]?.id] ===
                            option.value
                              ? "2px solid #CC0000"
                              : "2px solid transparent",
                          "&:hover": {
                            boxShadow: "0 8px 32px rgba(204, 0, 0, 0.15)",
                            transform: "translateY(-4px)",
                          },
                        }}
                      >
                        <CardContent sx={{ p: 3 }}>
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: 600, mb: 1 }}
                          >
                            {option.label}
                          </Typography>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* AI Analysis Loading */}
      {isAnalyzing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: "center", py: 8 }}>
            <SmartToyIcon sx={{ fontSize: 80, color: "#CC0000", mb: 3 }} />
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              Analyzing Your Preferences...
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", mb: 4 }}>
              Our AI is processing your answers to find the perfect Porsche for
              you
            </Typography>
            <LinearProgress
              sx={{
                maxWidth: 400,
                mx: "auto",
                height: 8,
                borderRadius: 4,
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#CC0000",
                },
              }}
            />
          </Box>
        </motion.div>
      )}

      {/* AI Suggestion */}
      {showSuggestion && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, mb: 2, color: "#CC0000" }}
            >
              AI Recommendation
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "text.secondary", maxWidth: 600, mx: "auto" }}
            >
              Based on your preferences, I've found the perfect Porsche for you
            </Typography>
          </Box>

          <Card
            sx={{
              maxWidth: 600,
              mx: "auto",
              mb: 4,
              background: "linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)",
              border: "2px solid #CC0000",
              borderRadius: 3,
              overflow: "hidden",
            }}
          >
            <Box sx={{ position: "relative" }}>
              <Box
                component="img"
                src={aiSuggestion?.image}
                alt={aiSuggestion?.name}
                sx={{
                  width: "100%",
                  height: 350,
                  objectFit: "cover",
                }}
              />
              <Chip
                label="AI RECOMMENDED"
                sx={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  bgcolor: "#CC0000",
                  color: "white",
                  fontWeight: 700,
                }}
              />
            </Box>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                {aiSuggestion?.name}
              </Typography>
              <Typography variant="h6" sx={{ color: "#CC0000", mb: 2 }}>
                {aiSuggestion?.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "text.secondary", mb: 3 }}
              >
                {aiSuggestion?.description}
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#1a1a1a" }}
              >
                {aiSuggestion?.price}
              </Typography>
            </CardContent>
          </Card>

          <Box
            sx={{ display: "flex", gap: 2, justifyContent: "center", mb: 4 }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={handleAcceptSuggestion}
              sx={{
                px: 6,
                py: 2,
                fontSize: "1.1rem",
                fontWeight: 700,
                borderRadius: 2,
                bgcolor: "#CC0000",
                "&:hover": {
                  bgcolor: "#B30000",
                  transform: "translateY(-2px)",
                },
              }}
            >
              Perfect! Book This Model
            </Button>
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* Alternative Model Selection */}
          <Typography
            variant="h5"
            sx={{ fontWeight: 600, mb: 3, textAlign: "center" }}
          >
            Or Choose Your Preferred Model
          </Typography>

          <Grid container spacing={3}>
            {porscheModels.map((model) => (
              <Grid
                size={{
                  xs: 12,
                  sm: 6,
                  md: 4,
                }}
                key={model.id}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card
                    onClick={() => handleModelSelect(model)}
                    sx={{
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      border:
                        model.id === aiSuggestion?.id
                          ? "2px solid #CC0000"
                          : "1px solid rgba(0, 0, 0, 0.1)",
                      "&:hover": {
                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                        transform: "translateY(-4px)",
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src={model.image}
                      alt={model.name}
                      sx={{
                        width: "100%",
                        height: 180,
                        objectFit: "cover",
                      }}
                    />
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                        {model.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary", mb: 2 }}
                      >
                        {model.title}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 700, color: "#CC0000" }}
                      >
                        {model.price}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      )}
    </Box>
  );
};

export default AIConciergePage;
