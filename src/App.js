import './styles.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route /*, Link*/ } from 'react-router-dom';
import Register from './Register';
import Login from './Login'; 
import HomePage from './HomePage'; 
import InfoDisplay from './components/InfoDisplay'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<HomePage />} /> 
        <Route path="/info" element={<InfoDisplay />} />
      </Routes>
    </Router>
  );
}

export default App;

