import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import './index.css'
import App from './App.jsx'
import theme from './assets/theme.js'
import { BookingProvider } from './contexts/BookingContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BookingProvider>
          <App />
        </BookingProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
