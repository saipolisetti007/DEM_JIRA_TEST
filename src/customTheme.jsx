import { createTheme } from '@mui/material/styles';
import { blue, cyan, blueGrey } from '@mui/material/colors';

const customTheme = createTheme({
  palette: {
    primary: {
      main: cyan[600],
      contrastText: '#fff'
    },
    secondary: {
      main: blueGrey[900],
      contrastText: '#fff'
    }
  },
  typography: {
    h1: {
      fontWeight: 600
    },
    h2: {
      fontWeight: 600
    },
    h3: {
      fontWeight: 600
    },
    h4: {
      fontWeight: 600
    },
    h5: {
      fontWeight: 600
    },
    h6: {
      fontWeight: 600
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 600
        }
      }
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          backgroundColor: blue[900],
          color: '#ffffff',
          fontWeight: 600,
          padding: '0.25rem',
          textAlign: 'center'
        }
      }
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          padding: '0.5rem 1.5rem'
        }
      }
    }
  }
});

export default customTheme;
