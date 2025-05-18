import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../services/productService';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await createProduct({
        name,
        description,
        price: parseFloat(price),
        quantity: parseInt(quantity),
      });
      navigate('/');
    } catch (err) {
      setError('Failed to create product. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 px-4 py-10">
      <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-lg transform transition-all duration-500 ease-in-out hover:scale-105">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Add New Product
        </h2>
        {error && (
          <div className="text-red-600 text-center mb-4 font-medium">{error}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label className="text-lg text-gray-600 font-semibold mb-2">Product Name</label>
            <input
              type="text"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg text-gray-600 font-semibold mb-2">Description</label>
            <textarea
              placeholder="Enter product description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg text-gray-600 font-semibold mb-2">Price</label>
            <input
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg text-gray-600 font-semibold mb-2">Quantity</label>
            <input
              type="number"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition duration-300 transform hover:scale-105"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
