import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signInAdmin } from '../apis/userApi';

import '../user/userform.css'
const AdminLogin = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    if (localStorage.getItem("tokenentry")) {
        navigate('/admin/products');
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        const postData = {
            emailId: username,
            password: password
        }
        const response = await signInAdmin(postData);

        if (response.statusCode === 200) {
            localStorage.setItem("tokenentry", response.data.token);
            const profile =
            {
                emailId: response.data.emailId,
                fullName: response.data.fullName
            }
            localStorage.setItem("profileentry", JSON.stringify(profile));
            toast.success(response.title, {
                style: {
                    width: '350px',
                },
            });
            navigate('/admin/products');
        }
        else {
            toast.error(response.title);
        }
    };

    return (
        <>
            <div className="main-content">
                <div className="landing-text-area">
                    <h2>Landing Page Template background</h2>
                    <h3>Some another contet plage here.....</h3>
                </div>
                <div className='login-container'>
                    <div className='login-header'>
                        <h2>Login to Your Account</h2>
                        <p>Welcome back! Please enter your details.</p>
                    </div>
                    <form onSubmit={handleLogin}>
                        <div className="input-group">
                            <label for="username">User Name</label>
                            <input type="text" id="username" name="username" onChange={(e) => setUsername(e.target.value)} required />
                        </div>
                        <div className="input-group">
                            <label for="password">Password</label>
                            <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <button type="submit" className="login-button">Log In</button>
                    </form>
                </div>

            </div>
        </>
    );
}

export default AdminLogin;