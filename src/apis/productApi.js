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

    const request = {
        method :'POST',
        headers : {'userid' : 'vijayp'},
        body : data
    }

   const response  = await fetch(BASEURL_PRODUCT + 'InsertUpdate', request)
    .then(response => response.json());
    
    return response;
};

export const getAllProducts = async () => {
     const request = {
        method :'GET',
    }
    const response = await fetch(BASEURL_PRODUCT + 'GetAll', request)
    .then(response => response.json());
    
    return response;
}

export const getProductByCatSubCat = async (payload) => {
    const request = {
       method :'POST',
       body : JSON.stringify(payload),
       headers : {'Content-Type' : 'application/json' }
    }
    const response = await fetch(BASEURL_PRODUCT + 'GetProducts', request)
    .then(response => response.json());

    return response;
}