import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { signIn } from '../apis/userApi';
import { useCart } from '../cart/CartContext';

import './login.css';

const Login = () =>{
    const { incrementCart } = useCart();

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

            if(response.data.orderData) {
                const ttl = 3 * 60 * 60 * 1000; // 3 hours in milliseconds
                const now = new Date();

                localStorage.removeItem('cartItems');
                
                response.data.orderData.forEach(element => {

                    const productToAdd = {
                        id: element.productId,
                        name: element.name,
                        price: element.price,
                        quantity: element.quantity,
                        img: element.imageName,
                        expiry: now.getTime() + ttl,
                    }
                    incrementCart(productToAdd);
                });
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
                <div className='login-header'>
                    <h2>Login to Your Account</h2>
                    <p>Welcome back! Please enter your details.</p>
                </div>
                <form onSubmit={handleSubmit}>
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