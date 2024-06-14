import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = () => {

   
    const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function handleLogin() {
    const usernameInput = document.getElementById('lname');
    const passwordInput = document.getElementById('lpassword');
  
    const username = usernameInput.value;
    const password = passwordInput.value;
  
    try {
      const response = await fetch('https://bloodbank-exwj.onrender.com/req-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
  
      const responseData = await response.json();
  
      if (response.status === 200) {
        // alert("Login Successful!!");
        const userId = responseData._id;
        localStorage.setItem('userId', userId);
        const name=responseData.username;
        localStorage.setItem('username', name);
        window.location = "/home";
      } else if (response.status === 401) {
        alert("Invalid credentials. Please try again.");
      } else {
        alert(`Unexpected error: ${responseData.message}`);
      }
  
    } catch (error) {
      alert('Error occurred. Please try again later.');
      console.error('Login error:', error);
    }
  }
  
   return(
    <div>
        <div id="logindiv">
            <div id="login">
                <h2 id="lhead"><br/>Login</h2><br/>
                <label htmlFor="name" className="llabel">Username</label>
                <input type="text" name="lname" id="lname"/><br/><br/>
                <label htmlFor="password" className="llabel">Password</label>
            
                <input type={showPassword ? 'text' : 'password'} name="lpassword" id="lpassword"/>
                <button id="eye" type="button" onClick={togglePasswordVisibility}>
                <FontAwesomeIcon  icon={showPassword ? faEyeSlash : faEye} />
                </button>
                <br/><br/>

                <button id="loginsubmit" onClick={handleLogin}>Login</button>
            <div id="ldown">
                <p>Don't have an account? <Link to="/register" style={{ textDecoration: 'none' }}>Create one here</Link></p>
            
            </div>
            </div>
        </div>
    </div>
   )
}
export default Login