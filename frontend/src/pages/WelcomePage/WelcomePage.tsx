import React from 'react';
import {  useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

const WelcomePage = () => {
const navigate = useNavigate();
  const handleClick = () => {
    navigate('/reader'); // navigate to input page when the button is clicked
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to Read to Me!
      </Typography>
      <Typography variant="h5" gutterBottom>
        This text will describe how the app works and will give instructions
      </Typography>
      <Button variant="contained" size="large" onClick={handleClick} sx={{ mt: 4 }}>
        Get Started
      </Button>
    </Box>
  );
};

export default WelcomePage;


