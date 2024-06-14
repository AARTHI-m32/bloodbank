import { Link} from "react-router-dom"
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
const Register = () => {

    const[register,setRegister]=useState({
        username: '',
        email: '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const handlechange = e => {
        setRegister({ ...register,[e.target.name]:e.target.value})
    }

    const handlesubmit = async e => {
        e.preventDefault();
        try{
            const response=await fetch('https://bloodbank-exwj.onrender.com/add-user',{
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(register)

        });
        const responseData = await response.json();
        if(response.ok){
            //  alert("User registered!!")
             setRegister({
                username: '',
                email: '',
                password: ''
             });
          

             
             window.location = "/login";
        }
       
        else{
            alert("Error occured.Failed to Register!")
        }
        }
        catch(error){
            console.error('Error adding User:', error);
            alert('Error . Please try again later.');
        }
    }

   
   
return(
    <div>
         
        <div id="register">
            <h2 id="rhead"><br/>Register</h2><br/>
            <label htmlFor="name" className="rlabel" >Username</label>
            <input type="text" name="username" id="rname" onChange={handlechange} value={register.username}/><br/><br/>
            <label htmlFor="email" className="rlabel">E-mail</label>
            <input type="text" name="email" id="remail" onChange={handlechange} value={register.email}/><br/><br/>          
            <label htmlFor="password" className="rlabel" >Password</label>
            <input type={showPassword ? 'text' : 'password'} name="password" id="rpassword" onChange={handlechange} value={register.password} required/>
            <button id="eye" type="button" onClick={togglePasswordVisibility}>
                <FontAwesomeIcon  icon={showPassword ? faEyeSlash : faEye} />
                </button><br/><br/>
           <Link to="/home"> <button id="rsubmit" onClick={handlesubmit}>Register</button></Link>
           <div id="ldown">
                <p>Already have an account? <Link to="/login" style={{ textDecoration: 'none' }}>Login</Link></p>           
            </div>
           
        </div>
    </div>
)
}

export default Register