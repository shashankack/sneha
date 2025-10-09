// Enhanced AI Conversation Flow with all 5 models
export const aiConversationFlow = [
  {
    id: 1,
    type: 'greeting',
    text: 'Welcome to Porsche. I\'m here to help you find your perfect test drive experience.',
    delay: 500
  },
  {
    id: 2,
    type: 'question',
    text: 'What excites you most about driving a Porsche?',
    options: [
      { id: 'performance', text: 'Raw performance and speed', weight: { taycan: 3, '911': 3, cayenne: 1, macan: 2, panamera: 3 } },
      { id: 'luxury', text: 'Luxury and comfort', weight: { taycan: 2, '911': 1, cayenne: 3, macan: 2, panamera: 3 } },
      { id: 'innovation', text: 'Innovation and technology', weight: { taycan: 3, '911': 2, cayenne: 2, macan: 2, panamera: 3 } },
      { id: 'versatility', text: 'Versatility and practicality', weight: { taycan: 1, '911': 1, cayenne: 3, macan: 3, panamera: 2 } }
    ],
    delay: 1000
  },
  {
    id: 3,
    type: 'question',
    text: 'How would you describe your typical driving scenario?',
    options: [
      { id: 'city', text: 'Urban commuting & city life', weight: { taycan: 3, '911': 2, cayenne: 2, macan: 3, panamera: 2 } },
      { id: 'highway', text: 'Long-distance touring', weight: { taycan: 2, '911': 3, cayenne: 2, macan: 1, panamera: 3 } },
      { id: 'track', text: 'Track days and spirited driving', weight: { taycan: 2, '911': 3, cayenne: 1, macan: 1, panamera: 2 } },
      { id: 'family', text: 'Family trips and daily versatility', weight: { taycan: 2, '911': 0, cayenne: 3, macan: 3, panamera: 3 } }
    ],
    delay: 1000
  },
  {
    id: 4,
    type: 'question',
    text: 'What size vehicle best fits your lifestyle?',
    options: [
      { id: 'compact', text: 'Compact & agile sports car', weight: { taycan: 2, '911': 3, cayenne: 0, macan: 2, panamera: 1 } },
      { id: 'midsize', text: 'Midsize luxury sedan/SUV', weight: { taycan: 2, '911': 1, cayenne: 2, macan: 3, panamera: 2 } },
      { id: 'fullsize', text: 'Full-size luxury vehicle', weight: { taycan: 1, '911': 0, cayenne: 3, macan: 1, panamera: 3 } },
      { id: 'flexible', text: 'Flexible - depends on features', weight: { taycan: 2, '911': 2, cayenne: 2, macan: 2, panamera: 2 } }
    ],
    delay: 1000
  },
  {
    id: 5,
    type: 'question',
    text: 'What\'s your priority when it comes to sustainability?',
    options: [
      { id: 'zero-emissions', text: 'Zero emissions is essential', weight: { taycan: 3, '911': 0, cayenne: 1, macan: 0, panamera: 2 } },
      { id: 'hybrid', text: 'Hybrid efficiency matters', weight: { taycan: 2, '911': 0, cayenne: 3, macan: 1, panamera: 3 } },
      { id: 'traditional', text: 'Traditional performance focus', weight: { taycan: 0, '911': 3, cayenne: 1, macan: 2, panamera: 1 } },
      { id: 'balanced', text: 'Balance of performance & efficiency', weight: { taycan: 2, '911': 1, cayenne: 2, macan: 2, panamera: 3 } }
    ],
    delay: 1000
  },
  {
    id: 6,
    type: 'question',
    text: 'What best describes your preferred driving position?',
    options: [
      { id: 'low-sports', text: 'Low sports car seating', weight: { taycan: 3, '911': 3, cayenne: 0, macan: 0, panamera: 2 } },
      { id: 'elevated', text: 'Elevated SUV command position', weight: { taycan: 0, '911': 0, cayenne: 3, macan: 3, panamera: 0 } },
      { id: 'sedan', text: 'Executive sedan comfort', weight: { taycan: 2, '911': 1, cayenne: 1, macan: 1, panamera: 3 } },
      { id: 'any', text: 'I\'m flexible with seating style', weight: { taycan: 2, '911': 2, cayenne: 2, macan: 2, panamera: 2 } }
    ],
    delay: 1000
  },
  {
    id: 7,
    type: 'recommendation',
    text: 'Based on your preferences, I recommend the',
    delay: 1500
  }
];

// Calculate recommended model based on user answers
export const calculateRecommendation = (answers) => {
  const scores = { taycan: 0, '911': 0, cayenne: 0, macan: 0, panamera: 0 };
  
  answers.forEach(answer => {
    if (answer.weight) {
      Object.keys(answer.weight).forEach(model => {
        scores[model] += answer.weight[model];
      });
    }
  });
  
  // Find the model with highest score
  const recommendedModelId = Object.keys(scores).reduce((a, b) => 
    scores[a] > scores[b] ? a : b
  );
  
  return recommendedModelId;
};

// Test drive routes/themes
export const testDriveRoutes = [
  {
    id: 'coastal',
    name: 'Coastal Drive',
    description: 'Scenic coastal roads with ocean views',
    duration: '45 minutes',
    difficulty: 'Easy'
  },
  {
    id: 'mountain',
    name: 'Mountain Pass',
    description: 'Winding mountain roads for dynamic driving',
    duration: '60 minutes',
    difficulty: 'Moderate'
  },
  {
    id: 'urban',
    name: 'Urban Explorer',
    description: 'City streets and highway experience',
    duration: '30 minutes',
    difficulty: 'Easy'
  },
  {
    id: 'performance',
    name: 'Performance Circuit',
    description: 'Track-inspired route for spirited driving',
    duration: '75 minutes',
    difficulty: 'Advanced'
  }
];

// Music streaming options
export const musicOptions = [
  { id: 'spotify', name: 'Spotify', icon: '🎵' },
  { id: 'apple', name: 'Apple Music', icon: '🎶' },
  { id: 'youtube', name: 'YouTube Music', icon: '▶️' }
];
