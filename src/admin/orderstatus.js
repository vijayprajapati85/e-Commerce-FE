import { useState } from "react";
import { GetOrderStatus } from "../apis/cartApi";
import { OrderDetailExpanded } from "../cart/OrderDetailExpanded";
import DataTable from 'react-data-table-component';

import '../cart/orderdetail.css';

const OrderStatus = () => {

    const [orderInProgress, setOrderInProgress] = useState([]);
    const [orderCompleted, setOrderCompleted] = useState([]);

    const getOrderStatus = async () => {
        try {
            const response = await GetOrderStatus();
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
        catch (error) {
            console.error("Error fetching order status:", error);
        }
    }

    useState(() => {
        getOrderStatus();
    }, []);

    // const orderStatusUpdate = (event) => {
    //     console.log("Selected Status:", event.target.value);
    //     if (selectedStatus === "Complete") {

    //     } else if (selectedStatus === "InProgress") {
    //     } else if (selectedStatus === "Pending") {
    //     }
    // }

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
    )
}

export default OrderStatus;