import { createTheme } from "@mui/material";

export const lightTheme = createTheme();

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#2196f3",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#212121",
      paper: "#424242",
    },
    text: {
      primary: "#fff",
      secondary: "#bdbdbd",
    },
  },
});