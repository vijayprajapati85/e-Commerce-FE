import { BASEURL_SUBCATEGORY } from '../constants/constant';

export const submitSubCategory = async (payload) => {

    let token = localStorage.getItem("tokenentry");
    const request = {
        method :'POST',
        headers : { 'Content-Type': 'application/json', 'userid' : 'vijayp', 'Authorization' : `Bearer ${token}`},
        body : JSON.stringify(payload)
    }

   const response  = await fetch(`${BASEURL_SUBCATEGORY}InsertUpdate`, request)
    .then(response => response.json());
    
    return response;
};

export const getSubCategory = async (catid) =>{

    let token = localStorage.getItem("tokenentry");
    const request = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }

    const response = fetch(`${BASEURL_SUBCATEGORY}GetByCatId?id=${catid}`, request)
    .then(response => response.json());

    return response;
}

export const deleteSubCategory = async (subCatid) =>{
    let token = localStorage.getItem("tokenentry");
    const request = {
        method :'DELETE',
        headers : { 'Content-Type': 'application/json', 'userid' : 'vijayp', 'Authorization' : `Bearer ${token}`}
    }

    const response = fetch(`${BASEURL_SUBCATEGORY}Delete?id=${subCatid}`,request)
    //.then(response => response.json());

    if(response.ok){
        return response.json();
    }

    return response;
}