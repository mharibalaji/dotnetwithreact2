import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><ProductList /></PrivateRoute>} />
        <Route path="/add" element={<PrivateRoute><ProductForm /></PrivateRoute>} />
        <Route path="/edit/:id" element={<PrivateRoute><ProductForm /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
