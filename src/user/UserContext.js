import { createContext, useContext } from "react";

const UserContext = createContext();

export const GetUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {

    const isLogin = () => {
        let tokendata = localStorage.getItem('token');
        let tokenentry = localStorage.getItem('tokenentry');
        if(!tokenentry && !tokendata)
        {
            return false;
        }
        return true;
    };

    const getProfile = () =>{
        let profileData = localStorage.getItem('profile');
        let adminProfileData = localStorage.getItem('profileentry');
        if(!profileData && !adminProfileData)
        {
          return '';  
        }
        return JSON.parse(profileData || adminProfileData);
    }

    return (
        <UserContext.Provider value={{isLogin, getProfile}}>
            {children}
        </UserContext.Provider>
    );
}