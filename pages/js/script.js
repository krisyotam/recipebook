document.addEventListener("DOMContentLoaded", () => {
    const recipeContainer = document.getElementById("recipe-container");
  
    // Fetch recipes.json and populate the UI
    fetch('/pages/json/recipes.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const recipes = data.recipes;
  
        recipes.forEach(recipe => {
          const recipeBox = document.createElement("div");
          recipeBox.className = "recipe-box";
  
          recipeBox.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.name}">
            <div class="content">
              <h3>${recipe.name}</h3>
              <p>${recipe.description}</p>
            </div>
          `;
  
          recipeContainer.appendChild(recipeBox);
        });
      })
      .catch(error => {
        console.error('Error fetching the recipes:', error);
        recipeContainer.innerHTML = '<p>Failed to load recipes. Please try again later.</p>';
      });
  });
  