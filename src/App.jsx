import React from 'react';
import { Box } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { useBooking } from './contexts/BookingContext';
import HomePage from './pages/HomePage';
import ModelSelection from './pages/ModelSelection';
import BookingDetails from './pages/BookingDetails';
import Confirmation from './pages/Confirmation';

const App = () => {
  const { step } = useBooking();

  // Render the appropriate page based on the current step
  const renderPage = () => {
    switch (step) {
      case 0:
        return <HomePage key="home" />;
      case 1:
        return <ModelSelection key="model" />;
      case 2:
        return <BookingDetails key="booking" />;
      case 3:
        return <Confirmation key="confirmation" />;
      default:
        return <HomePage key="home" />;
    }
  };

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>
    </Box>
  );
};

export default App;