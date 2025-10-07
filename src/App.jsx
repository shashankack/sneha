import React, { createContext, useContext, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import HomePage from './pages/HomePage';
import ConciergeDetails from './pages/ConciergeDetails';
import PaymentPage from './pages/PaymentPage';

// Authentication context for route protection
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const authValue = {
    isAuthenticated,
    login: () => setIsAuthenticated(true),
    logout: () => setIsAuthenticated(false),
  };

  return (
    <AuthContext.Provider value={authValue}>
      <Box sx={{ minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route 
            path="/concierge" 
            element={
              <ProtectedRoute>
                <ConciergeDetails />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/payment" 
            element={
              <ProtectedRoute>
                <PaymentPage />
              </ProtectedRoute>
            } 
          />
          {/* Redirect any unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>
    </AuthContext.Provider>
  );
};

export default App;