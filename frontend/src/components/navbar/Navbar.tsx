import "./Navbar.scss";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useGlobalTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router";
import { RTMSession } from "../../services/RTMSession";
import { RTMThemeSwitch } from "../RTMThemeSwitch/RTMThemeSwitch";
import Hidden from "@mui/material/Hidden";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import MobileNavbar from "./MobileNavbar";
import { Container } from "@mui/material";

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

  const menuItems = [
    { label: "Reader", onClick: () => handleRedirect("reader") },
    { label: "Library", onClick: () => handleRedirect("library") },
    { label: "User", onClick: () => handleRedirect("user") },
    { label: "Logout", onClick: () => handleLogout() },
  ];

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          <Typography onClick={()=>handleRedirect("reader")} variant="h6" component="div" sx={{ flexGrow: 1, cursor:"pointer" }}>
            RTM
          </Typography>

          <div className="switch-container">
            <RTMThemeSwitch
              checked={!isLight}
              onChange={handleChange}
              aria-label="login switch"
            />
          </div>

          {/* Desktop menu items */}
          <Hidden mdDown>
            <Box display="flex" flexDirection="row">
              {menuItems.map((item) => (
                <ListItem
                  button
                  key={item.label}
                  onClick={item.onClick}
                  sx={{ minWidth: "auto" }}
                >
                  <Typography color="white" textAlign="center">
                    {item.label}
                  </Typography>
                </ListItem>
              ))}
            </Box>
          </Hidden>

          {/* Mobile menu */}
          <Hidden mdUp>
            <MobileNavbar menuItems={menuItems} />
          </Hidden>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
