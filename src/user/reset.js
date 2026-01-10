
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { resetPwd } from '../apis/userApi';

import './login.css';

const Reset = () => {
    const [emailId, setEmailId] = useState('');

    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmailId(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await resetPwd(emailId);
        if (response.statusCode === 200) {
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

    return (
        <>
            <div class="login-container">
                <form onSubmit={handleSubmit}>
                    <h2>Reset Your Password</h2>
                    <p>Please enter your details.</p>
                    <div class="input-group">
                        <label for="username">Email</label>
                        <input type="text" id="username" name="username" onChange={handleEmailChange} required />
                    </div>
                    <p className='alert'>Note: Password will send on your email id</p>
                    <button type="submit" class="login-button">Reset</button>
                    <div class="form-footer">
                        <Link to="/login">
                           Sigin in
                        </Link>
                        &nbsp;&nbsp;
                        <span>Don't have an account? <Link to="/signup">Sign up</Link></span>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Reset;