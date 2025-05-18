import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Home from './pages/Home';
import AddProduct from './pages/AddProduct';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/AddProduct" element={<AddProduct />} />
      </Routes>
    </div>
  );
}

export default App;
