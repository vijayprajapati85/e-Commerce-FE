import { CURRENCY_CODE } from '../constants/constant';
import DataTable from 'react-data-table-component';

const calculateTotal = (data) => {
  return data.orders.reduce((sum, row) => {
    const price = parseFloat(row.price, 10); 
    const quantity = parseFloat(row.quantity, 10);
    return sum + (price * quantity);
  }, 0);
};

export const OrderDetailExpanded = ({data}) => {

    const finalTotal = calculateTotal(data);
    const formattedTotal = `${CURRENCY_CODE}${finalTotal.toFixed(2)}`;

        const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: false,
            width: '50%',
        },
        {
            name: 'Price',
            selector: row => `${CURRENCY_CODE}${row.price}`,
            sortable: false,
            cellClassName: 'left-align-cell',
        },
        {
            name: 'Quantity',
            selector: row => row.quantity,
            sortable: false,
            cellClassName: 'left-align-cell',
        },
        {
            name: 'Total',
            selector: row => `${CURRENCY_CODE}${row.quantity * row.price}`,
            sortable: false,
            cellClassName: 'left-align-cell',
        },
    ];

    const RenderTable = ({item}) => (
        <DataTable
                columns={columns}
                data={item}
            />

    );
    
    return (
        <div className="table-wrapper">
            <RenderTable item={data.orders} />
            {/* Custom Footer Row */}
            <div className="table-footer-total-row">
                <div className="total-label">Final Total:</div>
                <div className="total-value">{formattedTotal}</div>
            </div>
        </div>
    );
}