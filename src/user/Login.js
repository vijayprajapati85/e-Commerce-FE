import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { signIn } from '../apis/userApi';

import './login.css';

const Login = () =>{
    const[emailId, setEmailId] = useState('');
    const[pwd, setPwd] = useState('');

    const navigate = useNavigate();
  
    const handlePwdChange = (e) =>{
        setPwd(e.target.value);
    }

    const handleEmailChange = (e) =>{
        setEmailId(e.target.value);
    }
    
    const handleSubmit = async (e) =>
    {
        e.preventDefault();

        const postData = {
            emailId: emailId,
            password: pwd
        }

        const response = await signIn(postData);
        if (response.statusCode === 200) {
            
            localStorage.setItem("token", response.data.token);
            const profile =
            {
                emailId: response.data.emailId,
                fullName: response.data.fullName
            }

            localStorage.setItem("profile", JSON.stringify(profile));

            toast.success(response.title, {
                style: {
                    width: '350px',
                },
            });
            navigate('/');
        }
        else {
            toast.error(response.title);
        }
    }

    return(
        <>
            <div class="login-container">
                <form onSubmit={handleSubmit}>
                    <h2>Login to Your Account</h2>
                    <p>Welcome back! Please enter your details.</p>
                    <div class="input-group">
                        <label for="username">Email</label>
                        <input type="text" id="username" name="username" onChange={handleEmailChange} required />
                    </div>
                    <div class="input-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" onChange={handlePwdChange} required/>
                    </div>
                    <button type="submit" class="login-button">Log In</button>
                    <div class="form-footer">
                        <Link to='/reset'>Forgot password?</Link>&nbsp;&nbsp;
                        <span>Don't have an account? <Link to='/signup'>Sign up</Link></span>
                    </div>
                </form>
            </div>
        </>

    )

}


export default Login;