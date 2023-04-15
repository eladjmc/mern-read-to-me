import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  List,
  ListItem,
  ListItemText,
  IconButton,
  ListItemIcon,
  Tooltip,
} from '@mui/material';
import USERS_API from '../../services/usersApi';
import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionIcon from '@mui/icons-material/Description';
import FolderIcon from '@mui/icons-material/Folder';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';

interface Document {
  _id: string;
  title: string;
}

interface Directory {
  title: string;
  documents: Document[];
}

interface LibraryPageProps {
  handleLoadDocument: (documentId: string) => void;
}

const LibraryPage: React.FC<LibraryPageProps> = ({ handleLoadDocument }) => {
  const [directories, setDirectories] = useState<Directory[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedDirectories: any = await USERS_API.getDirectories();
        console.log(fetchedDirectories);

        setDirectories(fetchedDirectories.data.data);
      } catch (error) {
        console.error('Error fetching directories:', error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteDirectory = (directoryIndex: number) => {
    const updatedDirectories = [...directories];
    updatedDirectories.splice(directoryIndex, 1);
    setDirectories(updatedDirectories);
  };

  const handleDeleteDocument = (directoryIndex: number, documentIndex: number) => {
    const updatedDirectories = [...directories];
    updatedDirectories[directoryIndex].documents.splice(documentIndex, 1);
    setDirectories(updatedDirectories);
  };

  return (
    <Container>
      <Box mt={4} mb={2}>
        <Typography variant="h4">My Directories</Typography>
      </Box>
      <Grid container spacing={4}>
        {Array.isArray(directories) &&
          directories.map((directory, dirIndex) => (
            <Grid item xs={12} sm={6} md={4} key={dirIndex}>
              <Card>
                <CardHeader
                  title={directory.title}
                  avatar={<FolderIcon />}
                  action={
                    <Tooltip title="Delete Directory">
                      <IconButton
                        edge="end"
                        color="error"
                        onClick={() => handleDeleteDirectory(dirIndex)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  }
                />
                <CardContent>
                  <List>
                    {directory.documents.map((document, docIndex) => (
                      <ListItem key={document._id}>
                        <ListItemIcon>
                          <DescriptionIcon />
                        </ListItemIcon>
                        <ListItemText primary={document.title} />
                        <Tooltip title="Delete Document">
                          <IconButton
                            edge="end"
                            color="error"
                            onClick={() => handleDeleteDocument(dirIndex, docIndex)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Load Document">
                          <IconButton
                            edge="end"
                            color="primary"
                            onClick={() => handleLoadDocument(document._id)}
                          >
                            <OpenInBrowserIcon />
                          </IconButton>
                        </Tooltip>
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default LibraryPage;
