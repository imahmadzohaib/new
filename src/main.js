const searchData= document.getElementById('search');
const searchBtn=document.getElementById('search-btn');
const recipeContainer = document.getElementById('recipe');
const recipeDetailContainer = document.querySelector('.recipe-detail-container');
const recipeCloseBtn = document.querySelector('.recipe-close');




const fetchRecipes= async(query)=>{

  recipeContainer.innerHTML='<h2>Fetching your data...</h2>';
  const fetchData=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
  const response= await fetchData.json();
  
  if(response.meals===null){
    
  }
  recipeContainer.innerHTML='';
  response.meals.forEach(meal => {
    const recipeDiv= document.createElement('div');
    recipeDiv.classList.add('recipe');
    recipeDiv.innerHTML=`
    <img src="${meal.strMealThumb}">
    <h3>${meal.strMeal}</h3>
    <p><b>${meal.strArea}</b> Dish</p>
    <p>Category: <b>${meal.strCategory}</b></p>
    `;
    const button = document.createElement('button');
    button.textContent='View recipe';
    recipeDiv.appendChild(button);

    button.addEventListener('click',()=>{
      addPopUp(meal);
    });
    recipeContainer.appendChild(recipeDiv);
  });
}

const fetchIngrediatnts=(meal)=>{
  let IngredientsList="";
  for(let i=1;i<=20;i++){
    const ingredient= meal[`strIngredient${i}`];
    if(ingredient){
      const measure= meal[`strMeasure${i}`];
      IngredientsList+=`<li>${measure}${ingredient} </li>`
    }else{
      break;
    }
  }
  return IngredientsList;

};

const addPopUp=(meal)=>{
  recipeDetailContainer.innerHTML=`
  <h2 class="recipeName">${meal.strMeal}</h2>
  <h3>Ingredients: </h3>
  <ul class="ingredientsList">${fetchIngrediatnts(meal)}</ul>
  <div>
  <h3>Instructions: </h3>
  <p class="instructions">${meal.strInstructions}</p>
  </div>
  `;

  recipeDetailContainer.parentElement.style.display="block";
}

recipeCloseBtn.addEventListener('click',()=>{
  recipeDetailContainer.parentElement.style.display="none";
});
searchBtn.addEventListener('click',(event)=>{
  event.preventDefault();
  const query= searchData.value.trim();
  fetchRecipes(query);
  console.log('How are you?',query);
});