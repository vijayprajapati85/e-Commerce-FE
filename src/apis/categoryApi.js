
import { BASEURL_CATEGORY } from '../constants/constant';

export const submitCategory = async (payload) => {

    const request = {
        method :'POST',
        headers : { 'Content-Type': 'application/json', 'userid' : 'vijayp'},
        body : JSON.stringify(payload)
    }

   const response  = await fetch(BASEURL_CATEGORY + 'InsertUpdate', request)
    .then(response => response.json());
    
    return response;
};

export const getCategoryAll = async () =>{
    try {
        const response = fetch(BASEURL_CATEGORY + 'GetAll')
            .then(response => response.json());

        return response;
    } catch (error) {
        console.error("Error fetching categories:", error);
        return null;
    }
}

export const deleteCategory = async (catid) =>{
    const request = {
        method :'DELETE',
        headers : { 'Content-Type': 'application/json', 'userid' : 'vijayp'}
    }

    const response = fetch(`${BASEURL_CATEGORY}Delete?id=${catid}`,request)
    .then(response => response.json());

    return response;
}