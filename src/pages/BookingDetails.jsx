import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Alert,
  Grid
} from '@mui/material';
import { motion } from 'framer-motion';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useBooking } from '../contexts/BookingContext';
import { porscheCenters, conciergeService } from '../data/centers';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const BookingDetails = () => {
  const {
    selectedModel,
    bookingType,
    setBookingType,
    selectedCenter,
    setSelectedCenter,
    bookingDetails,
    updateBookingDetails,
    nextStep
  } = useBooking();

  const [tabValue, setTabValue] = useState(bookingType === 'center' ? 0 : 1);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setBookingType(newValue === 0 ? 'center' : 'concierge');
  };

  const handleCenterChange = (event) => {
    const centerId = event.target.value;
    const center = porscheCenters.find(c => c.id === centerId);
    setSelectedCenter(center);
  };

  const handleConfirm = () => {
    if (bookingType === 'center' && selectedCenter && bookingDetails.date && bookingDetails.time) {
      nextStep();
    } else if (bookingType === 'concierge' && bookingDetails.address && bookingDetails.date && bookingDetails.time) {
      nextStep();
    }
  };

  const isFormValid = () => {
    if (bookingType === 'center') {
      return selectedCenter && bookingDetails.date && bookingDetails.time;
    } else {
      return bookingDetails.address && bookingDetails.date && bookingDetails.time;
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 8 }}>
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography variant="h2" align="center" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
              2/3. Select Your Experience
            </Typography>

            {selectedModel && (
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="h6" color="text.secondary">
                  Test Drive: <strong>{selectedModel.name}</strong>
                </Typography>
              </Box>
            )}

            <Card sx={{ mb: 4 }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant="fullWidth"
                sx={{
                  borderBottom: 1,
                  borderColor: 'divider',
                  '& .MuiTab-root': { py: 2 }
                }}
              >
                <Tab 
                  icon={<LocationOnIcon />} 
                  label="Centre Test Drive" 
                  iconPosition="start"
                />
                <Tab 
                  icon={<LocalShippingIcon />} 
                  label="Concierge Service" 
                  iconPosition="start"
                />
              </Tabs>

              <CardContent sx={{ p: 4 }}>
                {tabValue === 0 ? (
                  // Center Test Drive
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                      Visit a Porsche Centre
                    </Typography>

                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <InputLabel>Select Centre</InputLabel>
                          <Select
                            value={selectedCenter?.id || ''}
                            onChange={handleCenterChange}
                            label="Select Centre"
                          >
                            {porscheCenters.map((center) => (
                              <MenuItem key={center.id} value={center.id}>
                                {center.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        {selectedCenter && (
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            {selectedCenter.address}
                          </Typography>
                        )}
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <DatePicker
                          label="Select Date"
                          value={bookingDetails.date}
                          onChange={(newValue) => updateBookingDetails({ date: newValue })}
                          slotProps={{
                            textField: { fullWidth: true }
                          }}
                          minDate={new Date()}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel>Select Time</InputLabel>
                          <Select
                            value={bookingDetails.time}
                            onChange={(e) => updateBookingDetails({ time: e.target.value })}
                            label="Select Time"
                          >
                            {selectedCenter?.availableTimes.map((time) => (
                              <MenuItem key={time} value={time}>
                                {time}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>

                    <Alert severity="info" sx={{ mt: 3 }}>
                      Free test drive at your selected Porsche Centre
                    </Alert>
                  </motion.div>
                ) : (
                  // Concierge Service
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                      Premium Concierge Delivery
                    </Typography>

                    <Alert severity="info" sx={{ mb: 3 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Refundable ${conciergeService.deposit} deposit
                      </Typography>
                      <Typography variant="body2">
                        {conciergeService.description}
                      </Typography>
                    </Alert>

                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Delivery Address"
                          placeholder="Enter your address"
                          value={bookingDetails.address}
                          onChange={(e) => updateBookingDetails({ address: e.target.value })}
                          multiline
                          rows={2}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <DatePicker
                          label="Select Date"
                          value={bookingDetails.date}
                          onChange={(newValue) => updateBookingDetails({ date: newValue })}
                          slotProps={{
                            textField: { fullWidth: true }
                          }}
                          minDate={new Date()}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TimePicker
                          label="Select Time"
                          value={bookingDetails.date}
                          onChange={(newValue) => updateBookingDetails({ date: newValue })}
                          slotProps={{
                            textField: { fullWidth: true }
                          }}
                        />
                      </Grid>
                    </Grid>

                    <Box sx={{ mt: 3 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Concierge Features:
                      </Typography>
                      <Grid container spacing={1}>
                        {conciergeService.features.map((feature, index) => (
                          <Grid item xs={12} sm={6} key={index}>
                            <Typography variant="body2" color="text.secondary">
                              • {feature}
                            </Typography>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  </motion.div>
                )}

                <Box sx={{ mt: 4, textAlign: 'center' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleConfirm}
                    disabled={!isFormValid()}
                    sx={{ px: 6, py: 1.5 }}
                  >
                    Confirm & Proceed
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Container>
      </Box>
    </LocalizationProvider>
  );
};

export default BookingDetails;
