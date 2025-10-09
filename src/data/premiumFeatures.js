// Test Drive Route Data
export const testDriveRoutes = [
  {
    id: 'city-performance',
    name: 'City Performance Circuit',
    description: 'Urban driving experience with traffic scenarios, parking challenges, and city comfort features',
    duration: '30 minutes',
    distance: '15 km',
    highlights: [
      'Stop-and-go traffic simulation',
      'Parking assist demonstration',
      'City comfort mode testing',
      'Adaptive cruise control',
      'Lane keeping assistance'
    ],
    difficulty: 'Easy',
    scenery: 'Urban cityscape',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop'
  },
  {
    id: 'highway-cruiser',
    name: 'Highway Performance Route',
    description: 'Open road experience showcasing highway performance, acceleration, and long-distance comfort',
    duration: '45 minutes',
    distance: '35 km',
    highlights: [
      'Highway acceleration testing',
      'High-speed stability',
      'Cruise control systems',
      'Wind noise evaluation',
      'Fuel efficiency monitoring'
    ],
    difficulty: 'Medium',
    scenery: 'Open highways',
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=400&fit=crop'
  },
  {
    id: 'scenic-mountain',
    name: 'Scenic Mountain Experience',
    description: 'Winding mountain roads through breathtaking landscapes, perfect for testing cornering dynamics',
    duration: '60 minutes',
    distance: '45 km',
    highlights: [
      'Cornering dynamics',
      'Sport mode activation',
      'Scenic photography stops',
      'Elevation change testing',
      'Panoramic views'
    ],
    difficulty: 'Advanced',
    scenery: 'Mountain landscapes',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop'
  },
  {
    id: 'track-inspired',
    name: 'Track-Inspired Circuit',
    description: 'Closed course experience simulating track conditions for ultimate performance testing',
    duration: '30 minutes',
    distance: '20 km',
    highlights: [
      'Track mode demonstration',
      'Launch control testing',
      'Braking performance',
      'Cornering at speed',
      'Performance data logging'
    ],
    difficulty: 'Expert',
    scenery: 'Professional circuit',
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=400&fit=crop'
  }
];

// Drive Mode Haptic Experiences
export const driveModesHaptics = [
  {
    id: 'comfort',
    name: 'Comfort Mode',
    description: 'Smooth, refined driving experience optimized for daily comfort',
    characteristics: [
      'Soft suspension tuning',
      'Relaxed throttle response',
      'Quiet exhaust note',
      'Optimized for efficiency'
    ],
    hapticPattern: 'subtle',
    icon: 'comfort',
    vibrationIntensity: 'low',
    color: '#4CAF50'
  },
  {
    id: 'sport',
    name: 'Sport Mode',
    description: 'Enhanced performance and responsiveness for spirited driving',
    characteristics: [
      'Firmer suspension',
      'Sharper throttle response',
      'Active exhaust system',
      'Optimized gear shifts'
    ],
    hapticPattern: 'medium',
    icon: 'sport',
    vibrationIntensity: 'medium',
    color: '#FF9800'
  },
  {
    id: 'sport_plus',
    name: 'Sport Plus Mode',
    description: 'Maximum performance and track-ready dynamics for ultimate driving',
    characteristics: [
      'Stiffest suspension setup',
      'Most aggressive throttle',
      'Sport exhaust fully open',
      'Track-focused calibration'
    ],
    hapticPattern: 'intense',
    icon: 'sport_plus',
    vibrationIntensity: 'high',
    color: '#CC0000'
  },
  {
    id: 'individual',
    name: 'Individual Mode',
    description: 'Personalized settings tailored to your specific preferences',
    characteristics: [
      'Customizable suspension',
      'Adjustable throttle response',
      'Selectable exhaust sound',
      'Personal driving profile'
    ],
    hapticPattern: 'custom',
    icon: 'individual',
    vibrationIntensity: 'variable',
    color: '#2196F3'
  }
];

// Music Integration Options
export const musicPlatforms = [
  {
    id: 'spotify',
    name: 'Spotify',
    description: 'Connect your Spotify account for seamless music integration',
    features: [
      'Your personal playlists',
      'Discover Weekly integration',
      'Voice control support',
      'High-quality streaming'
    ],
    color: '#1DB954',
    icon: 'spotify'
  },
  {
    id: 'apple_music',
    name: 'Apple Music',
    description: 'Sync with Apple Music for premium audio experience',
    features: [
      'Lossless audio quality',
      'Spatial audio support',
      'Personal library sync',
      'Siri integration'
    ],
    color: '#000000',
    icon: 'apple'
  },
  {
    id: 'youtube_music',
    name: 'YouTube Music',
    description: 'Access millions of songs and music videos',
    features: [
      'Music video playback',
      'Personalized mixes',
      'Voice search',
      'Ad-free experience'
    ],
    color: '#FF0000',
    icon: 'youtube'
  }
];

// Porsche Experience Curated Playlists
export const curatedPlaylists = [
  {
    id: 'porsche_drive',
    name: 'Porsche Drive',
    description: 'Curated driving playlist by Porsche',
    tracks: 25,
    duration: '1h 32m',
    mood: 'Energetic',
    genre: 'Electronic/Rock'
  },
  {
    id: 'city_cruiser',
    name: 'City Cruiser',
    description: 'Perfect for urban driving experiences',
    tracks: 20,
    duration: '1h 15m',
    mood: 'Smooth',
    genre: 'Jazz/Ambient'
  },
  {
    id: 'track_day',
    name: 'Track Day Anthems',
    description: 'High-energy tracks for performance driving',
    tracks: 30,
    duration: '2h 10m',
    mood: 'Intense',
    genre: 'Rock/Electronic'
  },
  {
    id: 'scenic_journey',
    name: 'Scenic Journey',
    description: 'Atmospheric music for beautiful landscapes',
    tracks: 18,
    duration: '1h 25m',
    mood: 'Atmospheric',
    genre: 'Ambient/Classical'
  }
];

// Post-Drive Follow-up Protocol
export const postDriveProtocol = {
  timeline: [
    {
      phase: 'immediate',
      timing: '0-15 minutes',
      description: 'Vehicle return and initial feedback',
      actions: [
        'Professional photo capture',
        'Initial experience questionnaire',
        'Performance data review',
        'Digital business card exchange'
      ]
    },
    {
      phase: 'reflection',
      timing: '2 hours',
      description: 'Personalized follow-up communication',
      actions: [
        'Curated photo delivery',
        'Digital feature summary',
        'Personalized vehicle recommendations',
        'Financing options presentation'
      ]
    },
    {
      phase: 'consultation',
      timing: '24-48 hours',
      description: 'Dedicated consultation call',
      actions: [
        'One-on-one specialist consultation',
        'Customization options review',
        'Trade-in evaluation',
        'Delivery timeline discussion'
      ]
    },
    {
      phase: 'relationship',
      timing: '1 week',
      description: 'Long-term relationship building',
      actions: [
        'Porsche experience invitation',
        'Owner community introduction',
        'Service center walkthrough',
        'Exclusive event invitations'
      ]
    }
  ],
  deliverables: [
    {
      type: 'photo_package',
      description: '2-3 professional photos of you with the vehicle',
      format: 'High-resolution digital images',
      delivery: 'Within 2 hours'
    },
    {
      type: 'feature_summary',
      description: 'Personalized PDF highlighting discussed features',
      format: 'Interactive digital brochure',
      delivery: 'Within 2 hours'
    },
    {
      type: 'performance_data',
      description: 'Telemetry data from your test drive',
      format: 'Digital dashboard and insights',
      delivery: 'Within 4 hours'
    },
    {
      type: 'consultation_booking',
      description: 'Dedicated time with Porsche specialist',
      format: 'Video call or in-person meeting',
      delivery: 'Within 48 hours'
    }
  ]
};

// AR/VR Preview Features
export const arVrFeatures = [
  {
    id: 'driveway_preview',
    name: 'Driveway Preview',
    description: 'See your chosen Porsche in your actual driveway',
    requirements: ['Camera access', 'AR-capable device'],
    features: [
      '360-degree vehicle visualization',
      'Color and wheel customization',
      'Real-time lighting effects',
      'Photo capture and sharing'
    ]
  },
  {
    id: 'garage_fit',
    name: 'Garage Fit Check',
    description: 'Ensure your Porsche fits perfectly in your garage',
    requirements: ['Camera access', 'AR measurement tools'],
    features: [
      'Precise dimension overlay',
      'Clearance visualization',
      'Parking guidance',
      'Space optimization tips'
    ]
  },
  {
    id: 'virtual_interior',
    name: 'Virtual Interior Experience',
    description: 'Explore the interior in immersive VR',
    requirements: ['VR headset or mobile VR'],
    features: [
      'Interactive cockpit exploration',
      'Material and color customization',
      'Feature demonstrations',
      'Driving position simulation'
    ]
  },
  {
    id: 'track_preview',
    name: 'Track Performance Preview',
    description: 'Experience your test drive route in virtual reality',
    requirements: ['VR headset recommended'],
    features: [
      'Route familiarization',
      'Performance mode demonstration',
      'Virtual coaching',
      'Safety briefing'
    ]
  }
];

export const getRouteById = (id) => {
  return testDriveRoutes.find(route => route.id === id);
};

export const getDriveModeById = (id) => {
  return driveModesHaptics.find(mode => mode.id === id);
};

export const getMusicPlatformById = (id) => {
  return musicPlatforms.find(platform => platform.id === id);
};

export const getPlaylistById = (id) => {
  return curatedPlaylists.find(playlist => playlist.id === id);
};