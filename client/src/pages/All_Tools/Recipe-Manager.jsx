import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { jsPDF } from 'jspdf';
import 'react-toastify/dist/ReactToastify.css';

const RecipeManager = () => {
  const [recipes, setRecipes] = useState([]);
  const [recipe, setRecipe] = useState({ name: '', ingredients: '', instructions: '' });
  const [groceryList, setGroceryList] = useState([]);
  const [sharedRecipes, setSharedRecipes] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const addRecipe = () => {
    if (!recipe.name || !recipe.ingredients || !recipe.instructions) {
      toast.error("Please fill in all fields");
      return;
    }
    setRecipes([...recipes, recipe]);
    setRecipe({ name: '', ingredients: '', instructions: '' });
    toast.success("Recipe added");
  };

  const generateGroceryList = () => {
    const ingredients = recipes.flatMap(recipe => recipe.ingredients.split(',').map(ing => ing.trim()));
    setGroceryList([...new Set(ingredients)]);
    toast.success("Grocery list generated");
  };

  const shareRecipe = (index) => {
    setSharedRecipes([...sharedRecipes, recipes[index]]);
    toast.success("Recipe shared");
  };

  const exportRecipeToPDF = (recipe) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(recipe.name, 10, 10);
    doc.setFontSize(12);
    doc.text("Ingredients:", 10, 20);
    doc.text(recipe.ingredients, 10, 30);
    doc.text("Instructions:", 10, 50);
    doc.text(recipe.instructions, 10, 60);
    doc.save(`${recipe.name}.pdf`);
    toast.success("Recipe exported as PDF");
  };

  return (
    <div className=' text-editor-container' style={{ padding: '20px' }}>
      <h1 className="title">Recipe Manager</h1>
      <div className='text-area-form'>
        <h2>Add Recipe</h2>
        <textarea className="textarea-container"
          type="text"
          name="name"
          placeholder="Recipe Name"
          value={recipe.name}
          onChange={handleInputChange}
        />
        <textarea className="textarea-container"
          name="ingredients"
          placeholder="Ingredients (comma separated)"
          value={recipe.ingredients}
          onChange={handleInputChange}
        />
        <textarea className="textarea-container"
          name="instructions"
          placeholder="Instructions"
          value={recipe.instructions}
          onChange={handleInputChange}
        />
        <br />
        <button className="btn-tool" onClick={addRecipe}>Add Recipe</button>
      </div>
      <div>
        <h2>Recipes</h2>
        <ul>
          {recipes.map((recipe, index) => (
            <li key={index}>
              <h3>{recipe.name}</h3>
              <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
              <p><strong>Instructions:</strong> {recipe.instructions}</p>
              <button className="btn-tool" onClick={() => shareRecipe(index)}>Share</button>
              <button className="btn-tool" onClick={() => exportRecipeToPDF(recipe)}>Export as PDF</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Grocery List</h2>
        <button className="btn-tool" onClick={generateGroceryList}>Generate Grocery List</button>
        <ul>
          {groceryList.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Shared Recipes</h2>
        <ul>
          {sharedRecipes.map((recipe, index) => (
            <li key={index}>
              <h3>{recipe.name}</h3>
              <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
              <p><strong>Instructions:</strong> {recipe.instructions}</p>
            </li>
          ))}
        </ul>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RecipeManager;
