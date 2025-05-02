import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginForm from './components/Login';
import RegisterForm from './components/Register';
import SignupForm from './components/Signup';
import "react-toastify/dist/ReactToastify.min.css";


function App() {
  return (
    <Router>
        <Routes>
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
    </Router>
  );
}

export default App;
