import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './RecipeDetails.css';

const API_KEY = '158070bf87364a75b82c29bb06fb20bb'; 

function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch recipe details when component loads
  useEffect(() => {
    const fetchRecipeDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch recipe details');
        }

        const data = await response.json();
        setRecipe(data);
      } catch (err) {
        setError('Error loading recipe details. Please try again.');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]); // Re-fetch if the recipe ID changes

  if (loading) {
    return (
      <div className="recipe-details loading">
        <div className="spinner"></div>
        <p>Loading recipe details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="recipe-details error">
        <p>{error}</p>
        <button onClick={() => navigate('/')} className="back-button">
          Back to Search
        </button>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="recipe-details error">
        <p>Recipe not found</p>
        <button onClick={() => navigate('/')} className="back-button">
          Back to Search
        </button>
      </div>
    );
  }

  return (
    <div className="recipe-details">
      <button onClick={() => navigate('/')} className="back-button">
        ← Back to Search
      </button>

      <div className="recipe-header">
        <img src={recipe.image} alt={recipe.title} className="recipe-image" />
        <div className="recipe-info">
          <h1>{recipe.title}</h1>
          <div className="recipe-meta">
            <span className="meta-item">
              ⏱️ {recipe.readyInMinutes} minutes
            </span>
            <span className="meta-item">
              👥 {recipe.servings} servings
            </span>
            {recipe.healthScore && (
              <span className="meta-item">
                💚 Health Score: {recipe.healthScore}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="recipe-content">
        <div className="ingredients-section">
          <h2>Ingredients</h2>
          <ul className="ingredients-list">
            {recipe.extendedIngredients && recipe.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id}>
                <span className="ingredient-amount">{ingredient.measures.metric.amount} {ingredient.measures.metric.unitShort}</span>
                <span className="ingredient-name">{ingredient.name}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="instructions-section">
          <h2>Instructions</h2>
          {recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0 ? (
            <ol className="instructions-list">
              {recipe.analyzedInstructions[0].steps.map((step) => (
                <li key={step.number}>
                  <span className="step-number">Step {step.number}</span>
                  <p>{step.step}</p>
                </li>
              ))}
            </ol>
          ) : (
            <div 
              className="instructions-html"
              dangerouslySetInnerHTML={{ __html: recipe.instructions }}
            />
          )}
        </div>

        {recipe.summary && (
          <div className="summary-section">
            <h2>About This Recipe</h2>
            <div 
              className="summary-content"
              dangerouslySetInnerHTML={{ __html: recipe.summary }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default RecipeDetails;
