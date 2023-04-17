import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";

interface SaveDocumentDialogProps {
  open: boolean;
  onClose: () => void;
  documentName: string;
  setDocumentName: (value: string) => void;
  documentDescription: string;
  setDocumentDescription: (value: string) => void;
  handleSaveDocument: () => void;
}

const SaveDocumentDialog: React.FC<SaveDocumentDialogProps> = ({
  open,
  onClose,
  documentName,
  setDocumentName,
  documentDescription,
  setDocumentDescription,
  handleSaveDocument,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Save Document</DialogTitle>
      <DialogContent>
        <TextField
          sx={{ marginTop: 2 }}
          label="Document Name"
          fullWidth
          value={documentName}
          onChange={(e) => setDocumentName(e.target.value)}
        />
        <TextField
          label="Document Description"
          fullWidth
          multiline
          rows={4}
          sx={{ marginTop: 2 }}
          value={documentDescription}
          onChange={(e) => setDocumentDescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSaveDocument}>Save</Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SaveDocumentDialog;
