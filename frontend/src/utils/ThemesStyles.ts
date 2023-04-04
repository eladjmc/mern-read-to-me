import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#5e35b1',
    },
    secondary: {
      main: '#f44336',
    },
    background: {
      default: '#f5f5f5',
      paper: '#fff',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 'bold',
      letterSpacing: '0.05rem',
      marginBottom: '1rem',
      color: '#5e35b1',
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      letterSpacing: '0.04rem',
      marginBottom: '0.5rem',
      color: '#5e35b1',
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 'bold',
      letterSpacing: '0.03rem',
      marginBottom: '0.5rem',
      color: '#5e35b1',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      letterSpacing: '0.02rem',
      marginBottom: '0.5rem',
      color: '#5e35b1',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: '#212121',
    },
    body2: {
      fontSize: '0.9rem',
      lineHeight: 1.4,
      color: '#757575',
    },
    button: {
      fontSize: '1.1rem',
      fontWeight: 'bold',
      letterSpacing: '0.02rem',
      textTransform: 'none',
      color: '#fff',
    },
  },
  shape: {
    borderRadius: 0.5,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          background: '#5e35b1',
          '&:hover': {
            background: '#4527a0',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&:hover:not(.Mui-disabled)': {
              borderColor: '#5e35b1',
            },
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#5e35b1',
          },
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#5e35b1',
    },
    secondary: {
      main: '#f44336',
    },
    background: {
      default: '#212121',
      paper: '#424242',
    },
    text: {
      primary: '#fff',
      secondary: '#bdbdbd',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 'bold',
      letterSpacing: '0.05rem',
      marginBottom: '1rem',
      color: '#fff',
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      letterSpacing: '0.04rem',
      marginBottom: '0.5rem',
      color: '#fff',
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 'bold',
      letterSpacing: '0.03rem',
      marginBottom: '0.5rem',
      color: '#fff',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      letterSpacing: '0.02rem',
      marginBottom: '0.5rem',
      color: '#fff',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: '#fff',
    },
    body2: {
      fontSize: '0.9rem',
      lineHeight: 1.4,
      color: '#bdbdbd',
    },
    button: {
      fontSize: '1.1rem',
      fontWeight: 'bold',
      letterSpacing: '0.02rem',
      textTransform: 'none',
      color: '#fff',
    },
  },
  shape: {
    borderRadius: 0.5,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          background: '#5e35b1',
          '&:hover': {
            background: '#4527a0',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&:hover:not(.Mui-disabled)': {
              borderColor: '#5e35b1',
            },
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#5e35b1',
          },
        },
      },
    },
  },
});



// export const darkTheme = createTheme({
//   palette: {
//     mode: "dark",
//     primary: {
//       main: "#2196f3",
//     },
//     secondary: {
//       main: "#f50057",
//     },
//     background: {
//       default: "#212121",
//       paper: "#424242",
//     },
//     text: {
//       primary: "#fff",
//       secondary: "#bdbdbd",
//     },
//   },
// });