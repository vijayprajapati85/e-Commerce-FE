import { BASEURL_CONTACT } from '../constants/constant';
export const AddContact = async (payload) => {
    try {

        const request = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        }

        const response = await fetch(`${BASEURL_CONTACT}Submit`, request)
            .then(response => response.json());

        return response;
    }
    catch (error) {
        console.error("Error adding to contact information:", error);
        return null;
    }

}