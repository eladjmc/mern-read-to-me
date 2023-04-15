import { Box, Button, FormLabel, Link, Typography } from "@mui/material";
import RTMTextField from "../RTMTextField/RTMTextField";
import "./RTMSignUpForm.scss";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import USERS_API from "../../services/usersApi";
import { RTMSession } from "../../services/RTMSession";
import { useState } from "react";

const RTMSignUpForm = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      RTMSession.token = null; // Logging in will reset the token.
      setIsLoading(true);

      await USERS_API.register({
        email: data.get("email"),
        password: data.get("password"),
        age: data.get("age"),
        name: data.get("name"),
      });

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
          <Typography variant="h3">RTM - Register</Typography>
        </Box>
      </div>
      <RTMTextField
        id="name"
        label="Full Name"
        autoComplete="name"
        required
        autoFocus
      />
      <RTMTextField
        id="age"
        label="Your Age"
        autoComplete="age"
        type="number"
        autoFocus
        InputProps={{
          inputProps: {
            min: 3,
            max: 130,
          },
        }}
      />
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
        {isLoading ? "Loading..." : "Register"}
      </Button>
      <p className={`error-msg ${!!error ? "text-show" : ""}`}>{error}</p>
      <Link component={RouterLink} to="/login" variant="body2">
        {"Have an account already? Login"}
      </Link>
    </Box>
  );
};

export default RTMSignUpForm;
