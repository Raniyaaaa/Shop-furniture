import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, updateOrderStatus } from '../Store/adminSlice.js';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const OrderList = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.admin);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleUpdateStatus = (order, status) => {
    dispatch(updateOrderStatus(order, status));
  };

  return (
    <div style={{ marginTop: '15px', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <Button 
          variant="secondary" 
          onClick={() => navigate('/home')} 
          style={{
            backgroundColor: '#6c757d', 
            border: 'none', 
            color: 'white', 
            padding: '8px 20px', 
            cursor: 'pointer', 
            fontSize: '16px'
          }}>
          Back
        </Button>
        <h2 style={{ fontSize: '24px', fontWeight: '600', textAlign: 'center', flex: 1 }}>Order List</h2>
      </div>

      {loading && <p style={{ textAlign: 'center', fontSize: '18px', color: '#007bff' }}>Loading...</p>}
      {error && <p style={{ color: 'red', fontWeight: 'bold', textAlign: 'center' }}>{error}</p>}
      
      <ul style={{ listStyleType: 'none', padding: '0' }}>
        {console.log(orders)}
        {orders.map((order) => (
          <li key={order.id} style={{
            border: '1px solid #ccc',
            borderRadius: '5px',
            padding: '15px',
            marginBottom: '15px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#f9f9f9',
            boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
            transition: 'background-color 0.3s'
          }}>
            <div style={{ flex: '1', paddingRight: '20px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '500', marginBottom: '8px' }}>Order ID: {order.id}</h3>
              <p style={{ fontSize: '16px', color: '#555', marginBottom: '8px' }}>Customer: {order.userId}</p>
              <p style={{ fontSize: '14px', color: '#777', marginBottom: '4px' }}>Status: {order.status}</p>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <Button 
                onClick={() => handleUpdateStatus(order, 'Shipped')} 
                style={{
                  backgroundColor: '#f1faee', 
                  color: 'black', 
                  border: 'none', 
                  padding: '8px 16px', 
                  cursor: 'pointer', 
                  borderRadius: '4px', 
                  fontSize: '14px', 

                }}
              >
                Mark as Shipped
              </Button>

              <Button
                variant='success'
                onClick={() => handleUpdateStatus(order, 'Delivered')} 
                style={{
                  color: 'white', 
                  border: 'none', 
                  padding: '8px 16px', 
                  cursor: 'pointer', 
                  borderRadius: '4px', 
                  fontSize: '14px', 
                  transition: 'background-color 0.3s'
                }}
              >
                Mark as Delivered
              </Button>

              <Button 
                variant='danger'
                onClick={() => handleUpdateStatus(order, 'Cancelled')} 
                style={{
                  color: 'white', 
                  border: 'none', 
                  padding: '8px 16px', 
                  cursor: 'pointer', 
                  borderRadius: '4px', 
                  fontSize: '14px', 
                }}
              >
                Mark as Cancelled
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
