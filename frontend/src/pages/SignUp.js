import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUpUser  } from '../services/authService';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signUpUser (email, password, role);
      navigate('/login');  // Redirect to login after successful signup
    } catch (err) {
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600">
      <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-lg transform transition-all duration-500 ease-in-out hover:scale-105">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Create an Account</h2>
        <form onSubmit={handleSignUp} className="space-y-6">
          <div className="flex flex-col">
            <label className="text-lg text-gray-600 font-semibold mb-2">Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg text-gray-600 font-semibold mb-2">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg text-gray-600 font-semibold mb-2">Role</label>
            <select
              onChange={(e) => setRole(e.target.value)}
              value={role}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <a href="/login" className="text-blue-500 hover:text-blue-700">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
