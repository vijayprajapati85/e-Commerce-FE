import { useState } from 'react';
import { userprofile } from '../apis/userApi';
import { toast } from 'react-toastify';
import { GetUser } from '../user/UserContext'
//'../../user/UserContext';

import './profile.css'

const Profile = () => {


    const { getProfile } = GetUser();
    const profile = getProfile();

    const [username, setUserName] = useState(profile.fullName);
    const [address, setAddress] = useState(profile.address);
    const [mobileno, setMobileNo] = useState(profile.mobileNo);

    const handleusername = (e) => {
        setUserName(e.target.value);
    }

    const handleaddress = (e) => {
        setAddress(e.target.value);
    }

    const handlemobileno = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        setMobileNo(value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (mobileno.length !== 10) {
            toast.error("Mobile number must be exactly 10 digits.");
            return;
        }

        const postData = {
            fullName: username,
            address: address,
            mobileno: mobileno
        }
        const response = await userprofile(postData);
        if (response && response.success) {
            toast.success(response.title);

            const updateprofile =
            {
                emailId: profile.emailId,
                fullName: username,
                address: address,
                mobileNo: mobileno
            }
            localStorage.removeItem('profile');
            localStorage.setItem("profile", JSON.stringify(updateprofile));


        } else {
            toast.error("Failed to place order. Please try again.");
        }
    }
    return (
        <>
            <form id="profile" onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" id="username" name="username" value={username} onChange={handleusername} required></input>
                </div>
                <div>
                    <label>Address:</label>
                    <textarea rows={5} cols={5} id='address' name='address' value={address} onChange={handleaddress}></textarea>
                </div>
                <div>
                    <label>Mobile No:</label>
                    {/* <input type="text" id="mobileno" name="mobileno" onChange={handlemobileno} required></input> */}
                    <input
                        type="tel"
                        value={mobileno}
                        onChange={handlemobileno}
                        maxLength="10"
                        placeholder="Enter 10-digit number"
                    />
                </div>
                <div className="button-container">
                    <button type="submit" className="submit-btn">Save Profile</button>
                </div>
            </form>
        </>
    )
}

export default Profile;