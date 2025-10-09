import React, { createContext, useContext, useState } from 'react';

// Create the Booking Context
const BookingContext = createContext();

// Custom hook to use the Booking Context
export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

// Booking Provider Component
export const BookingProvider = ({ children }) => {
  // Step management for the new 3-step booking process
  const [step, setStep] = useState(0); // 0: AI Concierge, 1: Center/Service Selection, 2: Verification/Payment
  
  // Selected model data
  const [selectedModel, setSelectedModel] = useState(null);
  
  // AI conversation answers and analysis
  const [aiAnswers, setAiAnswers] = useState([]);
  const [aiSuggestion, setAiSuggestion] = useState(null);
  
  // Booking type: 'center' or 'concierge'
  const [bookingType, setBookingType] = useState(null);
  
  // Selected Porsche Center
  const [selectedCenter, setSelectedCenter] = useState(null);
  
  // Booking details
  const [bookingDetails, setBookingDetails] = useState({
    address: '',
    date: null,
    time: '',
    route: null,
    music: null,
    driveMode: null,
    playlist: null
  });
  
  // User information
  const [userInfo, setUserInfo] = useState({
    email: '',
    phone: '',
    name: ''
  });
  
  // Payment information (for concierge)
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiry: '',
    cvc: ''
  });

  // Premium features state
  const [premiumFeatures, setPremiumFeatures] = useState({
    walletPass: false,
    arPreview: false,
    hapticExperience: false,
    musicConnected: false,
    routeSelected: null,
    driveModePreference: null
  });
  
  // Navigation helpers
  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => Math.max(0, prev - 1));
  const goToStep = (stepNumber) => setStep(stepNumber);
  const resetBooking = () => {
    setStep(0);
    setSelectedModel(null);
    setAiAnswers([]);
    setAiSuggestion(null);
    setBookingType(null);
    setSelectedCenter(null);
    setBookingDetails({
      address: '',
      date: null,
      time: '',
      route: null,
      music: null,
      driveMode: null,
      playlist: null
    });
    setUserInfo({ email: '', phone: '', name: '' });
    setPaymentInfo({ cardNumber: '', expiry: '', cvc: '' });
    setPremiumFeatures({
      walletPass: false,
      arPreview: false,
      hapticExperience: false,
      musicConnected: false,
      routeSelected: null,
      driveModePreference: null
    });
  };
  
  // Model selection handler
  const handleSelectModel = (model) => {
    setSelectedModel(model);
  };
  
  // Update selected model (alias for consistency)
  const updateSelectedModel = (model) => {
    setSelectedModel(model);
  };
  
  // AI answer handlers
  const addAiAnswer = (answer) => {
    setAiAnswers(prev => [...prev, answer]);
  };

  const setAiSuggestionModel = (model) => {
    setAiSuggestion(model);
  };
  
  // Booking details handler
  const updateBookingDetails = (details) => {
    setBookingDetails(prev => ({ ...prev, ...details }));
  };
  
  // User info handler
  const updateUserInfo = (info) => {
    setUserInfo(prev => ({ ...prev, ...info }));
  };
  
  // Payment info handler
  const updatePaymentInfo = (info) => {
    setPaymentInfo(prev => ({ ...prev, ...info }));
  };

  // Premium features handlers
  const updatePremiumFeatures = (features) => {
    setPremiumFeatures(prev => ({ ...prev, ...features }));
  };

  const enableWalletPass = () => {
    setPremiumFeatures(prev => ({ ...prev, walletPass: true }));
  };

  const enableARPreview = () => {
    setPremiumFeatures(prev => ({ ...prev, arPreview: true }));
  };

  const enableHapticExperience = () => {
    setPremiumFeatures(prev => ({ ...prev, hapticExperience: true }));
  };

  const connectMusic = (platform = 'spotify') => {
    setPremiumFeatures(prev => ({ ...prev, musicConnected: platform }));
  };

  const selectRoute = (route) => {
    setPremiumFeatures(prev => ({ ...prev, routeSelected: route }));
    updateBookingDetails({ route });
  };

  const setDriveModePreference = (driveMode) => {
    setPremiumFeatures(prev => ({ ...prev, driveModePreference: driveMode }));
    updateBookingDetails({ driveMode });
  };
  
  // Booking data consolidation (for easier access)
  const bookingData = {
    bookingType,
    selectedCenter,
    ...bookingDetails,
  };
  
  // Update booking data helper
  const updateBookingData = (data) => {
    if (data.bookingType !== undefined) setBookingType(data.bookingType);
    if (data.selectedCenter !== undefined) setSelectedCenter(data.selectedCenter);
    const detailsUpdate = { ...data };
    delete detailsUpdate.bookingType;
    delete detailsUpdate.selectedCenter;
    updateBookingDetails(detailsUpdate);
  };

  // Get booking summary for confirmation
  const getBookingSummary = () => {
    return {
      model: selectedModel,
      type: bookingType,
      center: selectedCenter,
      details: bookingDetails,
      user: userInfo,
      payment: bookingType === 'concierge' ? paymentInfo : null,
      features: premiumFeatures,
      aiAnswers,
      aiSuggestion
    };
  };

  // Check if booking is complete
  const isBookingComplete = () => {
    return selectedModel && 
           bookingType && 
           (bookingType === 'center' ? selectedCenter : bookingDetails.address) &&
           bookingDetails.date && 
           bookingDetails.time &&
           userInfo.name && 
           userInfo.email && 
           userInfo.phone &&
           (bookingType === 'center' || (paymentInfo.cardNumber && paymentInfo.expiry && paymentInfo.cvc));
  };

  // Context value
  const value = {
    // State
    step,
    selectedModel,
    aiAnswers,
    aiSuggestion,
    bookingType,
    selectedCenter,
    bookingDetails,
    bookingData,
    userInfo,
    paymentInfo,
    premiumFeatures,
    
    // Setters
    setStep,
    setSelectedModel,
    setAiAnswers,
    setAiSuggestion,
    setAiSuggestionModel,
    setBookingType,
    setSelectedCenter,
    setBookingDetails,
    setUserInfo,
    setPaymentInfo,
    setPremiumFeatures,
    
    // Helpers
    nextStep,
    prevStep,
    goToStep,
    resetBooking,
    handleSelectModel,
    updateSelectedModel,
    addAiAnswer,
    updateBookingDetails,
    updateBookingData,
    updateUserInfo,
    updatePaymentInfo,
    updatePremiumFeatures,
    enableWalletPass,
    enableARPreview,
    enableHapticExperience,
    connectMusic,
    selectRoute,
    setDriveModePreference,
    getBookingSummary,
    isBookingComplete
  };
  
  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};

export default BookingContext;
