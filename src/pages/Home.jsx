import React, { useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import './Home.css';

const API_KEY = '158070bf87364a75b82c29bb06fb20bb';

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const searchRecipes = async (e) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      setError('Please enter a search term');
      return;
    }

    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${searchQuery}&number=12`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }

      const data = await response.json();
      setRecipes(data.results || []);
    } catch (err) {
      setError('Error fetching recipes. Please check your API key and try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <div className="hero-section">
        <h1>Find Your Perfect Recipe</h1>
        <p>Search from thousands of delicious recipes</p>
        
        <form onSubmit={searchRecipes} className="search-form">
          <input
            type="text"
            placeholder="Search for recipes (e.g., pasta, chicken, salad)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Searching for recipes...</p>
        </div>
      )}

      {!loading && hasSearched && recipes.length === 0 && (
        <div className="no-results">
          <p>No recipes found. Try a different search term!</p>
        </div>
      )}

      {!loading && recipes.length > 0 && (
        <div className="results-section">
          <h2>Found {recipes.length} recipes</h2>
          <div className="recipes-grid">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
