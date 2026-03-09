import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { AddContact } from '../apis/conactApi';
import './login.css';

const Contact = () => {

    const[emailId, setEmailId] = useState('');
    const[name, setName] = useState('');
    const[message, setMessage] = useState('');

     const navigate = useNavigate();
  
     const handleNameChange = (e) =>{
        setName(e.target.value);
    }

    const handleEmailChange = (e) =>{
        setEmailId(e.target.value);
    }

    const handleMessageChange = (e) =>{
        setMessage(e.target.value);
    }
    
    const handleSubmit = async (e) =>{
         e.preventDefault();

        const postData = {
            name: name,
            email: emailId,
            message: message
        }

        const response = await AddContact(postData);
           if (response.statusCode === 200) {
            toast.success(response.title, {
                style: {
                    width: '400px',
                },
            });
            navigate('/');
        }
        else {
            toast.error(response.title);
        }
    }

  return (
    <div>
         <div className="login-container">
             <div className='login-header'>
                   <h2>We would love to hear from you.</h2>
                    <p>If you’ve got great products your making or looking to work with us then drop us a line.</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label for="contact-fullname">Name</label>
                        <input type="text" id="contact-fullname" onChange={handleNameChange} required />
                    </div>
                    <div className="input-group">
                        <label for="contact-email">Email</label>
                        <input type="email" id="contact-email" onChange={handleEmailChange} required />
                    </div>
                     <div className="input-group">
                        <label for="contact-message">Message</label>
                        <textarea id="contact-message" rows="4" cols="52" onChange={handleMessageChange}></textarea>
                    </div>
                    <button type="submit" className="login-button">Submit</button>
                </form>
            </div>
    </div>
  );
}

export default Contact;