import { useLocation } from "react-router-dom";

import './userform.css'
import Login from "./Login"
import Signup from "./Signup"

const UserForm = () => {

     const location = useLocation();
     const isLogin = location.pathname.toLowerCase().includes('login');

    return(
        <>
            <div class="main-content">
                <div class="landing-text-area">
                    <h2>Landing Page Template background</h2>
                    <h3>Some another contet plage here.....</h3>
                </div>
                {isLogin && <Login />}
                {!isLogin && <Signup />}
            </div>
        </>
    )
}

export default UserForm