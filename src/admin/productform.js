import { useEffect, useState, useRef } from "react";
import Select from 'react-select'
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css'; 

import { getCategoryAll } from '../apis/categoryApi';
import { getSubCategory } from '../apis/subCategoryApi';
import { submitProduct } from '../apis/productApi';

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
const ProductForm = ({onClose, formData, onUpdate}) => {

    const { id, name, desc, pric, frmCatId, frmsubcatid } = formData ?? '';

    const [catoptions, setCatOptions] = useState([])
    const [selectedCatOption, setSelectedCatOption] = useState(null);

    const [subcatoptions, setSubcatOptions] = useState([])
    const [selectedSubcatOption, setSelectedSubcatOption] = useState(null);

    const [description, setDescription] = useState(desc);
    const [product, setProduct] = useState(name);
    const [price, setPrice] = useState(pric);

    const [imageFile, setImageFile] = useState(null);
    const fileInputRef = useRef(null);

    const isEditForm = id ?? false; 

    const getCategory = async () => {
        try {
            const response = await getCategoryAll();

            if (response.data != null) {
                const formattedOptions = response.data.map(category => ({
                    value: category.id,
                    label: `${category.name}`,
                }));
                setCatOptions(formattedOptions);

                if (frmCatId != null) {
                    
                    const index = formattedOptions.findIndex(option => option.value === frmCatId);
                    setSelectedCatOption(formattedOptions[index]);
                }
            }
        }
        catch (err) {
            toast.error(err);
        }
    }

    useEffect(()=>{
        getCategory();
    },[])
   
    useEffect(()=>{
        if (selectedCatOption != null) {
            getSubCat(selectedCatOption.value);
        }
    },[selectedCatOption])

    const getSubCat = async (catid) => {
        try {
            const response = await getSubCategory(catid);

            if (response.data != null) {
                const formattedOptions = response.data.map(subcategory => ({
                    value: subcategory.id,
                    label: `${subcategory.name}`,
                }));
                setSubcatOptions(formattedOptions);
                if (frmCatId != null) {
                    
                    const index = formattedOptions.findIndex(option => option.value === frmsubcatid);
                    setSelectedSubcatOption(formattedOptions[index])
                }
                
            }
        }
        catch (err) {
            toast.error(err);
        }
    }

    const handleCatOptionChange = (option) => {
        setSelectedCatOption(option);
    }

    const handleSubCatOptionChange = (option) => {
        setSelectedSubcatOption(option);
    }

    const handleDescChange = (content) => {
        setDescription(content);
    }

    const handleProdChange = (event) => {
        setProduct(event.target.value);
    }

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          setImageFile(file); // Store the file object for later upload
        }
      };

      const handleSubmit = async (e) =>{
        e.preventDefault();
        
        const postData = {
            id: id ?? 0,
            CatId: selectedCatOption.value,
            SubCatId: selectedSubcatOption.value,
            Name: product,
            Description: description,
            Price: price,
            ImageFile: imageFile
        }

        const response = await submitProduct(postData);
        if (response.statusCode === 200) {
            toast.success(response.title,{
                style: {
                  width: '350px', // Inline style for a specific width
                },
              });
        }
        else {
            toast.error(response.message);
        }

        const buttonName = e.nativeEvent.submitter.name;
          if (buttonName !== 'addnew') {
            onClose();
          }
          else{
            if (fileInputRef.current) {
                fileInputRef.current.value = null; 
              }
            setImageFile(null);
            setPrice('');
            setDescription('');
            setProduct('');
          }

          //if(isEditForm){
            onUpdate(postData);
          //}
    }

    return (
        <form onSubmit={handleSubmit} className="contact-form">
            <h3>{isEditForm ? "Edit" : "Add"} Product</h3>
            <Select
                value={selectedCatOption}
                required= {true}
                onChange={handleCatOptionChange}
                options={catoptions}
                styles={customStyles}
                placeholder="Select Category"
                isSearchable={true} // This prop enables the search feature
            />
            <Select
                value={selectedSubcatOption}
                required= {true}
                onChange={handleSubCatOptionChange}
                options={subcatoptions}
                styles={customStyles}
                placeholder="Select SubCategory"
                isSearchable={true} // This prop enables the search feature
            />
            <input type='text' placeholder="Product name" value={product} onChange={handleProdChange} required />
            {/* <textarea
                value={description}
                onChange={handleDescChange}
                rows={5}
                cols={66}
                placeholder="Product description"
                required
            /> */}
            <ReactQuill
                theme="snow"
                value={description}
                onChange={handleDescChange}
                placeholder="Enter detailed description with HTML formatting..."
                required
            />
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} required={!isEditForm} />
            <input type='text' placeholder="Price" value={price} onChange={handlePriceChange} required />
            <button type="submit">{isEditForm ? "Edit" : "Submit"}</button>
            {(!isEditForm) && (
                <button type="submit" name="addnew">Submit & Add New</button>
            )}
            <button type="button" onClick={onClose}>Close</button>
        </form>
    )
}

export default ProductForm;