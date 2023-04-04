import { Box, Button, FormLabel, Link } from "@mui/material";
import RTMTextField from "../RTMTextField/RTMTextField";
import './RTMLoginForm.scss'
import { Link as RouterLink, useNavigate } from "react-router-dom";
import USERS_API from "../../services/usersApi";
import { RTMSession } from "../../services/RTMSession";
import { useState } from "react";

const RTMLoginForm = () => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      RTMSession.token = null; // Logging in will reset the token.
      setIsLoading(true)
      const { accessToken } = await USERS_API.login({
        email: data.get("email") as string,
        password: data.get("password") as string,
      });
      
      RTMSession.token = accessToken;
      navigate("/");
      setIsLoading(false)
    } catch (error:any) {
      //TODO: prompt error
      setError(error.response.data.message || 'Error had accrued')
      setIsLoading(false) 
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <RTMTextField
        id="email"
        label="Email Address"
        autoComplete="email"
        required
        autoFocus
      />

      <RTMTextField
        required
        id="password"
        type="password"
        autoComplete="current-password"
      />

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        {isLoading?'Loading...': 'Sign In'}
      </Button>
      <p className={`error-msg ${!!error? 'text-show': ''}`}>{error}</p>
      <Link component={RouterLink} to="/sign-up" variant="body2">
        {"Don't have an account? Sign Up"}
      </Link>
    </Box>
  );
};

export default RTMLoginForm;
