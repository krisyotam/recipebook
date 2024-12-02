const fs = require('fs');
const path = require('path');

// Load the recipes JSON file
const recipesFilePath = path.join(__dirname, 'pages/json/recipes.json');
const recipesData = JSON.parse(fs.readFileSync(recipesFilePath, 'utf8'));

// Directory to save recipe pages
const outputDir = path.join(__dirname, 'pages/html/recipes');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Function to generate HTML for a recipe
function generateRecipeHTML(recipe) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${recipe.name}</title>
  <link rel="stylesheet" href="../../styles.css">
</head>
<body>
  <nav class="navbar">
    <div class="logo">RecipeHub</div>
    <ul class="nav-links">
      <li><a href="../../index.html">Home</a></li>
      <li><a href="../../index.html#about">About</a></li>
      <li><a href="../../index.html#donate">Donate</a></li>
    </ul>
  </nav>

  <header>
    <h1>${recipe.name}</h1>
  </header>
  
  <div class="recipe-details">
    <img src="../../${recipe.image}" alt="${recipe.name}" class="recipe-image">
    <p class="recipe-description">${recipe.description}</p>
    
    <h2>Ingredients</h2>
    <ul>
      ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('\n')}
    </ul>
    
    <h2>Directions</h2>
    <ol>
      ${recipe.directions.map(direction => `<li>${direction}</li>`).join('\n')}
    </ol>
    
    <p class="contributors">Contributors: ${recipe.contributors.join(', ')}</p>
  </div>
</body>
</html>
  `;
}

// Generate HTML files for each recipe
recipesData.recipes.forEach(recipe => {
  const recipeFileName = `${recipe.name.toLowerCase().replace(/\s+/g, '_')}.html`;
  const recipeFilePath = path.join(outputDir, recipeFileName);

  if (fs.existsSync(recipeFilePath)) {
    console.log(`Skipped: ${recipeFileName} (already exists)`);
  } else {
    const recipeHTML = generateRecipeHTML(recipe);
    fs.writeFileSync(recipeFilePath, recipeHTML, 'utf8');
    console.log(`Generated: ${recipeFileName}`);
  }
});

console.log('Recipe pages generation complete!');
