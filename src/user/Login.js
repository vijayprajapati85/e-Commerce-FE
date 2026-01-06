import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () =>{
    const navigate = useNavigate();
    const onSignUpClick = () =>{
        navigate('/signup');
    }

    return(
        <>
            <div class="login-container">
                <form class="login-form">
                    <h2>Login to Your Account</h2>
                    <p>Welcome back! Please enter your details.</p>
                    <div class="input-group">
                        <label for="username">Email</label>
                        <input type="text" id="username" name="username" required />
                    </div>
                    <div class="input-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" required/>
                    </div>
                    <button type="submit" class="login-button">Log In</button>
                    <div class="form-footer">
                        <a href="#">Forgot password?</a>
                        <span>Don't have an account? <a onClick={onSignUpClick}>Sign up</a></span>
                    </div>
                </form>
            </div>
        </>

    )

}


export default Login;