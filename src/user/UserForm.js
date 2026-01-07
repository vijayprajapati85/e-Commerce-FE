import { useLocation } from "react-router-dom";

import './userform.css'
import Login from "./Login"
import Signup from "./Signup"
import Reset from "./reset";

const UserForm = () => {

     const location = useLocation();
     const isLogin = location.pathname.toLowerCase().includes('login');
     const isSignup = location.pathname.toLowerCase().includes('signup');
     const isReset = location.pathname.toLowerCase().includes('reset');

    return(
        <>
            <div class="main-content">
                <div class="landing-text-area">
                    <h2>Landing Page Template background</h2>
                    <h3>Some another contet plage here.....</h3>
                </div>
                {isLogin && <Login />}
                {isSignup && <Signup />}
                {isReset && <Reset />}
            </div>
        </>
    )
}

export default UserForm