import React,{ useState } from "react";
import { submitCategory } from '../apis/categoryApi';
import { toast } from 'react-toastify';

const Category = ({onClose, formData, onUpdate}) =>{

    const { id, name } = formData ?? '';

    const [inputCat, setInputCat] = useState(name);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const postData = {
            id: id ?? 0,
            name: inputCat
        }
        const response = await submitCategory(postData);
        if (response.statusCode === 200) {
            toast.success(response.title);
            onClose();
        }
        else {
            toast.error(response.message);
        }
        setInputCat('');
        onUpdate(postData);
    };

    const handleChange = (event) => {
        setInputCat(event.target.value);
      }

    const isEditForm = id ?? false; 
    
    return (
        <form onSubmit={handleSubmit} className="contact-form">
            <h3>{isEditForm ? "Edit" : "Add"} Category</h3>
            <input type='text' value={inputCat} onChange={handleChange} required />
            {!isEditForm && <label className="info">Note: Multiple category add with comma (,) seperator.</label>}            
            <button type="submit">{isEditForm ? "Edit" : "Submit"}</button>
            <button type="button" onClick={onClose}>Close</button>
        </form>
    )
};

export default Category;