import { useState } from "react"
import Modal from "./Modal";
import ProductForm from "./productform";
import Category from "./category";
import SubCategory from "./subcategory";
import ProductList from './productList';

import '../admin/product.css';
import CategoryList from "./categoryList";

const ProductActions = () =>{
    const [isModalOpen , setIsModalOpen] = useState(false);
    const [modelType, setModelType] = useState('');

    const [dataFromProduct, setDataFromProduct] = useState(null);
    const [dataUpdate, setdataUpdate] = useState(null);
    const handleProductData = (data) => {
        setDataFromProduct(data);
        handleItemClick('product');
    }

    const handleUpdateData =(updateData) => {
        setdataUpdate(updateData);
    }
    
    const [dataFromCat, setDataFromCat] = useState(null);
    const handleCategoryData = (data) => {
        setDataFromCat(data);
        handleItemClick('category');
    }
    const closeModal = () =>{
         setIsModalOpen(false);
         setModelType('');
    }


    const RenderForm = () =>{
        switch(modelType){
            case 'product':
                return <ProductForm onClose={closeModal} formData={dataFromProduct} onUpdate={handleUpdateData} />
            case 'category':
                return <Category onClose={closeModal} formData={dataFromCat} onUpdate={handleUpdateData} />
            case 'subcategory':
                return <SubCategory onClose={closeModal} onUpdate={handleUpdateData} />
            default:
                return <ProductForm onClose={closeModal} />
        }
    }

    const handleItemClick = (componentName) => {
        setIsModalOpen(true);
        setModelType(componentName);
      };


    return(
        <>
      {/* <button onClick={ () => {handleItemClick('category'); setDataFromCat(null)}}>Add Category</button>
      <button onClick={ () => handleItemClick('subcategory')}>Add SubCategory</button>
      <button onClick={ () =>{ handleItemClick('product'); setDataFromProduct(null)}}>Add Product</button> */}
    
        <Modal isOpen={isModalOpen} onClose={closeModal}>
            {RenderForm()}
        </Modal>
        
            <details>
                <summary>Products</summary>
                <div class="content">
                   <ProductList onDataSend={handleProductData} updateData={dataUpdate} />
                </div>
            </details>
             <details>
                <summary>Categories / SubCategory</summary>
                <div class="content">
                   <CategoryList onDataSend={handleCategoryData} updateData={dataUpdate} />
                </div>
            </details>

        </>
    )
}


export default ProductActions