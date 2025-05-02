import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"; 
const Login = (props) => {

    const [credentials, setcredentials] = useState({email: "", password: ""})
    let Navigate = useNavigate();

    const handlesubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:3000/api/auth/login",{
            method: 'POST',
            headers: {
                'Content-type': 'application.json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json()
        console.log(json);
        if (json.success){
            // save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            props.showAlert("toggle in  successfully", "success");
            Navigate.push("/");
        }
        else{
            props.showAlert("Invalid credentials", "danger");
        }
    }
    const onchange = (e) => {
        setcredentials({credentials, [e.target.name]: e.target.value})
    }
  return (
    <div className="mt-3">
        <h2>Login to continue to inotebook</h2>
      <form onSubmit={handlesubmit}>
        <div className="mb-3">
            <label htmlfor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" value={credentials.email} onChange={onchange} id="email" name="email" aria-describedby="emailHelp"/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlfor="password" className="form-label">Password</label>
            <input type="password" className="form-control" value={credentials.password} onChange={onchange} name="password" id="password"/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Login
