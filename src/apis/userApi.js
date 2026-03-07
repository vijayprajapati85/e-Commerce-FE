import { BASEURL_USER } from '../constants/constant';

export const createUser = async (payload) => {

    const request = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    }

    const response = await fetch(`${BASEURL_USER}CreateUser`, request)
        .then(response => response.json());

    return response;
};

export const signIn = async (payload) =>
{
    const request = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    }

    const response = await fetch(`${BASEURL_USER}SignIn`, request)
        .then(response => response.json());

    return response;
}

export const resetPwd = async (payload) =>{
 
        const request = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    }

    const response = await fetch(`${BASEURL_USER}ForgotPassword`, request)
        .then(response => response.json());

    return response;
}

export const signInAdmin = async (payload) =>
{
    const request = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    }

    const response = await fetch(`${BASEURL_USER}Sign`, request)
        .then(response => response.json());

    return response;
}

export const userprofile = async (payload) =>
{
   try {
   
            let token = localStorage.getItem("token");
   
           const request = {
               method: 'POST',
               headers: { 'Content-Type': 'application/json', 'Authorization' : `Bearer ${token}` },
               body: JSON.stringify(payload)
           }
   
           const response = await fetch(`${BASEURL_USER}Profile`, request)
               .then(response => response.json());
   
           return response;
       }
       catch (error) {
           console.error("Error update profile:", error);
           return null;
       }
}