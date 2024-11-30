import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../Store/adminSlice';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const groupedProducts = products.reduce((groups, product) => {
    if (!groups[product.Category]) {
      groups[product.Category] = [];
    }
    groups[product.Category].push(product);
    return groups;
  }, {});

  return (
    <div>
      <nav
        style={{
          display: 'flex',
          justifyContent: 'center',
          border: '1px solid #ccc',
          boxShadow: '1px 1px 5px rgba(0, 0, 0, 0.1)',
          padding: '10px',
        }}
      >
        <NavLink to="/add-product" className="nav-link" style={{ marginRight: '20px', color: '#333', fontWeight: '500' }}>
          Add Product
        </NavLink>
        <NavLink to="/product-list" className="nav-link" style={{ marginRight: '20px', color: '#333', fontWeight: '500' }}>
          Manage Products
        </NavLink>
        <NavLink to="/order-list" className="nav-link" style={{ marginRight: '20px', color: '#333', fontWeight: '500' }}>
          Manage Orders
        </NavLink>
      </nav>
      <div style={{ padding: '20px', paddingTop: '5rem' }}>
        {Object.keys(groupedProducts).map((category) => (
          <div key={category}>
            <h2
              style={{
                color: '#333',
                fontSize: '24px',
                marginBottom: '10px',
                textAlign: 'center',
                boxShadow: '1px 1px 5px rgba(0, 0, 0, 0.1)',
                padding: '5px',
              }}
            >
              {category}
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '25px',
                marginBottom: '40px',
              }}
            >
              {groupedProducts[category].map((product) => (
                <div
                  key={product.id}
                  style={{
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    padding: '20px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    textAlign: 'center',
                    backgroundColor: '#fff',
                    position: 'relative',
                  }}
                >
                  <div style={{ position: 'relative' }}>
                    <img
                      src={product.ImageURL}
                      alt={product.Name}
                      style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'cover',
                        filter: product.Quantity === 0 ? 'blur(1px)' : 'none',
                        borderRadius: '8px',
                      }}
                    />
                    {product.Quantity === 0 && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          backgroundColor: 'rgba(0, 0, 0, 0.6)',
                          color: 'white',
                          padding: '10px 20px',
                          borderRadius: '8px',
                          fontSize: '18px',
                        }}
                      >
                        Out of Stock
                      </div>
                    )}
                  </div>
                  <h3 style={{ color: '#333', marginTop: '15px' }}>{product.Name}</h3>
                  <p style={{ color: '#777' }}>{product.Description}</p>
                  <p style={{ fontSize: '18px', fontWeight: 'bold', color: 'maroon' }}>Rs. {product.Price}</p>
                  <p
                    style={{
                      fontSize: '14px',
                      fontWeight: 'bold',
                      color: product.Quantity > 0 ? 'green' : 'red',
                    }}
                  >
                    {product.Quantity > 0 ? `Quantity: ${product.Quantity}` : 'Out of Stock'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
