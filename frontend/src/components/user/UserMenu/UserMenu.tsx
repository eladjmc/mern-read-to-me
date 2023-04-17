import * as React from "react";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import FolderOffIcon from "@mui/icons-material/FolderOff";
import LogoutIcon from "@mui/icons-material/Logout";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

interface UserMenuProps {
  handleLogout: () => void;
  handleDeleteDirectories: () => void;
  handleDeleteUser: () => void;
}

const UserMenu = ({
  handleLogout,
  handleDeleteDirectories,
  handleDeleteUser,
}: UserMenuProps) => {
  const [open, setOpen] = React.useState(false);
  const [deleteAccountDialogOpen, setDeleteAccountDialogOpen] =
    React.useState(false);
  const [deleteDirectoriesDialogOpen, setDeleteDirectoriesDialogOpen] =
    React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const actions = [
    {
      icon: <PersonRemoveIcon />,
      name: "Remove Account",
      handleClick: () => setDeleteAccountDialogOpen(true),
    },
    {
      icon: <FolderOffIcon />,
      name: "Delete All Directories",
      handleClick: () => setDeleteDirectoriesDialogOpen(true),
    },
    { icon: <LogoutIcon />, name: "Logout", handleClick: handleLogout },
  ];

  return (
    <>
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

      <Dialog
        open={deleteAccountDialogOpen}
        onClose={() => setDeleteAccountDialogOpen(false)}
      >
        <DialogTitle>Remove Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove your account? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteAccountDialogOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleDeleteUser();
              setDeleteAccountDialogOpen(false);
            }}
            color="primary"
          >
            Remove Account
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteDirectoriesDialogOpen}
        onClose={() => setDeleteDirectoriesDialogOpen(false)}
      >
        <DialogTitle>Delete All Directories</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete all directories? This action cannot
            be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDirectoriesDialogOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleDeleteDirectories();
              setDeleteDirectoriesDialogOpen(false);
            }}
            color="primary"
          >
            Delete All Directories
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserMenu;
