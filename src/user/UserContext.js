import { createContext, useContext } from "react";

const UserContext = createContext();

export const GetUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {

    const isLogin = () => {
        let tokendata = localStorage.getItem('token');
        if (!tokendata) {
            return false; 
        }
        return true;
    };

    const getProfile = () =>{
        let profileData = localStorage.getItem('profile');
        if(!profileData)
        {
          return '';  
        }
        return JSON.parse(profileData);
    }

    return (
        <UserContext.Provider value={{isLogin, getProfile}}>
            {children}
        </UserContext.Provider>
    );
}