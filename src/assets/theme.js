import { createTheme } from '@mui/material/styles';

const rawColors = {
  white: '#FFFFFF',
  black: '#000000',
  porscheRed: '#CC0000',
  mediumGray: '#808080',
  lightGray: '#E1E1E1',
};

const theme = createTheme({
  palette: {
    // Primary Color: Mapped to the Brand Accent / CTA (Porsche Red)
    // Used for the main 'Go' button and CTAs.
    primary: {
      main: rawColors.porscheRed,
      contrastText: rawColors.white, // Ensures high contrast text on the primary button
    },
    // Secondary Color: Mapped to the Secondary Accent (Medium Gray)
    // Used for sub-headings, instructional text, disabled elements, etc.
    secondary: {
      main: rawColors.mediumGray,
    },
    // Backgrounds: Mapped to Primary Background (White)
    background: {
      default: rawColors.white, // Clean page backgrounds
      paper: rawColors.white,   // Content areas and form fields
    },
    // Text: Mapped to Primary Text/Links (Black)
    text: {
      primary: rawColors.black, // Headings, body copy, and navigation text
      secondary: rawColors.mediumGray, // For sub-headings and instructional text
      disabled: rawColors.mediumGray, // For disabled elements
    },
    // Action states and subtle separations
    action: {
      hover: rawColors.lightGray, // Button hover states
      disabled: rawColors.mediumGray, // Disabled buttons
    },
    // Success messages are tied to the Brand Accent/CTA use case
    success: {
      main: rawColors.porscheRed, // Using the accent for success messages as per the use case
      light: rawColors.lightGray, // A lighter tone for subtle backgrounds if needed
    },
    // Other colors (e.g., info, warning, error) can be added here
    // based on standard design practices if not explicitly defined in the palette.
  },

  // Typography - Using Porsche Next font
  typography: {
    fontFamily: '"Porsche Next", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Porsche Next", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: '"Porsche Next", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontFamily: '"Porsche Next", sans-serif',
      fontWeight: 600,
      letterSpacing: '0em',
    },
    h4: {
      fontFamily: '"Porsche Next", sans-serif',
      fontWeight: 600,
      letterSpacing: '0em',
    },
    h5: {
      fontFamily: '"Porsche Next", sans-serif',
      fontWeight: 600,
      letterSpacing: '0em',
    },
    h6: {
      fontFamily: '"Porsche Next", sans-serif',
      fontWeight: 500,
      letterSpacing: '0em',
    },
    body1: {
      fontFamily: '"Porsche Next", sans-serif',
      fontWeight: 400,
      letterSpacing: '0.01em',
    },
    body2: {
      fontFamily: '"Porsche Next", sans-serif',
      fontWeight: 400,
      letterSpacing: '0.01em',
    },
    button: {
      fontFamily: '"Porsche Next", sans-serif',
      fontWeight: 600,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
    },
  },

  // Custom configuration for components
  components: {
    // Styling for Buttons (especially the Primary CTA)
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4, // Example: small radius for buttons
        },
        containedPrimary: {
          // This ensures the main CTA button (e.g., "Book Now") uses the correct red
          backgroundColor: rawColors.porscheRed,
          '&:hover': {
            // Darken the red slightly on hover if desired, or use the lightGray for a background effect
            backgroundColor: '#B30000', // Example: a darker red
          },
        },
        textSecondary: {
            // Used for instructional/secondary text links
            color: rawColors.mediumGray,
        },
        // Styling for disabled buttons
        disabled: {
          backgroundColor: rawColors.lightGray, // Subtle background
          color: rawColors.mediumGray, // Disabled text color
        },
      },
    },

    // Styling for text components
    MuiTypography: {
      styleOverrides: {
        root: {
          color: rawColors.black, // Default text color
        },
        h1: {
          color: rawColors.black, // Headings
        },
        body1: {
          color: rawColors.black, // Body copy
        },
        subtitle1: {
          color: rawColors.mediumGray, // Sub-headings and instructional text
        },
      },
    },

    // Styling for Divider/Separation lines
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: rawColors.mediumGray, // Dividing lines
        },
      },
    },

    // Styling for Hover/Separation backgrounds
    MuiPaper: {
      styleOverrides: {
        root: {
          // Subtle background shading behind content blocks
          // This might be used for subtle cards or form sections
          '&.Mui-hover-background': { // You would need to apply this class manually
            backgroundColor: rawColors.lightGray,
          }
        }
      }
    }
  },
});

export default theme;