import "./Navbar.scss";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import { useGlobalTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router";
import { RTMSession } from "../../services/RTMSession";
import { RTMThemeSwitch } from "../RTMThemeSwitch/RTMThemeSwitch";

const Navbar = () => {
  const { toggleTheme, isLight } = useGlobalTheme();
  const navigate = useNavigate();
  const { setThemeMod } = useGlobalTheme();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    toggleTheme();
  };

  const handleRedirect = (page: string) => {
    navigate(`/${page.toLowerCase()}`);
  };

  const handleLogout = () => {
    RTMSession.token = null;
    setThemeMod("light");
    navigate(`/login`);
  };

  return (
    <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        RTM
      </Typography>

      <div className="switch-container">
        <RTMThemeSwitch
          checked={!isLight}
          onChange={handleChange}
          aria-label="login switch"
        />
      </div>

      <MenuItem onClick={() => handleRedirect("reader")}>
        <Typography color="white" textAlign="center">
          Reader
        </Typography>
      </MenuItem>
      <MenuItem onClick={() => handleRedirect("library")}>
        <Typography color="white" textAlign="center">
          Library
        </Typography>
      </MenuItem>
      <MenuItem onClick={() => handleRedirect("user")}>
        <Typography color="white" textAlign="center">
          User
        </Typography>
      </MenuItem>
      <MenuItem onClick={() => handleLogout()}>
        <Typography color="white" textAlign="center">
          Logout
        </Typography>
      </MenuItem>

      {/* TODO: this will show only in phone screen */}
      {/* <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton> */}
    </Toolbar>
  </AppBar>
  );
};

export default Navbar;
