import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { orange } from "@mui/material/colors";

import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { getUserApi } from "../api";
import Loading from "./Loading";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Boardit!
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme({
  palette: {
    primary: {
      main: orange[800],
    },
  },
});

export default function SignIn({ setLoggedUser, setUserDetails }) {
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (event) => {
    setIsLoading(true);
    setError(false);
    event.preventDefault();
    getUserApi()
      .then((users) => {
        for (let user of users) {
          if (user.username === userInput) {
            setLoggedUser(userInput);
            setUserDetails(user);
            localStorage.setItem("user", userInput);
            localStorage.setItem("userDetails", user);
            console.log(user);
          }
        }
        setError(true);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(true);
      });
  };

  return isLoading ? (
    <Loading />
  ) : (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xs"
        className=" bg-white"
        sx={{ pt: 5, pb: 70 }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="Username"
              label="Username"
              name="Username"
              autoComplete="Username"
              autoFocus
              value={userInput}
              onChange={(event) => {
                setUserInput(event.target.value);
              }}
            />
            {error ? (
              <p className="errorMessage">
                Invalid Username, Please Try Again!
              </p>
            ) : null}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/sign-up" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
