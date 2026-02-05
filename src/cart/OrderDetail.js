import { useState, useEffect } from "react";
import { TrackOrder } from '../apis/cartApi';
import { OrderDetailExpanded } from "../cart/OrderDetailExpanded";
import DataTable from 'react-data-table-component';

import '../cart/orderdetail.css';

const OrderDetail = () => {

    const [orderInProgress, setOrderInProgress] = useState([]);
    const [orderCompleted, setOrderCompleted] = useState([]);


    const trackOrder = async () => {
        try {
            const response = await TrackOrder();
            if (response && response.success) {

                const inProgress = response.data.inProgress.map(item => ({
                                        ...item,
                                        orderDate: new Date(item.orderDate), 
                                        }));
                 
                setOrderInProgress(inProgress);

                const completed = response.data.completed.map(item => ({
                                        ...item,
                                        orderDate: new Date(item.orderDate), 
                                        }));
                 
                setOrderCompleted(completed);
            }
        }
        catch {
        }
    }

    useEffect(() => {
        trackOrder();
    }, []);


    const columns = [
        {
            name: 'Order Id',
            selector: row => row.orderId,
            sortable: true,
        },
        {
            name: 'Order Date',
            selector: row => row.orderDate.toLocaleDateString(),
            sortable: true,
        },
    ];

    const RenderTable = ({item}) => (
        <DataTable
                columns={columns}
                data={item}
                defaultSortField="orderId"
                expandableRows 
                expandableRowsComponent={OrderDetailExpanded}
            />

    );

     return (
        <>
             <div className="main-container">
                 <div className="content-block">
                     <h4>Order Details -  In Progress</h4>
                     <RenderTable item={orderInProgress} />
                 </div>
                 <div className="content-block">
                     <h4>Order Details -  Completed</h4>
                     <RenderTable item={orderCompleted} />
                 </div>
             </div>
         </>
    );
}

export default OrderDetail;