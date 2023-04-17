import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { useNavigate } from "react-router";

interface NoDirectoriesModalProps {
  open: boolean;
}

const NoDirectoriesModal: React.FC<NoDirectoriesModalProps> = ({ open }) => {
  const navigate = useNavigate();

  const handleGoToReader = () => {
    navigate("/reader");
  };

  return (
    <Dialog open={open} onClose={() => {}}>
      <DialogTitle>No Directories Found</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Sorry, you don't have any directories yet. You can add a directory at the Reader page.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleGoToReader} variant="contained" color="primary">
          Go to Reader
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NoDirectoriesModal;