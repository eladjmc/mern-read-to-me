import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";

interface CreateDirectoryDialogProps {
  open: boolean;
  onClose: () => void;
  newDirectoryName: string;
  setNewDirectoryName: (value: string) => void;
  handleCreateNewDirectory: () => void;
}

const CreateDirectoryDialog: React.FC<CreateDirectoryDialogProps> = ({
  open,
  onClose,
  newDirectoryName,
  setNewDirectoryName,
  handleCreateNewDirectory,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New Directory</DialogTitle>
      <DialogContent>
        <TextField
         sx={{ marginTop: 2 }}
          autoFocus
          label="Directory Name"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={newDirectoryName}
          onChange={(e) => setNewDirectoryName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCreateNewDirectory}>Create</Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateDirectoryDialog;