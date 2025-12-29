import { BASEURL_SUBCATEGORY } from '../constants/constant';

export const submitSubCategory = async (payload) => {

    const request = {
        method :'POST',
        headers : { 'Content-Type': 'application/json', 'userid' : 'vijayp'},
        body : JSON.stringify(payload)
    }

   const response  = await fetch(BASEURL_SUBCATEGORY + 'InsertUpdate', request)
    .then(response => response.json());
    
    return response;
};

export const getSubCategory = async (catid) =>{

    const response = fetch(BASEURL_SUBCATEGORY + 'GetByCatId?id=' + catid)
    .then(response => response.json());

    return response;
}

export const deleteSubCategory = async (subCatid) =>{
    const request = {
        method :'DELETE',
        headers : { 'Content-Type': 'application/json', 'userid' : 'vijayp'}
    }

    const response = fetch(`${BASEURL_SUBCATEGORY}Delete?id=${subCatid}`,request)
    .then(response => response.json());

    return response;
}