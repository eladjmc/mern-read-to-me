import * as React from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import ReaderIcon from "@mui/icons-material/Book";
import LibraryIcon from "@mui/icons-material/LibraryBooks";
import UserIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/ExitToApp";

interface MobileNavbarProps {
  menuItems: {
    label: string;
    onClick: () => void;
  }[];
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({ menuItems }) => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (isOpen: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(isOpen);
  };

  const icons = [
    <ReaderIcon />,
    <LibraryIcon />,
    <UserIcon />,
    <LogoutIcon />,
  ];

  return (
    <>
      <IconButton
        size="large"
        edge="end"
        color="inherit"
        aria-label="menu"
        sx={{ ml: 2 }}
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List>
          {menuItems.map((item, index) => (
            <ListItem
              button
              key={item.label}
              onClick={() => {
                item.onClick();
                setDrawerOpen(false);
              }}
            >
              <ListItemIcon>{icons[index]}</ListItemIcon>
              <Typography>{item.label}</Typography>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default MobileNavbar;