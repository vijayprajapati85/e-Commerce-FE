import { BASEURL_CART } from '../constants/constant';

export const AddCarts = async (payload) => {

    try {

         let token = localStorage.getItem("token");

        const request = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'userid': 'vijayp', 'Authorization' : `Bearer ${token}` },
            body: JSON.stringify(payload)
        }

        const response = await fetch(`${BASEURL_CART}InsertUpdate`, request)
            .then(response => response.json());

        return response;
    }
    catch (error) {
        console.error("Error adding to cart:", error);
        return null;
    }
};

export const DeleteCart = async (productid) =>{
        try {

         let token = localStorage.getItem("token");

        const request = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'userid': 'vijayp', 'Authorization' : `Bearer ${token}` },
        }

        const response = await fetch(`${BASEURL_CART}Delete?productId=${productid}`, request)
            .then(response => response.json());

        return response;
    }
    catch (error) {
        console.error("Error adding to cart:", error);
        return null;
    }
}

export const OrderPlace =  async () => {

     try {

         let token = localStorage.getItem("token");

        const request = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization' : `Bearer ${token}` },
        }

         const response = await fetch(`${BASEURL_CART}Order`, request)
            .then(response => response.json());

        return response;
    }
    catch (error) {
        console.error("Error Order Place:", error);
        return null;
    }
}