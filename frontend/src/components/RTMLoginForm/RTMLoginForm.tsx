import { Box, Button, FormLabel, Link, Typography } from "@mui/material";
import RTMTextField from "../RTMTextField/RTMTextField";
import "./RTMLoginForm.scss";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import USERS_API from "../../services/usersApi";
import { RTMSession } from "../../services/RTMSession";
import { useEffect, useState } from "react";
import { RTMStorage } from "../../services/RTMStorage";
import { READER_STORAGE_KEY } from "../../context/ReaderContext";

const RTMLoginForm = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

    RTMStorage.removeItem(READER_STORAGE_KEY);

  }, []);

  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      RTMSession.token = null; // Logging in will reset the token.
      setIsLoading(true);
      const { accessToken } = await USERS_API.login({
        email: data.get("email") as string,
        password: data.get("password") as string,
      });

      RTMSession.token = accessToken;
      navigate("/");
      setIsLoading(false);
    } catch (error: any) {
      //TODO: prompt error
      setError(error.response.data.message || "Error had accrued");
      setIsLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <div className="login-title">
      <img src="assets/images/logoColoredBig.png" width={400} alt="" />
        <Box className="small-screen">
        <Typography variant="h3">RTM - Sign In</Typography>
      </Box>
      </div>
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
        {isLoading ? "Loading..." : "Sign In"}
      </Button>
      <p className={`error-msg ${!!error ? "text-show" : ""}`}>{error}</p>
      <Link component={RouterLink} to="/sign-up" variant="body2">
        {"Don't have an account? Sign Up"}
      </Link>
    </Box>
  );
};

export default RTMLoginForm;
