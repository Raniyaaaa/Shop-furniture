import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProductFromDatabase,updateProductInDatabase } from '../Store/adminSlice.js';
import { Button,Modal,Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.admin);
  const navigate = useNavigate();
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = (product) => {
    dispatch(deleteProductFromDatabase(product));
  };

  const handleEdit = (product) => {
    setEditProduct(product);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editProduct) {
      dispatch(updateProductInDatabase(editProduct));
      setEditProduct(null);
    }
  }

  return (
    <div style={{ marginTop: '15px', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        {/* Back button aligned to the left */}
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

        <h2 style={{ fontSize: '24px', fontWeight: '600', textAlign: 'center', flex: 1 }}>Product List</h2>
      </div>

      {loading && <p style={{ textAlign: 'center', fontSize: '18px', color: '#007bff' }}>Loading...</p>}
      {error && <p style={{ color: 'red', fontWeight: 'bold', textAlign: 'center' }}>{error}</p>}
      
      <ul style={{ listStyleType: 'none', padding: '0' }}>
        {products.map((product) => (
          <li key={product.id} style={{
            border: '1px solid #ccc',
            borderRadius: '5px',
            padding: '15px',
            marginBottom: '15px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#f9f9f9',
            boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
            transition: 'background-color 0.3s',
            position: 'relative',
          }}>

            {product.ImageURL && (
              <img
                src={product.ImageURL}
                alt={product.Name}
                style={{
                  width: '100px',
                  height: '100px',
                  objectFit: 'cover',
                  filter: product.Quantity === 0 ? 'blur(1px)' : 'none',
                  borderRadius: '8px',
                  marginRight: '20px',
                }}
              />
            )}
            
            <div style={{ flex: '1', paddingRight: '20px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '500', marginBottom: '8px' }}>{product.Name}</h3>
              <p style={{ fontSize: '16px', color: '#555', marginBottom: '8px' }}>{product.Description}</p>
              <p style={{ fontSize: '14px', color: 'maroon', marginBottom: '4px' }}>Rs. {product.Price}</p>
              <p style={{ fontSize: '14px', fontWeight: 'bold', color: product.Quantity > 0 ? 'green' : 'red' }}>
                {product.Quantity > 0 ? `Quantity: ${product.Quantity}` : 'Out of Stock'}
              </p>
            </div>
            <div>
            <Button
            variant='secondary'
                onClick={() => handleEdit(product)}
                style={{
                  border: 'none',
                  padding: '8px 16px',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  fontSize: '14px',
                  marginRight: '10px',
                }}
              >
                Update
              </Button>
              <Button 
              variant='danger'
              onClick={() => handleDelete(product)} 
              style={{
                border: 'none', 
                padding: '8px 16px', 
                cursor: 'pointer', 
                borderRadius: '4px', 
                fontSize: '14px', 
                transition: 'background-color 0.3s'
              }}
              onMouseOver={e => e.target.style.backgroundColor = '#d41f33'}
              onMouseOut={e => e.target.style.backgroundColor = '#e63946'}
            >
              Delete
            </Button>
            </div> 
          </li>
        ))}
      </ul>
      {editProduct && (
        <Modal show onHide={() => setEditProduct(null)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Product</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleFormSubmit}>
            <Modal.Body>
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={editProduct.Description}
                  onChange={(e) => setEditProduct({ ...editProduct, Description: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formQuantity" className="mt-3">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  value={editProduct.Quantity}
                  onChange={(e) => setEditProduct({ ...editProduct, Quantity: (e.target.value) })}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setEditProduct(null)}>
                Cancel
              </Button>
              <Button type="submit" variant="secondary-outline">
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      )}
    </div>
  );
};

export default ProductList;
