import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Home from './pages/Home';
import AddProduct from './pages/AddProduct';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute'; // ✅ import it

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        {/* ✅ Only Admins can access AddProduct */}
        <Route
          path="/AddProduct"
          element={
            <ProtectedRoute roleRequired="admin">
              <AddProduct />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
