import DataTable from 'react-data-table-component';
import {useEffect, useState} from 'react';
import Modal from "./Modal";
import SubCategory from "./subcategory";
import { DeleteConfirmation } from './deleteConfirmation';
import { deleteSubCategory } from '../apis/subCategoryApi';
import { CustomNoDataComponent } from './CustomNoDataComponent';
import { getSubCategory } from '../apis/subCategoryApi';

export const customTableStyles = {
	table: {
		style: {
			// marginTop: "5px",
      width: "50%",
		}
	},
	headCells: {
	  style: {
		fontSize: '16px',
		fontWeight: 'bold',
		backgroundColor: '#f5f5f5', // Light gray header background
		color: '#333',
		padding: '10px 10px',
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

export const ExpandedComponent = ({ data }) => {

    const [editData, setEditData] = useState(null);
    const [isModalOpen , setIsModalOpen] = useState(false);
    const [isDeleteModalOpen , setIsDeleteModalOpen] = useState(false);
    const [totalRaw, setTotalRaw] = useState(data.subCategories.length);

    const [dataItem, setData] = useState({ 
    id: data.id, 
    subCategories: data.subCategories 
  });

     useState(() =>{
        data.subCategories = data.subCategories.filter(subCat => subCat.name !== null);
    });
  const handleEditClick = (row) => {
    const props = {
      id: row.id,
      name: row.name,
      catId: row.catId,
    }
    setEditData(props);
    setIsModalOpen(true);
  }

  const handleItemClick = () => {
    debugger;
    const props = {
       id: 0,
      name: '',
      catId: data.id,
    }
    setEditData(props);

    setIsModalOpen(true);
  };

  const handleDeleteClick = (row) => {
    const props = {
      id: row.id,
      name: row.name,
      catId: row.catId,
    }
    setEditData(props);
    setIsDeleteModalOpen(true);
  }

   const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: (
            <div className="product-list" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>Actions</span>
              <i class="ri-add-box-fill" title="Add SubCategory" onClick={handleItemClick}></i>
      </div>
    ),
            cell: (row) => (
                <>
                <button className="listbutton" onClick={() => handleEditClick(row)}>Edit</button>
                <button className="listbutton" onClick={() => handleDeleteClick(row)}>Delete</button>
                </>
            ),
           width: '25%',
        },
    ];

    const closeModal = () =>{
         setIsModalOpen(false);
    }
    const closeDeleteModal = () =>{
         setIsDeleteModalOpen(false);
    }

  const confirmDeleteModal = async () => {
    const response = await deleteSubCategory(editData.id);
    debugger;
    if (response.statusCode === 200) {
      dataItem.subCategories = dataItem.subCategories.filter(subCat => subCat.id !== editData.id) || [];
      setIsDeleteModalOpen(false);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if (dataItem.subCategories.length !== totalRaw) {
        const response = await getSubCategory(data.id);
        setData(prevData => ({
            ...prevData, // Spread existing data properties
            subCategories: response.data // Overwrite subCategories immutably
          }));
      }
    };

    fetchData();

  }, [totalRaw]);


  const handleUpdateData = async (updateData) => {
    if (updateData.id === 0) {
        setTotalRaw(dataItem.subCategories.length + updateData.name.split(',').length);
    }
    else {
      const updatedSubCategories = dataItem.subCategories.map(subCat => {
        if (subCat.id === updateData.id) {
          return { ...subCat, name: updateData.name };
        }
        return subCat;
      });
      dataItem.subCategories = updatedSubCategories;
    }
  }

    return (
        <>
        <div className="subHomeDiv">
            <DataTable
                columns={columns}
                data={dataItem.subCategories}
                customStyles={customTableStyles}
                defaultSortFieldId={1}
                defaultSortField="name"
                noDataComponent={<CustomNoDataComponent handleItemClick={handleItemClick} />}
            />
        </div>

        <Modal isOpen={isModalOpen} onClose={closeModal}>
            {<SubCategory onClose={closeModal} formData={editData} onUpdate={handleUpdateData} />}
        </Modal>

        <Modal isOpen={isDeleteModalOpen} onClose={closeModal}>
            {<DeleteConfirmation itemName={editData ? editData.name : ''} onConfirm={confirmDeleteModal} onCancel={closeDeleteModal} />}
        </Modal>
        </>
    );
};