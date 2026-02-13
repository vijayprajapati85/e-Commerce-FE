import './footer.css';
import { Link } from 'react-router-dom';


const Footer = () => {
    return (
        <>
        <div className="footer-section">
                <img src="/bg.png" alt="Company Logo" />
                <h4>Company Address</h4>    
            <div>
                <h4>Information</h4>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/aboutus">About Us</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/corporateprofile">Corporate Profile</Link></li>
                </ul>
            </div>
            <div>
                <h4>Contact</h4>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/aboutus">About Us</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/corporateprofile">Corporate Profile</Link></li>
                </ul>
            </div>
            <div>
                <h4>Help</h4>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/aboutus">About Us</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/corporateprofile">Corporate Profile</Link></li>
                </ul>
            </div>
            <div>
                <h4>Services</h4>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/aboutus">About Us</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/corporateprofile">Corporate Profile</Link></li>
                </ul>
            </div>
              <div className='social-media'>
               <h4>Social Media</h4> &nbsp;
                <i class="ri-facebook-circle-fill ri-lg"></i>
                <i class="ri-pinterest-fill ri-lg"></i>
                <i class="ri-instagram-fill ri-lg"></i>
                <i class="ri-twitter-x-fill ri-lg"></i>
            </div>
        </div>
         <p>&copy; {new Date().getFullYear()} Jiyazon Shop. All rights reserved.</p>
       </>
    );
}

export default Footer;