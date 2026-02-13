import { BASEURL_PRODUCT } from '../constants/constant';

export const submitProduct = async (payload) => {

    const data = new FormData();
    data.append("Id",payload.id);
    data.append("Name",payload.Name);
    data.append("CatId",payload.CatId);
    data.append("SubCatId",payload.SubCatId);
    data.append("Description",payload.Description);
    data.append("Price",payload.Price);
    if(payload.ImageFile)
        data.append("ImageFile", payload.ImageFile);

    let token = localStorage.getItem("tokenentry");

    const request = {
        method :'POST',
        headers : {'userid' : 'vijayp', 'Authorization' : `Bearer ${token}`},
        body : data
    }

   const response  = await fetch(`${BASEURL_PRODUCT}InsertUpdate`, request)
    .then(response => response.json());
    
    return response;
};

export const getAllProducts = async (token) => {
     const request = {
        method :'GET',
        headers: { 'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`
             }
    }
    const response = await fetch(`${BASEURL_PRODUCT}GetAll`, request)
   // .then(response => response.json());
    
    return response;
}

export const getProductByCatSubCat = async (payload,token) => {
    if(token !== ''){
        const request = {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`
             }
        }
        const response = await fetch(`${BASEURL_PRODUCT}GetProductsWithPrice`, request)

        if (response.ok) {
            return response.json();
        }
        if(response.status === 401)
        {
            localStorage.removeItem('token');
            return getProduct(payload);
        }

        return response;
    }
    else {
        return getProduct(payload);
     }
}

const getProduct = async(payload) =>{
       const request = {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'application/json' }
        }
        const response = await fetch(`${BASEURL_PRODUCT}GetProducts`, request)
        
        if (response.ok) {
            return response.json();
        }

        return response;


}