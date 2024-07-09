import { createTheme } from '@mui/material/styles';
import { blue, grey } from '@mui/material/colors';

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#003DA5',
      light: '#527AF9',
      dark: '#0C3479',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#399EE0',
      light: '#6FC6FF',
      dark: '#2085C8',
      contrastText: '#FFFFFF'
    },
    error: {
      main: '#F44336',
      light: '#F88078',
      dark: '#E31B0C',
      contrastText: '#FFFFFF'
    },
    warning: {
      main: '#DD7C3B',
      light: '#FFB547',
      dark: '#C77700',
      contrastText: '#FFFFFF'
    },
    info: {
      main: '#2196F3',
      light: '#64B6F7',
      dark: '#0B79D0',
      contrastText: '#FFFFFF'
    },
    success: {
      main: '#4CAF50',
      light: '#7BC67E',
      dark: '#3B873E',
      contrastText: '#FFFFFF'
    },
    text: {
      primary: '#000000',
      secondary: 'rgba(0, 0, 0, 0.7)',
      disabled: 'rgba(0, 0, 0, 0.6)'
    },
    divider: 'rgba(0, 0, 0, 0.12)',
    action: {
      active: 'rgba(0, 0, 0, 0.65)',
      hover: 'rgba(0, 0, 0, 0.04)',
      selected: 'rgba(0, 0, 0, 0.08)',
      selectedOpacity: 0.1,
      disabled: 'rgba(131, 131, 131, 1)',
      disabledBackground: 'rgba(0, 0, 0, 0.12)',
      focus: 'rgba(0, 0, 0, 0.12)'
    }
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif;',
    h1: { fontWeight: 700, fontSize: 96 },
    h2: { fontWeight: 700, fontSize: 60 },
    h3: { fontWeight: 700, fontSize: 48 },
    h4: { fontWeight: 700, fontSize: 34 },
    h5: { fontWeight: 700, fontSize: 24 },
    h6: { fontWeight: 700, fontSize: 20 },
    h7: { fontWeight: 700, fontSize: 16 },
    subtitle1: { fontWeight: 400, fontSize: 16 },
    subtitle2: { fontWeight: 500, fontSize: 14 },
    body1: { fontWeight: 400, fontSize: 16 },
    body2: { fontWeight: 400, fontSize: 14 },
    button: { fontWeight: 500, fontSize: 16 },
    caption: { fontWeight: 400, fontSize: 12 },
    overline: { fontWeight: 400, fontSize: 12 }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        sizeSmall: {
          fontWeight: 700,
          fontSize: 13,
          borderRadius: 15
        },
        sizeMedium: {
          fontWeight: 700,
          fontSize: 14,
          borderRadius: 20
        },
        sizeLarge: {
          fontWeight: 700,
          fontSize: 16,
          padding: '8px 22px',
          borderRadius: 20
        }
      }
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          border: '0.5px solid rgba(0, 0, 0, 0.23)'
        }
      }
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          textTransform: 'capitalize',
          minHeight: '50px',
          '&.Mui-selected': {
            '& td': {
              '&:after': {
                backgroundColor: '#EDF1FD'
              }
            }
          }
        }
      }
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          fontWeight: 600
        }
      }
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          padding: '0 0.5rem'
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&.MuiIconButton-colorPrimary': {
            backgroundColor: grey[100],
            color: 'rgba(0, 0, 0, 0.65)',
            '&:hover': {
              backgroundColor: '#EDF1FD',
              color: '#003DA5'
            }
          }
        }
      }
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#000000'
        },
        arrow: {
          color: '#000000'
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
