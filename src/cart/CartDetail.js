import { useState } from "react";
import AddToCart from '../cart/AddToCart';
import { toast } from 'react-toastify';
import { CURRENCY_CODE } from '../constants/constant';
import './cart.css';
import './loading.css';
import '../assets/company-logo.png';
import { useCart } from '../cart/CartContext';
import Modal from "../admin/Modal";
import { DeleteConfirmation } from '../admin/deleteConfirmation';
import { DeleteCart, OrderPlace } from '../apis/cartApi';

const CartDetail = ({onClose}) =>{

    const { cartList, removeLocalItem, clearCart } = useCart();

    const totalAmount = cartList.reduce((sum, item) => {
        // Add the current item's price to the running total (sum)
        return sum + (item.price * item.quantity);
    }, 0); // Start the initial sum at 0

    const [isLoading, setIsLoading] = useState(false);
    const [isDeleteModalOpen , setIsDeleteModalOpen] = useState(false);
    const [deleteItemName, setDeleteItemName] = useState('');
    const closeDeleteModal = () =>{
         setIsDeleteModalOpen(false);
    }
    
    const removeItem = (item) => {
        const props = {
            id: item.id,
            name: item.name
        }
        setDeleteItemName(props);
        setIsDeleteModalOpen(true);
    }

    const confirmDeleteModal = async () => {
        removeLocalItem(deleteItemName);
        DeleteCart(deleteItemName.id);
        setIsDeleteModalOpen(false);
      }

      const orderPlace = async () => {
        setIsLoading(true);
          try {
              const response = await OrderPlace();
              if (response && response.success) {
                  clearCart();
                  toast.success("Order placed successfully!");
              } else {
                  toast.error("Failed to place order. Please try again.");
              }

              await new Promise(resolve => setTimeout(resolve, 2000));

          }
          catch (error) {
              toast.error("An error occurred while placing the order.");
          }
          finally {
              setIsLoading(false);
          }
      }

    return(<>
        <div className='finalcart finalcart-active'>
           {cartList && cartList.length > 0 && <h2 className='finalcart-title'>Your Cart</h2> } 
                { cartList && cartList.length > 0 &&
                    cartList.map((item) =>(
                        <div className='finalcart-content'>
                            <div className='finalcart-box'>
                                <img className='finalcart-img' src={item.img} alt={item.name}/>
                                <div className='finalcart-detail'>
                                    <h2 className='finalcart-product-title'>{item.name}</h2>
                                    <span className='finalcart-price'>{CURRENCY_CODE}{item.price}</span>
                                    <div className='finalcart-quantity'>
                                        <AddToCart product={item} isButton={false} isFinalCart={true} />
                                    </div>
                                </div>
                                <i class="ri-delete-bin-line finalcart-remove" onClick={() => removeItem(item)} ></i>
                            </div>
                        </div>
                    ))
                }
                {(!cartList || cartList === undefined || cartList.length === 0) &&
                    <h3>Your Cart is empty.</h3>

                }
            <div className='total'>
                <div className='total-title'>Total</div>
                <div className='total-price'>{CURRENCY_CODE}{totalAmount.toFixed(2)}</div>
            </div>
            <button className='btn-buy' disabled={isLoading || (!cartList || cartList === undefined || cartList.length === 0)} onClick={orderPlace}>
                 {isLoading ? (
        <div className="spinner"></div> // Conditionally render the spinner
      ) : (
        'Send Email' // Or an email icon component
      )}

            </button>
            <i class="ri-close-line" id='finalcart-close' onClick={onClose}></i>
        </div>

        <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
          {<DeleteConfirmation itemName={deleteItemName ? deleteItemName.name : ''} onConfirm={confirmDeleteModal} onCancel={closeDeleteModal} />}
        </Modal>
    </>)

}

export default CartDetail;