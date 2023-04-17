import React, { useState, useEffect } from "react";
import {
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CreateDirectoryDialog from "./CreateDirectoryDialog";
import SaveDocumentDialog from "./SaveDocumentDialog";
import USERS_API from "../../services/usersApi";
import { useGlobalReader } from "../../context/ReaderContext";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import { DocumentDrawer } from "./DocumentDrawer";

interface RTMDrawerProps {
  onDrawerOpenState?: (...args: any[]) => void;
}

const RTMDrawer = ({ onDrawerOpenState }: RTMDrawerProps) => {
  const { currentText, setCurrentText } = useGlobalReader();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [createDirectoryDialogOpen, setCreateDirectoryDialogOpen] =
    useState(false);
  const [saveDocumentDialogOpen, setSaveDocumentDialogOpen] = useState(false);
  const [directories, setDirectories] = useState([]); // Replace with directories fetched from the database
  const [selectedDirectory, setSelectedDirectory] = useState("");
  const [inputText, setInputText] = useState(currentText);
  const [newDirectoryName, setNewDirectoryName] = useState("");
  const [documentName, setDocumentName] = useState("");
  const [documentDescription, setDocumentDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onDrawerOpenState?.(drawerOpen);
  }, [drawerOpen]);

  const fetchDirectories = async () => {
    setSuccessMessage("");
    setErrorMessage("");
    setIsLoading(true);
    try {
      const fetchedDirectories: any = await USERS_API.getDirectories();
      const directories = fetchedDirectories.data.data.map(
        (dir: any) => dir.title
      );

      setDirectories(directories);
    } catch (error) {
      console.error("Error fetching directories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlay = () => {
    if (!inputText) {
      setErrorMessage("No Text To play");
      return;
    }
    setCurrentText(inputText);
    setSuccessMessage("");
    setErrorMessage("");
    setDrawerOpen(false);
    // TODO: Logic to move text to the Reader;
  };

  const handleSaveDocument = async () => {
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const result = await USERS_API.addDocument({
        directoryTitle: selectedDirectory,
        title: documentName,
        text: inputText,
        description: documentDescription,
      });
      setDocumentName("");
      setDocumentDescription("");
      await fetchDirectories();
      setSuccessMessage("Document saved successfully.");
    } catch (error: any) {
      setErrorMessage(error.response.data?.message || "Error had accrued");
    } finally {
      setIsLoading(false);
      setSaveDocumentDialogOpen(false);
    }
  };

  const handleCreateNewDirectory = async () => {
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const result = await USERS_API.addDirectory({
        title: newDirectoryName,
      });
      await fetchDirectories();
      setSelectedDirectory(newDirectoryName);
      setSuccessMessage("Directory created successfully.");
    } catch (error: any) {
      setErrorMessage(error.response.data?.message || "Error had accrued");
    } finally {
      setIsLoading(false);
      setCreateDirectoryDialogOpen(false);
    }
  };

  return (
    <>
      <IconButton
        color="inherit"
        onClick={() => {
          setDrawerOpen(true);
          fetchDirectories();
        }}
      >
        <ArticleRoundedIcon fontSize="inherit" />
      </IconButton>
      <DocumentDrawer
        title="Create Document"
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        errorMessage={errorMessage}
      >
        {successMessage && (
          <div
            style={{
              color: "green",
              display: "flex",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            <CheckCircleOutlineIcon style={{ marginRight: "4px" }} />
            {successMessage}
          </div>
        )}
        {!isLoading ? (
          <>
            <TextField
              label="Text"
              multiline
              fullWidth
              rows={8}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <FormControl fullWidth sx={{ marginTop: 2 }}>
              <InputLabel>Directory</InputLabel>
              <Select
                value={selectedDirectory}
                onChange={(e) => setSelectedDirectory(e.target.value)}
              >
                {directories.map((dir, index) => (
                  <MenuItem key={index} value={dir}>
                    {dir}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="outlined"
              sx={{ marginTop: 2 }}
              onClick={() => setCreateDirectoryDialogOpen(true)}
            >
              New Directory
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: 2 }}
              onClick={() => setSaveDocumentDialogOpen(true)}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<PlayArrowIcon />}
              sx={{ marginTop: 2 }}
              onClick={handlePlay}
            >
              Play
            </Button>
          </>
        ) : (
          <CircularProgress />
        )}
      </DocumentDrawer>

      <CreateDirectoryDialog
        open={createDirectoryDialogOpen}
        onClose={() => setCreateDirectoryDialogOpen(false)}
        newDirectoryName={newDirectoryName}
        setNewDirectoryName={setNewDirectoryName}
        handleCreateNewDirectory={handleCreateNewDirectory}
      />

      <SaveDocumentDialog
        open={saveDocumentDialogOpen}
        onClose={() => setSaveDocumentDialogOpen(false)}
        documentName={documentName}
        setDocumentName={setDocumentName}
        documentDescription={documentDescription}
        setDocumentDescription={setDocumentDescription}
        handleSaveDocument={handleSaveDocument}
      />
    </>
  );
};

export default RTMDrawer;
