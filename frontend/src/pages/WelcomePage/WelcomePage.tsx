import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";

const WelcomePage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/reader");
  };

  const keyFeatures = [
    "Read and highlight text input",
    "Save texts in libraries and play them later",
    "Load text documents from your folders in the Library page",
    "User-related actions, such as account deletion and library management",
  ];

  const customizationOptions = [
    "Adjust reading speed",
    "Change voice volume",
    "Alter text direction",
    "And many more...",
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        p: 2,
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: "center" }}>
        <Typography variant="h2" component="h1" gutterBottom align="center">
          Welcome to Read to Me!
        </Typography>
        <Typography variant="h6" gutterBottom align="center">
          Read to Me is an app designed to assist people with visual impairments,
          reading difficulties, and anyone seeking a comfortable reading experience.
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={handleClick}
          sx={{ mt: 4 }}
        >
          Get Started
        </Button>
        <Card sx={{ my: 4 }}>
          <CardHeader title="Key Features" align="center" />
          <CardContent>
            <List>
              {keyFeatures.map((feature) => (
                <ListItem key={feature}>
                  <ListItemText primary={feature} />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
        <Card sx={{ my: 4 }}>
          <CardHeader title="Customization Options" align="center" />
          <CardContent>
            <List>
              {customizationOptions.map((option) => (
                <ListItem key={option}>
                  <ListItemText primary={option} />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
        <Box
          sx={{
            position: "relative",
            height: "45vw",
            width: "100%",
            maxHeight: "390px",
            margin: "0 auto",
            mt: 2,
          }}
        >
          <iframe
            src="https://www.loom.com/embed/1813beb60d874bcabc21865e6ac5e034"
            frameBorder="0"
            allowFullScreen
            title="Loom video tutorial"
            style={{
              height: "100%",
              width: "100%",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          ></iframe>
        </Box>
      </Container>
    </Box>
  );
};

export default WelcomePage;