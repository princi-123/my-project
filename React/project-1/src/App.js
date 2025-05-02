import './App.css';
// import About from './components/About';
import Alert from './components/Alert';
import Navbar from './components/Navbar';
import TextFrom from './components/TextFrom';
import React,{ useState } from 'react';
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route
// } from "react-router-dom";

export default function App() {
  const [mode, setMode] = useState('light');
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert ({
      msg: message,
      type: type
    });

    setTimeout (() => {
      setAlert(null);
    }, 3000);
  }
  const removeBodyClasses = ()=>{
    document.body.classList.remove('bg-light')
    document.body.classList.remove('bg-dark')
    document.body.classList.remove('bg-warning')
    document.body.classList.remove('bg-danger')
    document.body.classList.remove('bg-success')
  }
  const toggleMode = (cls) => {
    removeBodyClasses();
    console.log(cls)
    document.body.classList.add('bg-'+cls)
    if(mode === 'light'){
      setMode('dark');
      document.body.style.background = 'gray';
      showAlert("Dark mode has been enabled","success");
    }
    else {
      setMode('light');
      document.body.style.background = 'white';
      showAlert("Light mode has been enabled","success");
    }
  }
  return (
    <>
<Navbar title="Textutils" mode={mode} toggleMode={toggleMode}/>
<Alert alert={alert}/>
{/* <Router> */}
<div className="container my-3">
{/* <Switch> */}
  {/* / users --> Component 1
  /users / home --> --> component 2  */}
          {/* <Route exact path="/about">
            <About/>
          </Route> */}
          {/* <Route exact path="/"> */}
          <TextFrom heading = "Enter the text to analyze below" mode={mode} showAlert={showAlert}/>
          {/* </Route> */}
        {/* </Switch> */}
        </div>
        {/* </Router> */}
        {/* <About/> */}
      </>
  );
}

