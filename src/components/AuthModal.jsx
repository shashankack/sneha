import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  IconButton,
  InputAdornment
} from '@mui/material';
import { motion } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';

const AuthModal = ({ open, onClose, onSuccess }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  // Dummy credentials
  const DUMMY_EMAIL = 'bot@mail.com';
  const DUMMY_PASSWORD = 'helloworld';

  const handleLogin = () => {
    if (email === DUMMY_EMAIL && password === DUMMY_PASSWORD) {
      setError('');
      login(); // Set authentication state
      onSuccess();
      onClose();
      // Navigate to payment page
      navigate('/payment');
    } else {
      setError('Invalid credentials. Use bot@mail.com / helloworld');
    }
  };

  const handleClose = () => {
    setEmail('');
    setPassword('');
    setError('');
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          p: 2
        }
      }}
    >
      <DialogTitle sx={{ textAlign: 'center', position: 'relative', pb: 1 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: 'black' }}>
          Porsche ID
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Sign in to complete your test drive booking
        </Typography>
        <IconButton
          onClick={handleClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="bot@mail.com"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: '#CC0000' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#CC0000',
                },
              }}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="helloworld"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: '#CC0000' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#CC0000',
                },
              }}
            />
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Alert 
            severity="info" 
            sx={{ 
              mb: 3,
              bgcolor: 'rgba(204, 0, 0, 0.05)',
              border: '1px solid rgba(204, 0, 0, 0.2)',
              '& .MuiAlert-icon': {
                color: '#CC0000',
              },
            }}
          >
            <Typography variant="body2">
              <strong>Demo Credentials:</strong><br />
              Email: bot@mail.com<br />
              Password: helloworld
            </Typography>
          </Alert>
        </motion.div>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          variant="outlined"
          onClick={handleClose}
          sx={{
            borderColor: '#CC0000',
            color: '#CC0000',
            '&:hover': {
              borderColor: '#AA0000',
              bgcolor: 'rgba(204, 0, 0, 0.04)',
            },
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleLogin}
          disabled={!email || !password}
          sx={{
            bgcolor: '#CC0000',
            '&:hover': { bgcolor: '#AA0000' },
            '&:disabled': {
              bgcolor: 'rgba(0, 0, 0, 0.12)',
              color: 'rgba(0, 0, 0, 0.26)',
            },
          }}
        >
          Sign In & Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AuthModal;