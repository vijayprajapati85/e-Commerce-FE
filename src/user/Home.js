import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getProductByCatSubCat } from "../apis/productApi";
import ProductDetailModal from "../Product/ProductDetailModal";
import AddToCart from '../cart/AddToCart';
import { GetUser } from './UserContext';

import './home.css';

import { CURRENCY_CODE } from '../constants/constant';
import { toast } from "react-toastify";

const Home = () => {

    const { isLogin } = GetUser();
    const [products, setProducts] = useState([]);

    const getProduct = async (postData) => {

        let token = '';
        if (isLogin()) {
            token = localStorage.getItem('token');
        }

        const response = await getProductByCatSubCat(postData, token);
        if (response.status === 401){
            toast.error("Unauthorized: User not authenticated.");
        }
        else if (response.data != null) {
            setProducts(response.data);
        } else {
            setProducts([]);
        }
    }

    const { catid, subid } = useParams();
    const location = useLocation();
    const [data, setData] = useState(null);

    useEffect(() => {
        if (location.pathname === '/') {
            setData(null); // Load all data logic
        } else if (catid) {
            const postData = {
                CatId: catid,
                SubCatId: subid !== undefined ? subid : null,
            };
            setData(postData);
        }
    }, [catid, subid, location.pathname]);

    useEffect(() => {
        if (data) {
            getProduct(data);
        }
        else
        {
            setProducts([]);
        }
    }, [data]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const handleGetDetail = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    return(
        <>
            <div className="grid-container">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <div className="product-header">
                            <p className="product-category">{product.name}</p>
                        </div>
                        <img src={product.imageName} alt={product.name} className="product-image" />
                        {isLogin() && <div className="product-footer">
                            <span className="product-price">{CURRENCY_CODE}{product.price}</span>
                            <AddToCart product={product} isButton={false} isFinalCart={false} />
                        </div>}
                        {
                            !isLogin() && <div className="product-footer">
                             Login to see price
                        </div>
                        }
                      <button className="manage-button" onClick={() => handleGetDetail(product)}>Detail</button>
                    </div>
                ))}
                {(!products || products.length === 0) && (<h1>Product will come soon, Thanks.</h1>)}
                
                <ProductDetailModal
                    isOpen={isModalOpen}
                    product={selectedProduct}
                    onClose={handleCloseModal}
                />
            </div>   
        </>
    );
}

export default Home;