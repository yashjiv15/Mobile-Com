// frontend/pages/AddProduct.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Change here
import { createProduct } from '../services/productService';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Change here

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await createProduct({ name, description, price: parseFloat(price), quantity: parseInt(quantity) });
      navigate('/'); // Change here to use navigate
    } catch (err) {
      setError('Failed to create product. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 py-10 px-4 sm:px-8">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-10">Add New Product</h2>
      {error && <div className="text-red-600 text-lg text-center mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition duration-300">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
