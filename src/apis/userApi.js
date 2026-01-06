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