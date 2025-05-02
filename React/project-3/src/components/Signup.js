import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"; 

const Signup = (props) => {

  const [credentials, setcredentials] = useState({name:"", email: "", password: "", cpassword: ""})
  let history = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    const {name, email, password} = credentials;
    const response = await fetch("http://localhost:3000/api/auth/createuser",{
        method: 'POST',
        headers: {
            'Content-type': 'application.json'
        },
        body: JSON.stringify({name, email, password})
    });
    const json = await response.json()
    console.log(json);
    if (json.success){
        // save the auth token and redirect
        localStorage.setItem('token', json.authtoken);
        history.push("/");
        props.showAlert("Account created successfully", "success");
    }
    else{
        props.showAlert("Invalid details", "danger");
    }
}
const onchange = (e) => {
    setcredentials({credentials, [e.target.name]: e.target.value})
}
  return (
    <div className="mt-3">
        <h2 className="my-2">Create an account to use inotebook</h2>
      <form onSubmit={handlesubmit}>
        <div className="my-3">
          <label for="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" onChange={onchange} aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
          <label for="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" onChange={onchange} aria-describedby="emailHelp"/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label for="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" onchange={onchange} minLength={5}required/>
        </div>
        <div className="mb-3">
          <label for="cpassword" className="form-label">confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name="cpassword"onChange={onchange} minLength={5}required/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup;

