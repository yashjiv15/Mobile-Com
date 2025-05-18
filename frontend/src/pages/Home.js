import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../services/productService';
import phoneImage from '../assets/phone.jpg';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const result = await fetchProducts();
        setProducts(result);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  if (loading) return <div className="text-center py-20 text-lg font-medium text-gray-700">Loading products...</div>;
  if (error) return <div className="text-center py-20 text-red-600 text-lg">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 py-10 px-4 sm:px-8">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-10 tracking-wide">Explore Our Latest Phones</h2>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.name}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden transform hover:-translate-y-1"
          >
            <img
              src={phoneImage}
              alt={product.name}
              className="w-full h-48 object-cover rounded-t-2xl shadow-sm"
            />
            <div className="p-5 flex flex-col h-full justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                <p className="text-lg font-bold text-indigo-600 mb-2">₹{product.price}</p>
                <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${product.quantity > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {product.quantity > 0 ? `In Stock: ${product.quantity}` : 'Out of Stock'}
                </span>
              </div>
              <Link
                to={`/product/${product.name}`}
                className="mt-5 block text-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition duration-300"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
