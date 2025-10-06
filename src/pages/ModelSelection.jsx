import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Grid,
  Chip,
  LinearProgress
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useBooking } from '../contexts/BookingContext';
import { porscheModels } from '../data/models';
import { aiConversationFlow, calculateRecommendation } from '../data/aiConversation';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

const ModelSelection = () => {
  const { handleSelectModel, addAiAnswer, nextStep, aiAnswers } = useBooking();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [recommendedModel, setRecommendedModel] = useState(null);
  const [showRecommendation, setShowRecommendation] = useState(false);

  const isAiComplete = currentQuestion >= aiConversationFlow.filter(q => q.type === 'question').length;

  useEffect(() => {
    if (isAiComplete && !showRecommendation) {
      // Calculate recommendation
      const modelId = calculateRecommendation(selectedAnswers);
      const model = porscheModels.find(m => m.id === modelId);
      setRecommendedModel(model);
      
      setTimeout(() => {
        setShowRecommendation(true);
      }, 1000);
    }
  }, [isAiComplete, selectedAnswers, showRecommendation]);

  const handleAnswer = (option) => {
    setSelectedAnswers([...selectedAnswers, option]);
    addAiAnswer(option);
    setCurrentQuestion(currentQuestion + 1);
  };

  const handleSelectModelClick = (model) => {
    handleSelectModel(model);
    nextStep();
  };

  const progress = (currentQuestion / aiConversationFlow.filter(q => q.type === 'question').length) * 100;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 8 }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h2" align="center" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
            1/3. Find Your Ideal Porsche
          </Typography>
          
          {!showRecommendation ? (
            <Box sx={{ mb: 6 }}>
              <LinearProgress 
                variant="determinate" 
                value={progress} 
                sx={{ 
                  height: 6, 
                  borderRadius: 3,
                  bgcolor: 'grey.200',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: 'primary.main'
                  }
                }} 
              />
            </Box>
          ) : null}

          <AnimatePresence mode="wait">
            {!isAiComplete ? (
              aiConversationFlow
                .filter(item => item.type === 'question')
                .map((question, index) => {
                  if (index === currentQuestion) {
                    return (
                      <motion.div
                        key={question.id}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Card sx={{ mb: 4, p: 3 }}>
                          <CardContent>
                            <Typography variant="h5" gutterBottom sx={{ mb: 4, fontWeight: 500 }}>
                              {question.text}
                            </Typography>
                            <Grid container spacing={2}>
                              {question.options.map((option) => (
                                <Grid item xs={12} sm={6} key={option.id}>
                                  <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    <Button
                                      variant="outlined"
                                      fullWidth
                                      onClick={() => handleAnswer(option)}
                                      sx={{
                                        py: 2,
                                        textAlign: 'left',
                                        justifyContent: 'flex-start',
                                        borderWidth: 2,
                                        '&:hover': {
                                          borderWidth: 2,
                                          bgcolor: 'action.hover'
                                        }
                                      }}
                                    >
                                      {option.text}
                                    </Button>
                                  </motion.div>
                                </Grid>
                              ))}
                            </Grid>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  }
                  return null;
                })
            ) : showRecommendation && recommendedModel ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                  <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
                    Based on your preferences, we recommend the
                  </Typography>
                  <Typography variant="h3" color="primary" sx={{ fontWeight: 700 }}>
                    {recommendedModel.name}
                  </Typography>
                </Box>

                <Card 
                  component={motion.div}
                  whileHover={{ y: -8 }}
                  sx={{ mb: 4, overflow: 'hidden' }}
                >
                  <CardMedia
                    component="img"
                    height="400"
                    image={recommendedModel.image}
                    alt={recommendedModel.name}
                    sx={{ objectFit: 'contain', bgcolor: 'grey.50' }}
                  />
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                      {recommendedModel.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      {recommendedModel.description}
                    </Typography>
                    
                    <Box sx={{ my: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      <Chip icon={<ElectricBoltIcon />} label={recommendedModel.type} />
                      <Chip icon={<DirectionsCarIcon />} label={recommendedModel.seats} />
                      <Chip label={recommendedModel.doors} />
                    </Box>

                    <Grid container spacing={2} sx={{ mb: 3 }}>
                      {recommendedModel.features.map((feature, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CheckCircleIcon color="primary" fontSize="small" />
                            <Typography variant="body2">{feature}</Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>

                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      {recommendedModel.price}
                    </Typography>

                    <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={() => handleSelectModelClick(recommendedModel)}
                        sx={{ px: 6, py: 1.5 }}
                      >
                        Select This Model
                      </Button>
                    </Box>
                  </CardContent>
                </Card>

                <Typography variant="h6" align="center" gutterBottom sx={{ mt: 6, mb: 3 }}>
                  Or explore all models:
                </Typography>
                <Grid container spacing={3}>
                  {porscheModels.map((model) => (
                    <Grid item xs={12} md={4} key={model.id}>
                      <Card 
                        component={motion.div}
                        whileHover={{ y: -4 }}
                        sx={{ height: '100%', cursor: 'pointer' }}
                        onClick={() => handleSelectModelClick(model)}
                      >
                        <CardMedia
                          component="img"
                          height="200"
                          image={model.image}
                          alt={model.name}
                          sx={{ objectFit: 'contain', bgcolor: 'grey.50' }}
                        />
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            {model.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" noWrap>
                            {model.title}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ModelSelection;
