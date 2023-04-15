import * as React from "react";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import FolderOffIcon from "@mui/icons-material/FolderOff";
import LogoutIcon from "@mui/icons-material/Logout";

interface UserMenuProps {
  handleLogout: () => void;
  handleDeleteDirectories: () => void;
  handleDeleteUser: () => void;
}

const UserMenu = ({ handleLogout, handleDeleteDirectories ,handleDeleteUser}: UserMenuProps) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const actions = [
    {
      icon: <PersonRemoveIcon />,
      name: "Remove Account",
      handleClick: handleDeleteUser,
    },
    {
      icon: <FolderOffIcon />,
      name: "Delete All Directories",
      handleClick: handleDeleteDirectories,
    },
    { icon: <LogoutIcon />, name: "Logout", handleClick: handleLogout },
  ];

  return (
    <Box
      sx={{
        height: 330,
        flexGrow: 1,
        right: 0,
        bottom: 0,
        position: "absolute",
      }}
    >
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            onClick={action.handleClick}
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </Box>
  );
};

export default UserMenu;
