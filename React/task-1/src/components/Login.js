import { React, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Card, CardContent, Button, Modal } from "@mui/material";

const onChange = () => {};

const Login = () => {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [inputOtp, setInputOtp] = useState("");
  const [openForgotPassword, setOpenForgotPassword] = useState(false);

  const handleOtpRequest = async (e) => {
    e.preventDefault();
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString(); 
    setOtp(generatedOtp);
    setIsOtpSent(true); 
    setMessage(`OTP sent to your email! Your OTP is: ${generatedOtp}`);
  };

  const handleOtpVerification = (e) => {
    e.preventDefault();
    if (inputOtp === otp) {
      setMessage("OTP verified successfully! You can now change your password.");
      setIsOtpSent(false); 
    } else {
      setMessage("Invalid OTP. Please try again.");
    }
  };

  const handleForgotPasswordRequest = async (e) => {
    e.preventDefault();
    setMessage("Password reset link sent to your email!");
    setOpenForgotPassword(false);
  };

  const handleOpenForgotPassword = () => setOpenForgotPassword(true);
  const handleCloseForgotPassword = () => setOpenForgotPassword(false);

  // New login function to show alert
  const handleLogin = (e) => {
    e.preventDefault();
    alert("Save successfully");
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 10, display: "flex", flexDirection: "column", alignItems: "center",}}>
        <Card sx={{ boxShadow: "4" }}>
          <CardContent sx={{ m: 3 }}>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            {message && (
              <Typography color="success.main" sx={{ mt: 2 }}>
                {message}
              </Typography>
            )}
            <Box component="form" onSubmit={isOtpSent ? handleOtpVerification : handleOtpRequest} noValidate sx={{ mt: 1 }}>
              <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus value={email} onChange={(e) => setEmail(e.target.value)} />
              {isOtpSent && (
                <TextField margin="normal" required fullWidth id="otp" label="Enter OTP" name="otp" autoFocus value={inputOtp} onChange={(e) => setInputOtp(e.target.value)} />
              )}
              {!isOtpSent && (
                <>
                  <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
                </>
              )}
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, marginBottom: '10px' }}> {isOtpSent ? "Verify OTP" : "Send OTP"}</Button>
              <Link href="#" onClick={handleOpenForgotPassword} style={{background: "#1976d2", color: "white", display: "flex", justifyContent: "center", marginTop: "10px", cursor: "pointer",height: '35px', fontSize: '17px', borderRadius: '4px'}}>
                Forgot Password?
              </Link>
              <ReCAPTCHA sitekey="6LdDGUoqAAAAACOoT4mB6WgmfT_qfscv27K365h0" style={{display: "flex", justifyContent: "center", marginTop: "10px", }} onChange={onChange} />
              <Button fullWidth variant="contained" onClick={handleLogin} sx={{ mt: 2, marginBottom: '10px' }}>Login</Button>
              <Link href="/register" style={{background: "#1976d2", color: "white", display: "flex", justifyContent: "center", marginTop: "10px", height: '35px', fontSize: '17px', borderRadius: '4px'}}>Register</Link>
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Modal open={openForgotPassword} onClose={handleCloseForgotPassword} aria-labelledby="forgot-password-modal-title" aria-describedby="forgot-password-modal-description">
        <Box sx={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", boxShadow: 24, p: 4, borderRadius: "10px",}}>
          <Typography id="forgot-password-modal-title" variant="h6" component="h2">
            Forgot Password
          </Typography>
          <Typography id="forgot-password-modal-description" sx={{ mt: 2 }}>
            Enter your email to receive a password reset link.
          </Typography>
          <Box component="form" onSubmit={handleForgotPasswordRequest} sx={{ mt: 2 }}>
            <TextField margin="normal" required fullWidth id="forgot-email" label="Email Address" name="forgot-email" autoComplete="email" autoFocus value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField margin="normal" required fullWidth name="newPassword" label="New Password" type="password" id="newPassword"  value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>Send Reset Link</Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default Login;
