import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipeCard.css';

function RecipeCard({ recipe }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/recipe/${recipe.id}`);
  };

  return (
    <div className="recipe-card" onClick={handleClick}>
      <div className="recipe-card-image">
        <img src={recipe.image} alt={recipe.title} />
      </div>
      <div className="recipe-card-content">
        <h3>{recipe.title}</h3>
        <button className="view-recipe-btn">View Recipe →</button>
      </div>
    </div>
  );
}

export default RecipeCard;
