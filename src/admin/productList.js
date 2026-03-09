import { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import {getAllProducts} from '../apis/productApi';
import { useNavigate } from 'react-router-dom';
import { CURRENCY_CODE, customTableStyles } from '../constants/constant';

	const formatAmount = (value) => {
		if (value != null) {
			return `${CURRENCY_CODE}${value.toFixed(2)}`;
		}
		return `${CURRENCY_CODE}-`;
	};


  
  const ProductList = ({ onDataSend, updateData }) => {

	const navigate = useNavigate();
    
	const columns = [
		{
			name: 'Name',
			selector: (row) => (
				<Tippy content={<span>{row.name}</span>}>
					<div style={{ cursor: 'pointer' }}>{row.name}</div>
				</Tippy>
			),
			sortable: true,
			width: '10%',
		},
		{
			name: 'Category',
			selector: row => row.catName,
			sortable: true,
			width: '10%',
		},
		{
			name: 'SubCategory',
			selector: row => row.subCatName,
			sortable: true,
			width: '11%',
		},
		{
			name: `Price (${CURRENCY_CODE})`,
			selector: row => formatAmount(row.price),
			sortable: true,
			width: '8%',
			right: true,
		},
		{
			name: "Image",
			selector: row => row.imageName ? <img src={row.imageName} alt={row.name} width="50" height="50" /> : 'No Image',
			width: '8%',
			center: true,
		},
		{
			name: 'Description',
			selector: (row) => ( <div dangerouslySetInnerHTML={{ __html: row.description }} />
			),
			sortable: true,
		},
		
		{
			name: 'Actions',
			cell: (row) => (
				<button className="listbutton" onClick={() => handleEditClick(row)}>Edit</button>
			),
			width: '8%',
		},
	];

	const [datalist, setDataList] = useState([]);
	const [filter, setFilter] = useState([]);

	const getProducts = async()=>{

		let token = localStorage.getItem("tokenentry");

        const response = await getAllProducts(token);

		if (response.ok) {
			const responseData = await response.json();

			if (responseData.data != null) {
				setDataList(responseData.data);
				setFilter(responseData.data);
			}
		}
		if (response.status === 401) {
			navigate('/admin/login');
		}

    }

    useEffect(() => {
        getProducts();
    }, [updateData])

	  const handleChange = (e) => {
		  let query = e.target.value;
		  const newrecords = datalist.filter(item => item.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
		  setFilter(newrecords);
	  }

	const handleEditClick = (row) => {
		const props = {
			id: row.id,
			name: row.name,
			desc: row.description,
			pric: row.price,
			frmCatId: row.catId,
			frmsubcatid: row.subCatId
		}
		onDataSend(props);
	  }

	return (
		<div className="homeDiv">
			<div className="search">
				<div className="product-list">
					<h3>Product List</h3>
					<i className="ri-add-box-fill" title="Add Product" onClick={()=> onDataSend(null)}></i>
				</div>
				<input type="text" placeholder="Search By Name" onChange={handleChange} />
			</div>
		
		<DataTable
			columns={columns}
			data={filter}
			customStyles={customTableStyles}
            defaultSortFieldId={1}
			defaultSortField="name"
			pagination
		/>
		</div>
	);
}

export default ProductList;