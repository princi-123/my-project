import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Card, CardContent } from "@mui/material";

const onChange = () => {};

const signup = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log({
      firstname: data.get("firstname"),
      lastname: data.get("lastname"),
      email: data.get("email"),
      password: data.get("password"),
    });
    alert("Saved successfully");
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 10, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Card sx={{ boxShadow: "4" }}>
          <CardContent sx={{ m: 3 }}>
            <Typography component="h1" variant="h5">
              Signup
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField margin="normal" required fullWidth id="firstname" label="First Name" name="firstname" autoComplete="firstname"autoFocus/>
              <TextField margin="normal" required fullWidth id="lastname" label="Last Name" name="lastname" autoComplete="lastname"/>
              <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus/>
              <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password"/>
              <ReCAPTCHA sitekey="6LdDGUoqAAAAACOoT4mB6WgmfT_qfscv27K365h0" style={{ display: "flex", justifyContent: "center" }} onChange={onChange}/>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 2 }}>Signup</Button>
              <Link href="/login" style={{background: "#1976d2", color: "white", display: "flex", justifyContent: "center", marginTop: "10px", height: "35px", fontSize: "17px", borderRadius: "4px",}}>Login</Link>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default signup;
