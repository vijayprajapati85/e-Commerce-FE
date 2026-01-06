import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { createUser } from '../apis/userApi';
import './signup.css';

const Signup = () => {
    const [fullName, setFullName] = useState('');
    const [emailId, setEmailId] = useState('');
    const navigate = useNavigate();
    
    const onSignInClick = () =>{
        navigate('/login');
    }
    
    const handleNameChange = (e) =>{
        setFullName(e.target.value);
    }

    const handleEmailChange = (e) =>{
        setEmailId(e.target.value);
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();

        const postData = {
            fullName: fullName,
            emailId: emailId,
        }

        const response = await createUser(postData);
        if (response.statusCode === 200) {
            toast.success(response.title, {
                style: {
                    width: '350px',
                },
            });
        }
        else {
            toast.error(response.message);
        }
    }

    return (
        <>
            <div class="signup-container">
                <form onSubmit={handleSubmit} class="signup-form">
                    <h2>Create Your Account</h2>
                    <div class="input-group">
                        <label for="signup-fullname">Full Name</label>
                        <input type="text" id="signup-fullname" onChange={handleNameChange} required />
                    </div>
                    <div class="input-group">
                        <label for="signup-email">Email</label>
                        <input type="email" id="signup-email" onChange={handleEmailChange} required />
                    </div>
                    <p className='alert'>Note: Password will send on your email id</p>
                    <button type="submit" class="auth-button">Send Email</button>
                     <div class="form-footer">
                        <a href="#">Forgot password?</a>
                        <span>Have an account? <a onClick={onSignInClick}>Sign in</a></span>
                    </div>
                </form>
            </div>
        </>
    )
}
export default Signup