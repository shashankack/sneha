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
  // Step management (0: Landing, 1: Model Selection, 2: Booking Details, 3: Confirmation)
  const [step, setStep] = useState(0);
  
  // Selected model data
  const [selectedModel, setSelectedModel] = useState(null);
  
  // AI conversation answers
  const [aiAnswers, setAiAnswers] = useState([]);
  
  // Booking type: 'center' or 'concierge'
  const [bookingType, setBookingType] = useState('center');
  
  // Selected Porsche Center
  const [selectedCenter, setSelectedCenter] = useState(null);
  
  // Booking details
  const [bookingDetails, setBookingDetails] = useState({
    address: '',
    date: null,
    time: '',
    route: null,
    music: null
  });
  
  // User information (for Step 3)
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
  
  // Navigation helpers
  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => Math.max(0, prev - 1));
  const goToStep = (stepNumber) => setStep(stepNumber);
  const resetBooking = () => {
    setStep(0);
    setSelectedModel(null);
    setAiAnswers([]);
    setBookingType('center');
    setSelectedCenter(null);
    setBookingDetails({
      address: '',
      date: null,
      time: '',
      route: null,
      music: null
    });
    setUserInfo({ email: '', phone: '', name: '' });
    setPaymentInfo({ cardNumber: '', expiry: '', cvc: '' });
  };
  
  // Model selection handler
  const handleSelectModel = (model) => {
    setSelectedModel(model);
  };
  
  // AI answer handler
  const addAiAnswer = (answer) => {
    setAiAnswers(prev => [...prev, answer]);
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
  
  // Context value
  const value = {
    // State
    step,
    selectedModel,
    aiAnswers,
    bookingType,
    selectedCenter,
    bookingDetails,
    userInfo,
    paymentInfo,
    
    // Setters
    setStep,
    setSelectedModel,
    setAiAnswers,
    setBookingType,
    setSelectedCenter,
    setBookingDetails,
    setUserInfo,
    setPaymentInfo,
    
    // Helpers
    nextStep,
    prevStep,
    goToStep,
    resetBooking,
    handleSelectModel,
    addAiAnswer,
    updateBookingDetails,
    updateUserInfo,
    updatePaymentInfo
  };
  
  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};

export default BookingContext;
