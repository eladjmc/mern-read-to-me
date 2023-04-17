// import { createTheme } from "@mui/material";

// const transitions = {
//   duration: {
//     shortest: 100,
//     shorter: 150,
//     short: 200,
//     standard: 250,
//     complex: 325,
//     enteringScreen: 175,
//     leavingScreen: 145,
//   },
// };

// export const lightTheme = createTheme({
//   transitions: {...transitions},
//   palette: {
//     primary: {
//       main: '#5e35b1',
//     },
//     secondary: {
//       main: '#f44336',
//     },
//     background: {
//       default: '#f5f5f5',
//       paper: '#fff',
//     },
//     text: {
//       primary: '#212121',
//       secondary: '#757575',
//     },
//   },
//   typography: {
//     fontFamily: 'Roboto, sans-serif',
//     h1: {
//       fontSize: '3rem',
//       fontWeight: 'bold',
//       letterSpacing: '0.05rem',
//       marginBottom: '1rem',
//       color: '#5e35b1',
//     },
//     h2: {
//       fontSize: '2.5rem',
//       fontWeight: 'bold',
//       letterSpacing: '0.04rem',
//       marginBottom: '0.5rem',
//       color: '#5e35b1',
//     },
//     h3: {
//       fontSize: '2rem',
//       fontWeight: 'bold',
//       letterSpacing: '0.03rem',
//       marginBottom: '0.5rem',
//       color: '#5e35b1',
//     },
//     h4: {
//       fontSize: '1.5rem',
//       fontWeight: 'bold',
//       letterSpacing: '0.02rem',
//       marginBottom: '0.5rem',
//       color: '#5e35b1',
//     },
//     body1: {
//       fontSize: '1rem',
//       lineHeight: 1.6,
//       color: '#212121',
//     },
//     body2: {
//       fontSize: '0.9rem',
//       lineHeight: 1.4,
//       color: '#757575',
//     },
//     button: {
//       fontSize: '1.1rem',
//       fontWeight: 'bold',
//       letterSpacing: '0.02rem',
//       textTransform: 'none',
//       color: '#fff',
//     },
//   },
//   shape: {
//     borderRadius: 0.5,
//   },
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         containedPrimary: {
//           background: '#5e35b1',
//           '&:hover': {
//             background: '#4527a0',
//           },
//         },
//       },
//     },
//     MuiTextField: {
//       styleOverrides: {
//         root: {
//           '& .MuiOutlinedInput-root': {
//             '&:hover:not(.Mui-disabled)': {
//               borderColor: '#5e35b1',
//             },
//           },
//           '& .MuiOutlinedInput-notchedOutline': {
//             borderColor: '#5e35b1',
//           },
//         },
//       },
//     },
//   },
// });

// export const darkTheme = createTheme({
//   transitions: {...transitions},
//   palette: {
//     primary: {
//       main: '#5e35b1',
//     },
//     secondary: {
//       main: '#f44336',
//     },
//     background: {
//       default: '#212121',
//       paper: '#424242',
//     },
//     text: {
//       primary: '#fff',
//       secondary: '#bdbdbd',
//     },
//   },
//   typography: {
//     fontFamily: 'Roboto, sans-serif',
//     h1: {
//       fontSize: '3rem',
//       fontWeight: 'bold',
//       letterSpacing: '0.05rem',
//       marginBottom: '1rem',
//       color: '#fff',
//     },
//     h2: {
//       fontSize: '2.5rem',
//       fontWeight: 'bold',
//       letterSpacing: '0.04rem',
//       marginBottom: '0.5rem',
//       color: '#fff',
//     },
//     h3: {
//       fontSize: '2rem',
//       fontWeight: 'bold',
//       letterSpacing: '0.03rem',
//       marginBottom: '0.5rem',
//       color: '#fff',
//     },
//     h4: {
//       fontSize: '1.5rem',
//       fontWeight: 'bold',
//       letterSpacing: '0.02rem',
//       marginBottom: '0.5rem',
//       color: '#fff',
//     },
//     body1: {
//       fontSize: '1rem',
//       lineHeight: 1.6,
//       color: '#fff',
//     },
//     body2: {
//       fontSize: '0.9rem',
//       lineHeight: 1.4,
//       color: '#bdbdbd',
//     },
//     button: {
//       fontSize: '1.1rem',
//       fontWeight: 'bold',
//       letterSpacing: '0.02rem',
//       textTransform: 'none',
//       color: '#fff',
//     },
//   },
//   shape: {
//     borderRadius: 0.5,
//   },
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         containedPrimary: {
//           background: '#5e35b1',
//           '&:hover': {
//             background: '#4527a0',
//           },
//         },
//       },
//     },
//     MuiTextField: {
//       styleOverrides: {
//         root: {
//           '& .MuiOutlinedInput-root': {
//             '&:hover:not(.Mui-disabled)': {
//               borderColor: '#5e35b1',
//             },
//           },
//           '& .MuiOutlinedInput-notchedOutline': {
//             borderColor: '#5e35b1',
//           },
//         },
//       },
//     },
//   },
// });


import { createTheme } from "@mui/material";

const transitions = {
  duration: {
    shortest: 100,
    shorter: 150,
    short: 200,
    standard: 250,
    complex: 325,
    enteringScreen: 175,
    leavingScreen: 145,
  },
};

export const lightTheme = createTheme({
  transitions: { ...transitions },
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f44336",
    },
    background: {
      default: "#f5f5f5",
      paper: "#fff",
    },
    text: {
      primary: "#212121",
      secondary: "#757575",
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: {
      fontSize: "3rem",
      fontWeight: "bold",
      letterSpacing: "0.05rem",
      marginBottom: "1rem",
      color: "#1976d2",
    },
    h2: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      letterSpacing: "0.04rem",
      marginBottom: "0.5rem",
      color: "#1976d2",
    },
    h3: {
      fontSize: "2rem",
      fontWeight: "bold",
      letterSpacing: "0.03rem",
      marginBottom: "0.5rem",
      color: "#1976d2",
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      letterSpacing: "0.02rem",
      marginBottom: "0.5rem",
      color: "#1976d2",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
      color: "#212121",
    },
    body2: {
      fontSize: "0.9rem",
      lineHeight: 1.4,
      color: "#757575",
    },
    button: {
      fontSize: "1rem",
      fontWeight: "bold",
      letterSpacing: "0.02rem",
      textTransform: "none",
      color: "#fff",
    },
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          background: "#1976d2",
          "&:hover": {
            background: "#1565c0",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "&:hover:not(.Mui-disabled)": {
              borderColor: "#1976d2",
            },
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#1976d2",
          },
        },
      },
    },
  },
});


export const darkTheme = createTheme({
  transitions: { ...transitions },
  palette: {
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#ff7961",
    },
    background: {
      default: "#303030",
      paper: "#424242",
    },
    text: {
      primary: "#ffffff",
      secondary: "#bdbdbd",
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: {
      fontSize: "3rem",
      fontWeight: "bold",
      letterSpacing: "0.05rem",
      marginBottom: "1rem",
      color: "#90caf9",
    },
    h2: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      letterSpacing: "0.04rem",
      marginBottom: "0.5rem",
      color: "#90caf9",
    },
    h3: {
      fontSize: "2rem",
      fontWeight: "bold",
      letterSpacing: "0.03rem",
      marginBottom: "0.5rem",
      color: "#90caf9",
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      letterSpacing: "0.02rem",
      marginBottom: "0.5rem",
      color: "#90caf9",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
      color: "#fff",
    },
    body2: {
      fontSize: "0.9rem",
      lineHeight: 1.4,
      color: "#bdbdbd",
    },
    button: {
      fontSize: "1rem",
      fontWeight: "bold",
      letterSpacing: "0.02rem",
      textTransform: "none",
      color: "#fff",
    },
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          background: "#90caf9",
          "&:hover": {
            background: "#64b5f6",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "&:hover:not(.Mui-disabled)": {
              borderColor: "#90caf9",
            },
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#90caf9",
          },
        },
      },
    },
  },
});