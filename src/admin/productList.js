import { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import {getAllProducts} from '../apis/productApi';
import { CURRENCY_CODE } from '../constants/constant';

	const formatAmount = (value) => {
		if (value != null) {
			return `${CURRENCY_CODE}${value.toFixed(2)}`;
		}
		return `${CURRENCY_CODE}-`;
	};

	export const customTableStyles = {
		table: {
			style: {
				marginTop: "5px",
			}
		},
		headCells: {
			style: {
				fontSize: '16px',
				fontWeight: 'bold',
				backgroundColor: '#f5f5f5', // Light gray header background
				color: '#333',
				padding: '0px 9px',
			},
		},
		cells: {
			style: {
				fontSize: '14px',
				paddingLeft: '10px',
				paddingRight: '10px',
				height: 'auto',
			},
		},
		rows: {
			style: {
				'&:nth-of-type(odd)': {
					backgroundColor: '#fafafa', // Light alternate row color
				},
				'&:nth-of-type(even)': {
					backgroundColor: '#fafafa', // Light alternate row color
				},
				'&:hover': {
					backgroundColor: '#e0e0e0', // Hover effect
					cursor: 'pointer',
				},
			},
		},
		// You can customize many other parts like the footer, pagination, etc.
	};
  
  const ProductList = ({ onDataSend, updateData }) => {

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
        const response = await getAllProducts();
        if (response.data != null) {
            setDataList(response.data);
			setFilter(response.data);
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
					<i class="ri-add-box-fill" title="Add Product" onClick={()=> onDataSend(null)}></i>
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