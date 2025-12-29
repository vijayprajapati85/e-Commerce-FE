import './ProductDetailModal.css';
import { CURRENCY_CODE } from '../constants/constant';
import AddToCart from '../cart/AddToCart';

const ProductDetailModal = ({ isOpen, product, onClose }) => {

  if (!isOpen || !product) {
    return null;
  }

  return (
    <div id="product-detail" className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        <div className="modal-header">
          <h2 className="product-title">{product.name}</h2>
          <button className="close-button" onClick={onClose}>
            &times; {/* HTML entity for a multiplication sign (X) */}
          </button>
        </div>

        <div className="modal-body">
          <img src={product.imageName} alt={product.name} className="modal-image" />
          <div className="modal-details">
            <p className="modal-category">Category: {product.catName}</p>
            <p className="modal-description" dangerouslySetInnerHTML={{ __html: product.description }}></p>
            <p className="modal-price">Price: <strong>{CURRENCY_CODE}{product.price}</strong></p>
            
           {/* //prodcut cart  */}
            <AddToCart product={product} isButton={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
