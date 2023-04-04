import "./Navbar.scss";
import NavbarLinks from "./links/NavbarLinks";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useGlobalTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router";
import { RTMSession } from "../../services/RTMSession";

const Navbar = () => {
  const [auth, setAuth] = React.useState(true);
  const { toggleTheme } = useGlobalTheme();
  const navigate = useNavigate();
  const { setThemeMod } = useGlobalTheme();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            RTM
          </Typography>

          <MenuItem onClick={() => handleRedirect("reading")}>
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
      <div className="switch-container">
        <FormGroup className="switch-alignment">
          <FormControlLabel
            control={
              <Switch
                checked={auth}
                onChange={handleChange}
                aria-label="login switch"
              />
            }
            label={auth ? "Light" : "Dark"}
          />
        </FormGroup>
      </div>
    </Box>
  );
};

export default Navbar;
