import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/global.css';
import HomePage from './pages/HomePage/HomePage';
import TrendsPage from './pages/TrendsPage/TrendsPage';
import ContactPage from './pages/ContactPage/ContactPage';
import BriefPage from './pages/BriefPage/BriefPage';
import CustomCursor from './components/CustomCursor/CustomCursor';
import './App.css';

function App() {
  return (
    <Router>
      <CustomCursor />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/trends" element={<TrendsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/brief" element={<BriefPage />} />
      </Routes>
    </Router>
  );
}

export default App;
