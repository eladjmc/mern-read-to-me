import React, { useEffect, useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Box,
  IconButton,
  Container,
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import USERS_API from "../../services/usersApi";
import { useGlobalReader } from "../../context/ReaderContext";
import { useNavigate } from "react-router";
import "./LibraryPage.scss";
import DirectoryDialog from "../../components/library/DirectoryDialog";
import DeleteDirectoryConfirmation from "../../components/library/DeleteDirectoryConfirmation";
import NoDirectoriesModal from "../../components/library/NoDirectoriesModal";

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

const LibraryPage = () => {
  const [directories, setDirectories] = useState<Directory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { setCurrentText } = useGlobalReader();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDirectory, setSelectedDirectory] = useState<Directory | null>(
    null
  );
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [directoryToDelete, setDirectoryToDelete] = useState<string | null>(
    null
  );

  const handleDeleteDialogOpen = (directoryTitle: string) => {
    setDirectoryToDelete(directoryTitle);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleConfirmedDelete = async () => {
    if (directoryToDelete) {
      await deleteDirectory(directoryToDelete);
    }
    setDeleteDialogOpen(false);
  };

  const handleOpenDialog = (directory: Directory) => {
    setSelectedDirectory(directory);
    setOpenDialog(true);
  };

  const handleCloseDialog = async () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    fetchDirectories();
  }, []);

  const fetchDirectories = async () => {
    setIsLoading(true);
    try {
      const fetchedDirectories: any = await USERS_API.getDirectories();
      console.log(fetchedDirectories);

      setDirectories(fetchedDirectories.data.data);
    } catch (error) {
      console.error("Error fetching directories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteDirectory = async (directoryTitle: string) => {
    try {
      const result: any = await USERS_API.deleteDirectory({ directoryTitle });
      console.log(result.data);
      fetchDirectories();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteDocument = async (documentId: string, directoryTitle: string) => {
    try {
      const result: any = await USERS_API.deleteDocument({
        documentId,
        directoryTitle,
      });
      console.log(result.data);

      // Refresh directories after deleting a document
      setOpenDialog(false);
      fetchDirectories();
    } catch (error) {
      console.log(error);
    }
  };

  const handlePlayDocument = (doc: Document) => {
    setCurrentText(doc.text);
    navigate("/reader");
  };

  return (
    <>
      <Box mt={3} mb={3}>
        <Typography  variant="h2" align="center">
          Your Library
        </Typography>
      </Box>

      <div className="page library-page">
        {isLoading && (
          <Grid container justifyContent="center">
            <CircularProgress />
          </Grid>
        )}
        {!isLoading && (
          <Grid
          sx={{maxWidth:"1500px", padding: "20px"}}
            container
            className="grid"
            direction="row"
            flexWrap="wrap"
            spacing={2}
          >
            {directories.map((directory, index) => (
              <Grid minWidth="300px" item key={index}>
                <Box textAlign="center" p={2} borderRadius={1} boxShadow={1}>
                  <FolderIcon
                    style={{ fontSize: "74px", cursor: "pointer" }}
                    onClick={() => handleOpenDialog(directory)}
                    color="primary"
                  />
                  <Typography
                    variant="subtitle1"
                    display="flex"
                    alignItems="end"
                    justifyContent="space-between"
                  >
                    {directory.title}
                    <Box mt={1} ml={1}>
                      <IconButton
                        onClick={() => handleDeleteDialogOpen(directory.title)}
                        color="inherit"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Typography>
                </Box>
              </Grid>
            ))}
            
          </Grid>
        )}
        <DirectoryDialog
          open={openDialog}
          onClose={handleCloseDialog}
          directory={selectedDirectory}
          handleLoadDocument={handlePlayDocument}
          deleteDocument={deleteDocument}
        />
        <DeleteDirectoryConfirmation
          open={deleteDialogOpen}
          onClose={handleDeleteDialogClose}
          onConfirm={handleConfirmedDelete}
          title="Delete Directory"
          message="Are you sure you want to delete this directory? All documents inside will be permanently removed."
        />
        <NoDirectoriesModal open={directories.length === 0 && !isLoading} />
      </div>
    </>
  );
};

export default LibraryPage;
