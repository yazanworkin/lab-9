import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import RecipeDetails from './pages/RecipeDetails';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-logo">Home</Link>
            <Link to="/" className="nav-logo" style={{ marginLeft: '2rem' }}>About</Link>
          </div>
        </nav>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
        
        <footer className="footer">
          <p>Powered by Spoonacular API</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
