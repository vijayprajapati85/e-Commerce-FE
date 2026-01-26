export const CURRENCY_CODE = "£";
export const BASEURL_CATEGORY = process.env.REACT_APP_BASEURL_CATEGORY
export const BASEURL_PRODUCT = process.env.REACT_APP_BASEURL_PRODUCT
export const BASEURL_SUBCATEGORY = process.env.REACT_APP_BASEURL_SUBCATEGORY
export const BASEURL_USER = process.env.REACT_APP_BASEURL_USER
export const BASEURL_CART = process.env.REACT_APP_BASEURL_CART
export const BASEURL_CONTACT = process.env.REACT_APP_BASEURL_CONTACT


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
			backgroundColor: 'transparent', // Light gray header background
			color: '#333',
			padding: '0px 9px'
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
	pagination: {
		style: {
			backgroundColor: 'rgba(255, 255, 255, 0.1);', // Your desired background color
		}
	}
};
