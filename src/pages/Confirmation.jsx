import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Chip,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { motion } from 'framer-motion';
import { useBooking } from '../contexts/BookingContext';
import { testDriveRoutes, musicOptions } from '../data/aiConversation';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WalletIcon from '@mui/icons-material/Wallet';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import VibrationIcon from '@mui/icons-material/Vibration';
import RouteIcon from '@mui/icons-material/Route';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { format } from 'date-fns';

const Confirmation = () => {
  const { selectedModel, bookingType, selectedCenter, bookingDetails, resetBooking } = useBooking();
  const [arModalOpen, setArModalOpen] = useState(false);
  const [hapticsModalOpen, setHapticsModalOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState('');
  const [selectedMusic, setSelectedMusic] = useState('');

  const handleWalletPass = () => {
    alert('Wallet pass added! (This is a prototype feature)');
  };

  const handleARPreview = () => {
    setArModalOpen(true);
  };

  const handleHaptics = () => {
    // Trigger vibration if supported
    if (navigator.vibrate) {
      navigator.vibrate(200);
    }
    setHapticsModalOpen(true);
  };

  const handleNewBooking = () => {
    resetBooking();
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 8 }}>
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Success Header */}
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <CheckCircleOutlineIcon 
                sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} 
              />
            </motion.div>
            <Typography variant="h2" gutterBottom sx={{ fontWeight: 700 }}>
              Congratulations!
            </Typography>
            <Typography variant="h5" color="text.secondary">
              Your Test Drive is Confirmed
            </Typography>
          </Box>

          {/* Booking Summary */}
          <Card sx={{ mb: 4 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                Booking Summary
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Model
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {selectedModel?.name}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Experience Type
                  </Typography>
                  <Chip 
                    label={bookingType === 'center' ? 'Centre Test Drive' : 'Concierge Service'} 
                    color="primary" 
                    size="small"
                  />
                </Grid>

                {bookingType === 'center' && selectedCenter && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Location
                    </Typography>
                    <Typography variant="body1">
                      {selectedCenter.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {selectedCenter.address}
                    </Typography>
                  </Grid>
                )}

                {bookingType === 'concierge' && bookingDetails.address && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Delivery Address
                    </Typography>
                    <Typography variant="body1">
                      {bookingDetails.address}
                    </Typography>
                  </Grid>
                )}

                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Date
                  </Typography>
                  <Typography variant="body1">
                    {bookingDetails.date ? format(bookingDetails.date, 'MMMM dd, yyyy') : 'N/A'}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Time
                  </Typography>
                  <Typography variant="body1">
                    {bookingDetails.time || 'N/A'}
                  </Typography>
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Typography variant="body2" color="text.secondary">
                Booking ID: <strong>POR-{Date.now().toString().slice(-8)}</strong>
              </Typography>
            </CardContent>
          </Card>

          {/* Wallet Pass */}
          <Card sx={{ mb: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Add to Wallet
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Quick access to your booking details
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  startIcon={<WalletIcon />}
                  onClick={handleWalletPass}
                  sx={{ bgcolor: 'black', '&:hover': { bgcolor: 'grey.900' } }}
                >
                  Add Pass
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* Experience Enhancements */}
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
            Enhance Your Experience
          </Typography>

          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={6}>
              <Card 
                component={motion.div}
                whileHover={{ y: -4 }}
                sx={{ height: '100%', cursor: 'pointer' }}
                onClick={handleARPreview}
              >
                <CardContent sx={{ p: 3, textAlign: 'center' }}>
                  <ViewInArIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    AR/VR Preview
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    See your Porsche in your driveway before the test drive
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card 
                component={motion.div}
                whileHover={{ y: -4 }}
                sx={{ height: '100%', cursor: 'pointer' }}
                onClick={handleHaptics}
              >
                <CardContent sx={{ p: 3, textAlign: 'center' }}>
                  <VibrationIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Engine Haptics
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Feel the instant torque and performance modes
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Test Drive Customization */}
          <Card sx={{ mb: 4 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                Customize Your Test Drive
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <RouteIcon fontSize="small" />
                        Select Route Theme
                      </Box>
                    </InputLabel>
                    <Select
                      value={selectedRoute}
                      onChange={(e) => setSelectedRoute(e.target.value)}
                      label="Select Route Theme"
                    >
                      {testDriveRoutes.map((route) => (
                        <MenuItem key={route.id} value={route.id}>
                          {route.name} - {route.duration}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <MusicNoteIcon fontSize="small" />
                        Connect Music
                      </Box>
                    </InputLabel>
                    <Select
                      value={selectedMusic}
                      onChange={(e) => setSelectedMusic(e.target.value)}
                      label="Connect Music"
                    >
                      {musicOptions.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.icon} {option.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Actions */}
          <Box sx={{ textAlign: 'center' }}>
            <Button
              variant="outlined"
              size="large"
              onClick={handleNewBooking}
              sx={{ px: 4 }}
            >
              Book Another Test Drive
            </Button>
          </Box>
        </motion.div>

        {/* AR/VR Modal */}
        <Dialog open={arModalOpen} onClose={() => setArModalOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>AR/VR Preview</DialogTitle>
          <DialogContent>
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <ViewInArIcon sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
              <Typography variant="body1" paragraph>
                This feature would launch an AR experience to visualize your selected {selectedModel?.name} in your environment.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                (Prototype feature - Full AR implementation coming soon)
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setArModalOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>

        {/* Haptics Modal */}
        <Dialog open={hapticsModalOpen} onClose={() => setHapticsModalOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Engine Haptics Experience</DialogTitle>
          <DialogContent>
            <Box sx={{ py: 2 }}>
              <Typography variant="body1" gutterBottom>
                Select Drive Mode:
              </Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                {['Comfort', 'Sport', 'Sport Plus', 'Individual'].map((mode) => (
                  <Grid item xs={6} key={mode}>
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={() => {
                        if (navigator.vibrate) {
                          navigator.vibrate([100, 50, 100]);
                        }
                      }}
                    >
                      {mode}
                    </Button>
                  </Grid>
                ))}
              </Grid>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
                Feel the unique performance characteristics of each drive mode through haptic feedback.
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setHapticsModalOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default Confirmation;
