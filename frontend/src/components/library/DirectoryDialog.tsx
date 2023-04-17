import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Tooltip,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";

interface Directory {
  _id: string;
  title: string;
  documents: Document[];
}

interface Document {
  _id: string;
  title: string;
  description: string;
  text: string;
}

interface DirectoryDialogProps {
  open: boolean;
  onClose: () => void;
  directory: Directory | null;
  handleLoadDocument: (doc: Document) => void;
  deleteDocument: (documentId: string, directoryTitle: string) => void;
}

const DirectoryDialog: React.FC<DirectoryDialogProps> = ({
  open,
  onClose,
  directory,
  handleLoadDocument,
  deleteDocument,
}) => {
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = React.useState(
    false
  );
  const [documentToDelete, setDocumentToDelete] = React.useState<Document | null>(
    null
  );

  const openDeleteConfirmation = (doc: Document) => {
    setDocumentToDelete(doc);
    setDeleteConfirmationOpen(true);
  };

  const closeDeleteConfirmation = () => {
    setDeleteConfirmationOpen(false);
  };

  const handleConfirmDelete = () => {
    if (documentToDelete) {
      deleteDocument(documentToDelete._id, directory?.title || "");
      onClose(); // Close the directory dialog after deleting the document
    }
    closeDeleteConfirmation();
  };

  if (!directory) return null;

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
        <DialogTitle>{directory.title}</DialogTitle>
        <DialogContent>
          <List>
            {directory.documents.map((doc, docIndex) => (
              <ListItem key={docIndex}>
                <ListItemText
                  primary={doc.title}
                  secondary={doc.description || "No description"}
                />
                <ListItemSecondaryAction>
                  <Tooltip title="Load document">
                    <IconButton
                      edge="end"
                      color="inherit"
                      onClick={() => handleLoadDocument(doc)}
                    >
                      <PlayArrowIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete document">
                    <IconButton
                      edge="end"
                      color="inherit"
                      onClick={() => openDeleteConfirmation(doc)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
      <DeleteConfirmationDialog
        open={deleteConfirmationOpen}
        onClose={closeDeleteConfirmation}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default DirectoryDialog;
