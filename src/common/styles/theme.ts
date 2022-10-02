import { createTheme } from '@mui/material'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#366EFF',
    },
  },
  typography: {
    fontFamily: 'Montserrat',
    button: {
      fontSize: '1rem',
      fontWeight: 500,
      textTransform: 'none',
      letterSpacing: '.01rem',
      lineHeight: 1.25,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          display: 'block',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { borderRadius: 2 },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1000,
      lg: 1200,
      xl: 1536,
    },
  },
})
