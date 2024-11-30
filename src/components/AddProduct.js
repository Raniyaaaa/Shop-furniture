import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProductToDatabase } from '../Store/adminSlice'; 
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddProduct = (e) => {
    e.preventDefault();

    if (!category) {
      setError('Please select a valid category.');
      return;
    }

    setError(null);

    const productData = { 
      Name: name, 
      Description: description, 
      Price: parseFloat(price),
      Quantity: parseInt(quantity, 10),
      Category: category, 
      ImageURL: imageURL 
    };

    dispatch(addProductToDatabase(productData));
    setName('');
    setDescription('');
    setPrice('');
    setQuantity('');
    setCategory('');
    setImageURL('');
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
          }}
        >
          Back
        </Button>
        <h2 style={{ fontSize: '24px', fontWeight: '600', textAlign: 'center', flex: 1 }}>Add Product</h2>
      </div>
      
      <form 
        onSubmit={handleAddProduct} 
        style={{
          display: 'flex', 
          flexDirection: 'column', 
          gap: '15px', 
          maxWidth: '600px', 
          margin: '0 auto', 
          padding: '2rem', 
          backgroundColor: '#f9f9f9', 
          borderRadius: '8px', 
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          marginBottom: '40px'
        }}
      >
        {error && <p style={{ color: 'red', fontWeight: 'bold', textAlign: 'center' }}>{error}</p>}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            width: '100%',
          }}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={{
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            width: '100%',
            height: '100px',
          }}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          style={{
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            width: '100%',
          }}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value, 10)}
          required
          style={{
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            width: '100%',
          }}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          style={{
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            width: '100%',
          }}
        >
          <option value="" disabled>Select Category</option>
          <option value="Bedroom">Bedroom</option>
          <option value="Dining Room">Dining Room</option>
          <option value="Living Room">Living Room</option>
          <option value="Work From Home">Home Office</option>
        </select>
        <input
          type="text"
          placeholder="Image URL"
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            width: '100%',
          }}
        />
        <button 
          type="submit" 
          style={{
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            padding: '12px 20px',
            cursor: 'pointer',
            borderRadius: '5px',
            fontSize: '16px',
            transition: 'background-color 0.3s',
          }}
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
