import { useState, useEffect } from "react";
import DataTable from 'react-data-table-component';
import { getCategoryAll, deleteCategory } from '../apis/categoryApi';
import { ExpandedComponent } from "./expandedComponent";
import Modal from "./Modal";
import { DeleteConfirmation } from './deleteConfirmation';


export const customTableStyles = {
	table: {
		style: {
			marginTop: "5px",
            backgroundColor: '#f5f5f5',
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
		paddingLeft: '0px',
		paddingRight: '10px',
	  },
	},
	rows: {
	  style: {
		'&:nth-of-type(odd)': {
		  backgroundColor: '#fafafa', // Light alternate row color
          height:'20px',
		},
		'&:nth-of-type(even)': {
		  backgroundColor: '#fafafa', // Light alternate row color
          height:'20px',
		},
		'&:hover': {
		  backgroundColor: '#e0e0e0', // Hover effect
		  cursor: 'pointer',
		},
	  },
	},
	// You can customize many other parts like the footer, pagination, etc.
  };
const CategoryList = ({onDataSend, updateData}) => {

    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: (row) => (
                <><button className="listbutton" onClick={() => handleEditClick(row)}>Edit</button>
                <button className="listbutton" onClick={() => handleDeleteClick(row)}>Delete</button></>
            ),
            width: '10%',
        },
    ];

    const [datalist, setDataList] = useState([]);
    const [filterData, setFilter] = useState([]);
    const [isDeleteModalOpen , setIsDeleteModalOpen] = useState(false);
    
    const getCateogry = async () => {
        const response = await getCategoryAll();
        if (response.data != null) {
            setDataList(response.data);
            setFilter(response.data);
        }
    }

    const handleChange = (e) => {
        let query = e.target.value;
        const newrecords = datalist.filter(item => item.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
        setFilter(newrecords);
    }

  const handleEditClick = (row) => {
    const props = {
      id: row.id,
      name: row.name
    }
    onDataSend(props);
  }

   const closeDeleteModal = () =>{
         setIsDeleteModalOpen(false);
    }
  
  const confirmDeleteModal = async () => {
    const response = await deleteCategory(deleteItemName.id);
    if (response.statusCode === 200) {
      setFilter(filterData.filter(subCat => subCat.id !== deleteItemName.id));
      setIsDeleteModalOpen(false);
    }
  }

    const [deleteItemName, setDeleteItemName] = useState('');
  const handleDeleteClick = (row) => {
    const props = {
      id: row.id,
      name: row.name,
      catId: row.catId,
    }
    setDeleteItemName(props);
    setIsDeleteModalOpen(true);
  }

    useEffect(() => {
        getCateogry();
    }, [updateData])

    return (
        <div className="homeDiv">
        <div className="search">
          <div className="product-list">
            <h3>Category List</h3>
            <i class="ri-add-box-fill" title="Add Category" onClick={()=> onDataSend(null)}></i>
          </div>
          <input type="text" placeholder="Search By Name" onChange={handleChange} />
        </div>

            <DataTable
                columns={columns}
                data={filterData}
                customStyles={customTableStyles}
                defaultSortFieldId={1}
                defaultSortField="name"
                pagination
                expandableRows 
                expandableRowsComponent={ExpandedComponent}
            />

        <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
          {<DeleteConfirmation itemName={deleteItemName ? deleteItemName.name : ''} onConfirm={confirmDeleteModal} onCancel={closeDeleteModal} />}
        </Modal>
        </div>
    );
}

export default CategoryList;