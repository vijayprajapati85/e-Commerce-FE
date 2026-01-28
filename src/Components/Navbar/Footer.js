import './footer.css';
import { Link } from 'react-router-dom';


const Footer = () => {
    return (
        <>
        <div className="footer-section">
            <div>
                <img src="/bg.jpeg" alt="Company Logo" width="150" height="50" />
            </div>
            <div>
                Company Address
            </div>
            <div>
                Information
                <p><Link to="/">Home</Link></p>
                <p><Link to="/">Catlog</Link></p>
                <p><Link to="/contact">Contact</Link></p>
            </div>
            <div>
                Contact
                <p><Link to="/">Home</Link></p>
                <p><Link to="/">Catlog</Link></p>
                <p><Link to="/contact">Contact</Link></p>
            </div>
            <div>
                Services
                <p><Link to="/">Home</Link></p>
                <p><Link to="/">Catlog</Link></p>
                <p><Link to="/contact">Contact</Link></p>
            </div>
              <div className='social-media'>
                Social Media &nbsp;
                <i class="ri-facebook-circle-fill ri-lg"></i>
                <i class="ri-pinterest-fill ri-lg"></i>
                <i class="ri-instagram-fill ri-lg"></i>
                <i class="ri-twitter-x-fill ri-lg"></i>
            </div>
        </div>
         <p>&copy; {new Date().getFullYear()} eCommerce Shop. All rights reserved.</p>
       </>
    );
}

export default Footer;