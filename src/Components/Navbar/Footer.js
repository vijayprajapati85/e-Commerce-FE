import './footer.css';
import { Link } from 'react-router-dom';


const Footer = () => {
    return (
        <>
        <div className="footer-section">
            <div>
                <img src="/bg.jpeg" alt="Company Logo" width="150" height="50" />
            </div>
            <h4>Company Address</h4>    
            <div>
                <h4>Information</h4>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/">Catlog</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </div>
            <div>
                <h4>Contact</h4>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/">Catlog</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </div>
            <div>
                <h4>Help</h4>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/">Catlog</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </div>
            <div>
                <h4>Services</h4>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/">Catlog</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
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