import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Avatar,
  Paper,
  Fade,
  InputAdornment,
  Button,
  Stack,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import SendIcon from "@mui/icons-material/Send";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PersonIcon from "@mui/icons-material/Person";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import { calculateRecommendation } from "../data/aiConversation";
import { porscheModels } from "../data/models";
import { useBooking } from "../contexts/BookingContext";
import AuthModal from "./AuthModal";

const ChatModal = ({ isOpen: externalIsOpen, onClose: externalOnClose }) => {
  const { updateSelectedModel } = useBooking();
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const setIsOpen =
    externalOnClose !== undefined
      ? (value) => {
          if (!value) externalOnClose();
        }
      : setInternalIsOpen;
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [recommendedModel, setRecommendedModel] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const [bookingStep, setBookingStep] = useState("chat"); // 'chat', 'booking-details', 'auth'
  const [bookingData, setBookingData] = useState({
    serviceType: null,
    date: null,
    time: null,
    location: null,
  });
  const [showAuthModal, setShowAuthModal] = useState(false);
  const messagesEndRef = useRef(null);

  const conversationFlow = [
    {
      id: "greeting",
      aiMessage:
        "Hello! I'm your Porsche AI Concierge. I'm here to help you find the perfect Porsche for your test drive. What excites you most about driving a Porsche?",
      options: [
        {
          id: "performance",
          text: "Raw performance and speed",
          weight: { taycan: 3, 911: 3, cayenne: 1 },
        },
        {
          id: "luxury",
          text: "Luxury and comfort",
          weight: { taycan: 2, 911: 1, cayenne: 3 },
        },
        {
          id: "innovation",
          text: "Innovation and technology",
          weight: { taycan: 3, 911: 2, cayenne: 2 },
        },
        {
          id: "versatility",
          text: "Versatility and practicality",
          weight: { taycan: 1, 911: 1, cayenne: 3 },
        },
      ],
    },
    {
      id: "scenario",
      aiMessage:
        "Excellent choice! Now, tell me about your typical driving scenario:",
      options: [
        {
          id: "city",
          text: "City commuting",
          weight: { taycan: 3, 911: 2, cayenne: 2 },
        },
        {
          id: "highway",
          text: "Long highway drives",
          weight: { taycan: 2, 911: 3, cayenne: 2 },
        },
        {
          id: "track",
          text: "Track days and spirited driving",
          weight: { taycan: 2, 911: 3, cayenne: 1 },
        },
        {
          id: "family",
          text: "Family trips and daily use",
          weight: { taycan: 2, 911: 1, cayenne: 3 },
        },
      ],
    },
    {
      id: "environment",
      aiMessage:
        "Great! One final question - what's your priority regarding environmental impact?",
      options: [
        {
          id: "zero-emissions",
          text: "Zero emissions is essential",
          weight: { taycan: 3, 911: 0, cayenne: 1 },
        },
        {
          id: "hybrid",
          text: "Hybrid efficiency matters",
          weight: { taycan: 2, 911: 0, cayenne: 3 },
        },
        {
          id: "traditional",
          text: "Traditional performance focus",
          weight: { taycan: 0, 911: 3, cayenne: 1 },
        },
        {
          id: "balanced",
          text: "Balance of performance and efficiency",
          weight: { taycan: 2, 911: 1, cayenne: 2 },
        },
      ],
    },
  ];

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initial greeting when chat opens
      setTimeout(() => {
        addAIMessage(
          conversationFlow[0].aiMessage,
          conversationFlow[0].options
        );
      }, 500);
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addAIMessage = (text, options = null, expectsInput = false) => {
    const newMessage = {
      id: Date.now(),
      type: "ai",
      text,
      options,
      expectsInput,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const addUserMessage = (text) => {
    const newMessage = {
      id: Date.now(),
      type: "user",
      text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleOptionClick = (option) => {
    addUserMessage(option.text);

    // Handle booking action
    if (option.isBookingAction) {
      addAIMessage(
        "Perfect! Let's get your test drive scheduled. How would you like to experience your Porsche?",
        [
          {
            id: "center-visit",
            text: "Visit Porsche Centre",
            type: "service-selection",
          },
          {
            id: "concierge",
            text: "Concierge Delivery ($500 deposit)",
            type: "service-selection",
          },
        ]
      );
      setBookingStep("booking-details");
      return;
    }

    // Handle service selection
    if (option.type === "service-selection") {
      setBookingData((prev) => ({ ...prev, serviceType: option.id }));

      if (option.id === "center-visit") {
        addAIMessage("Great choice! Which Porsche Centre would you prefer?", [
          {
            id: "sydney",
            text: "Porsche Centre Sydney",
            type: "location-selection",
          },
          {
            id: "melbourne",
            text: "Porsche Centre Melbourne",
            type: "location-selection",
          },
          {
            id: "brisbane",
            text: "Porsche Centre Brisbane",
            type: "location-selection",
          },
        ]);
      } else {
        // Concierge delivery selected - redirect to detailed form
        login(); // Set authentication state for route protection
        addAIMessage(
          "Excellent choice! I'll redirect you to our concierge details form where you can provide your delivery address and preferences.",
          [{ id: "continue-concierge", text: "Continue to Details", type: "concierge-redirect" }]
        );
        setBookingData((prev) => ({ ...prev, serviceType: "concierge", location: "delivery" }));
      }
      return;
    }

    // Handle concierge redirect
    if (option.type === "concierge-redirect") {
      // Store current booking data for the concierge page
      sessionStorage.setItem('selectedModel', recommendedModel?.name || 'Taycan');
      navigate('/concierge');
      setIsOpen(false);
      return;
    }

    // Handle location selection
    if (option.type === "location-selection") {
      setBookingData((prev) => ({ ...prev, location: option.id }));
      addAIMessage(
        "Perfect! When would you like to schedule your test drive?",
        [
          { id: "today", text: "Today", type: "date-selection" },
          { id: "tomorrow", text: "Tomorrow", type: "date-selection" },
          { id: "this-weekend", text: "This Weekend", type: "date-selection" },
          { id: "next-week", text: "Next Week", type: "date-selection" },
        ]
      );
      return;
    }

    // Handle date selection
    if (option.type === "date-selection") {
      setBookingData((prev) => ({ ...prev, date: option.text }));
      addAIMessage("Excellent! What time works best for you?", [
        { id: "morning", text: "9:00 AM - 12:00 PM", type: "time-selection" },
        { id: "afternoon", text: "1:00 PM - 5:00 PM", type: "time-selection" },
        { id: "evening", text: "6:00 PM - 8:00 PM", type: "time-selection" },
      ]);
      return;
    }

    // Handle time selection
    if (option.type === "time-selection") {
      setBookingData((prev) => ({ ...prev, time: option.text }));
      addAIMessage(
        `Perfect! Your ${recommendedModel?.name} test drive is scheduled for ${bookingData.date} at ${option.text}. To confirm your booking, please sign in to your Porsche ID.`,
        [{ id: "sign-in", text: "Sign In / Sign Up", type: "auth-action" }]
      );
      setBookingStep("auth");
      return;
    }

    // Handle auth action
    if (option.type === "auth-action") {
      setShowAuthModal(true);
      return;
    }

    const updatedAnswers = {
      ...userAnswers,
      [conversationFlow[currentStep].id]: option,
    };
    setUserAnswers(updatedAnswers);

    setTimeout(() => {
      if (currentStep < conversationFlow.length - 1) {
        const nextStep = currentStep + 1;
        setCurrentStep(nextStep);
        addAIMessage(
          conversationFlow[nextStep].aiMessage,
          conversationFlow[nextStep].options
        );
      } else {
        // Calculate recommendation
        const modelId = calculateRecommendation(Object.values(updatedAnswers));
        const model = porscheModels.find((m) => m.id === modelId);
        setRecommendedModel(model);

        setTimeout(() => {
          addAIMessage(
            `Perfect! Based on your preferences, I recommend the ${model.name}. ${model.description}`
          );
          setTimeout(() => {
            addAIMessage(
              `The ${model.name} features: ${model.features.join(
                ", "
              )}. Starting ${
                model.price
              }. Would you like to schedule a test drive?`,
              [
                {
                  id: "book-test-drive",
                  text: "Book Test Drive",
                  isBookingAction: true,
                },
              ]
            );
          }, 1000);
          setIsComplete(true);
          // Update the selected model in the booking context
          updateSelectedModel(model);
        }, 1000);
      }
    }, 1000);
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      addUserMessage(inputValue);

      // Handle address input for concierge service
      if (
        bookingStep === "booking-details" &&
        bookingData.serviceType === "concierge" &&
        !bookingData.location
      ) {
        setBookingData((prev) => ({ ...prev, location: inputValue }));
        setInputValue("");

        setTimeout(() => {
          addAIMessage(
            "Perfect! When would you like to schedule your test drive?",
            [
              { id: "today", text: "Today", type: "date-selection" },
              { id: "tomorrow", text: "Tomorrow", type: "date-selection" },
              {
                id: "this-weekend",
                text: "This Weekend",
                type: "date-selection",
              },
              { id: "next-week", text: "Next Week", type: "date-selection" },
            ]
          );
        }, 1000);
        return;
      }

      setInputValue("");

      // Simulate AI response for free-form questions
      setTimeout(() => {
        addAIMessage(
          "Thanks for your message! I'd love to help you with that. For the best experience, please use the guided questions above to find your perfect Porsche match."
        );
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const resetChat = () => {
    setMessages([]);
    setCurrentStep(0);
    setUserAnswers({});
    setRecommendedModel(null);
    setIsComplete(false);
    setTimeout(() => {
      addAIMessage(conversationFlow[0].aiMessage, conversationFlow[0].options);
    }, 500);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <IconButton
              onClick={() => setIsOpen(true)}
              sx={{
                position: "fixed",
                bottom: 24,
                right: 24,
                width: 60,
                height: 60,
                bgcolor: "#CC0000",
                color: "white",
                boxShadow: "0 8px 32px rgba(204, 0, 0, 0.3)",
                zIndex: 1000,
                "&:hover": {
                  bgcolor: "#AA0000",
                  transform: "scale(1.1)",
                  boxShadow: "0 12px 40px rgba(204, 0, 0, 0.4)",
                },
                transition: "all 0.3s ease",
              }}
            >
              <ChatIcon sx={{ fontSize: 28 }} />
            </IconButton>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Paper
              elevation={16}
              sx={{
                position: "fixed",
                bottom: 24,
                right: 24,
                width: 400,
                height: 500,
                display: "flex",
                flexDirection: "column",
                borderRadius: 3,
                overflow: "hidden",
                zIndex: 1000,
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.2)",
              }}
            >
              {/* Header */}
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                This will be voice assisted in future
              </Typography>
              <Box
                sx={{
                  bgcolor: "#CC0000",
                  color: "white",
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Avatar
                    sx={{
                      bgcolor: "rgba(255,255,255,0.2)",
                      width: 32,
                      height: 32,
                    }}
                  >
                    <SmartToyIcon sx={{ fontSize: 18 }} />
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Porsche AI Concierge (Demo Only)
                  </Typography>
                </Box>
                <IconButton
                  onClick={() => setIsOpen(false)}
                  sx={{ color: "white", p: 0.5 }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>

              {/* Messages */}
              <Box
                sx={{
                  flex: 1,
                  overflowY: "auto",
                  p: 2,
                  bgcolor: "#F8F9FA",
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent:
                          message.type === "user" ? "flex-end" : "flex-start",
                        mb: 1,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 1,
                          maxWidth: "80%",
                          flexDirection:
                            message.type === "user" ? "row-reverse" : "row",
                        }}
                      >
                        <Avatar
                          sx={{
                            width: 32,
                            height: 32,
                            bgcolor:
                              message.type === "user" ? "#CC0000" : "#E0E0E0",
                          }}
                        >
                          {message.type === "user" ? (
                            <PersonIcon sx={{ fontSize: 18 }} />
                          ) : (
                            <SmartToyIcon
                              sx={{ fontSize: 18, color: "#666" }}
                            />
                          )}
                        </Avatar>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                          }}
                        >
                          <Paper
                            elevation={1}
                            sx={{
                              p: 2,
                              bgcolor:
                                message.type === "user" ? "#CC0000" : "white",
                              color:
                                message.type === "user" ? "white" : "black",
                              borderRadius: 2,
                              maxWidth: "100%",
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{ lineHeight: 1.5 }}
                            >
                              {message.text}
                            </Typography>
                          </Paper>

                          {/* Option buttons for AI messages */}
                          {message.type === "ai" && message.options && (
                            <Stack spacing={1} sx={{ mt: 1 }}>
                              {message.options.map((option) => (
                                <Button
                                  key={option.id}
                                  variant="outlined"
                                  size="small"
                                  onClick={() => handleOptionClick(option)}
                                  sx={{
                                    borderColor: "#CC0000",
                                    color: "#CC0000",
                                    textAlign: "left",
                                    justifyContent: "flex-start",
                                    "&:hover": {
                                      bgcolor: "#CC0000",
                                      color: "white",
                                    },
                                    textTransform: "none",
                                    fontSize: "0.875rem",
                                  }}
                                >
                                  {option.text}
                                </Button>
                              ))}
                            </Stack>
                          )}
                        </Box>
                      </Box>
                    </Box>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </Box>

              {/* Input */}
              <Box sx={{ p: 2, bgcolor: "white" }}>
                {isComplete && (
                  <Box sx={{ mb: 2 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={resetChat}
                      sx={{
                        bgcolor: "#CC0000",
                        "&:hover": { bgcolor: "#AA0000" },
                        mb: 1,
                      }}
                    >
                      Start New Recommendation
                    </Button>
                  </Box>
                )}
                <TextField
                  fullWidth
                  placeholder="Type your message..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  multiline
                  maxRows={3}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleSendMessage}
                          disabled={!inputValue.trim()}
                          sx={{
                            color: "#CC0000",
                            "&:disabled": { color: "rgba(0, 0, 0, 0.26)" },
                          }}
                        >
                          <SendIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#CC0000",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#CC0000",
                      },
                    },
                  }}
                />
              </Box>
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Authentication Modal */}
      <AuthModal
        open={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => {
          addAIMessage(
            "🎉 Booking confirmed! Your test drive is all set. We'll send you a confirmation email shortly."
          );
          setTimeout(() => {
            addAIMessage(
              "Would you like to explore our other services or start a new conversation?",
              [
                {
                  id: "new-conversation",
                  text: "New Conversation",
                  type: "reset-action",
                },
              ]
            );
          }, 2000);
        }}
      />
    </>
  );
};

export default ChatModal;
