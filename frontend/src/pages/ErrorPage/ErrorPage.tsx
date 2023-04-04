import { Button, Container, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router';

const ErrorPage = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <StyledContainer>
      <Typography variant="h1">404</Typography>
      <Typography variant="h4">Page Not Found</Typography>
      <Button variant="contained" onClick={handleGoBack}>
        Go Back
      </Button>
    </StyledContainer>
  );
};

const StyledContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  gap: '2rem',
  textAlign: 'center',
});

export default ErrorPage;