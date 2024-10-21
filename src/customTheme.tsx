import { createTheme } from '@mui/material/styles';
import { blue } from '@mui/material/colors';

// Augment the palette to include an ochre color
declare module '@mui/material/styles' {
  interface Palette {
    cancel: Palette['primary'];
    create: Palette['primary'];
    expired: Palette['primary'];
  }

  interface PaletteOptions {
    cancel?: PaletteOptions['primary'];
    create?: PaletteOptions['primary'];
    expired?: PaletteOptions['primary'];
  }
}

const customTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920
    }
  },
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
    cancel: {
      main: 'rgba(0, 0, 0, 0.6)'
    },
    create: {
      main: '#FFB547'
    },
    expired: {
      main: '#156EB6'
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
    h1: { fontWeight: 700, fontSize: 34 },
    h2: { fontWeight: 700, fontSize: 24 },
    h3: { fontWeight: 700, fontSize: 20 },
    h4: { fontWeight: 700, fontSize: 18 },
    h5: { fontWeight: 700, fontSize: 16 },
    h6: { fontWeight: 700, fontSize: 14 },
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
        root: {
          textTransform: 'none'
        },
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
    MuiDialogContentText: {
      styleOverrides: {
        root: {
          color: '#000000'
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
            backgroundColor: '#FFFFFF',
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
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          paddingRight: '1rem'
        },
        indicator: {
          display: 'none'
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          justifyContent: 'start',
          paddingRight: '1rem',
          minHeight: 'auto',
          '&.Mui-selected': {
            backgroundColor: '#EDF1FD',
            fontWeight: '700',
            borderRadius: '20px'
          }
        }
      }
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          margin: '4px 0px 0px'
        }
      }
    },
    MuiButtonGroup: {
      styleOverrides: {
        grouped: {
          '&:last-of-type': {
            borderRadius: '0px 5px 5px 0px'
          },
          '&:first-of-type': {
            borderRadius: '5px 0px 0px 5px'
          }
        }
      }
    },
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          width: '350px'
        }
      }
    }
  }
});

export default customTheme;
