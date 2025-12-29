import React, { useEffect, useState } from "react";
import Select from 'react-select'
import { toast } from 'react-toastify';

import { getCategoryAll } from '../apis/categoryApi';
import { submitSubCategory } from '../apis/subCategoryApi';

const customStyles = {
    // Styles for the options within the dropdown menu
    option: (provided, state) => ({
      ...provided,
      textAlign: 'left', // Aligns the text to the left
    }),
  
    // Optional: Styles for the currently selected value in the control container
    valueContainer: (provided, state) => ({
      ...provided,
      justifyContent: 'flex-start', // Aligns the selected value to the left
    }),
  
    // Optional: Ensure the menu itself takes full width for alignment consistency
    menu: (provided, state) => ({
      ...provided,
      textAlign: 'left',
    }),
  };

const SubCategory = ({ onClose, formData, onUpdate }) => {

    const { id, name, catId } = formData ?? '';
    const [options, setOptions] = useState([])
    const [subCategory, setSubCategory] = useState(name);
    const [selectedOption, setSelectedOption] = useState(null);

    const isEditForm = id ?? false; 

    const getCategory = async () => {
        const response = await getCategoryAll();

        if (response.data != null) {
            const formattedOptions = response.data.map(category => ({
                value: category.id,
                label: `${category.name}`,
              }));
            setOptions(formattedOptions);

            if (catId != null) {
                    const index = formattedOptions.findIndex(option => option.value === catId);
                    setSelectedOption(formattedOptions[index]);
                }
        }
    }
    useEffect(() =>{
        getCategory();
    },[]);
    
    const handleOptionChange = (option) => {
        setSelectedOption(option);
    }
    
    const handleChange = (event) =>{
        setSubCategory(event.target.value);
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();

        const postData = {
            id: id ?? 0,
            name: subCategory,
            catId: selectedOption.value
        }
        const response = await submitSubCategory(postData);
        if (response.statusCode === 200) {
            toast.success(response.title,{
                style: {
                  width: '350px', // Inline style for a specific width
                },
              });
            onClose();
        }
        else {
            toast.error(response.message);
        }

        onUpdate(postData);
    }
    
    return (
        <form onSubmit={handleSubmit} className="contact-form">
            <h3>{isEditForm ? "Edit" : "Add"} SubCategory</h3>
            <Select
                value={selectedOption}
                required= {true}
                onChange={handleOptionChange}
                options={options}
                styles={customStyles}
                placeholder="Select Category"
                isSearchable={true} // This prop enables the search feature
                isDisabled={isEditForm || catId != null} // Disable if editing
            />
            <input type='text' value={subCategory} onChange={handleChange} required />
            {!isEditForm && <label className="info">Note: Multiple Subcategory add with comma (,) seperator.</label>}
            <button type="submit">{isEditForm ? "Update" : "Submit"}</button>
            <button type="button" onClick={onClose}>Close</button>
        </form>
    )
};

export default SubCategory;