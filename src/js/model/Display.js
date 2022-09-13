import {
    RECIPE_CARDS,
    INGREDIENTS_SUGGESTIONS,
    APPAREILS_SUGGESTIONS,
    USTENSILES_SUGGESTIONS,
    SEARCH_WORLDS
} from "./globals";
export default class Display{
    constructor(){
        this.recipeCards= RECIPE_CARDS;
    }
    displayDropdowns(ingredients, appareils, ustensiles){
        INGREDIENTS_SUGGESTIONS.forEach(suggestion=> {
            suggestion.innerHTML= ingredients.map(ingredient => `<li class="suggestion primary" target="ingredients" cliquable="true"><button class="dropdown-item" >${ingredient}</button></li>`).join("");
        });
        APPAREILS_SUGGESTIONS.forEach(suggestion=> {
            suggestion.innerHTML= appareils.map(appareil => `<li class="suggestion success" target="appareils" cliquable="true"><button class="dropdown-item" >${appareil}</button></li>`).join("");
        });

        USTENSILES_SUGGESTIONS.forEach(suggestion=> {
            suggestion.innerHTML= ustensiles.map(ustensile => `<li class="suggestion danger" target="ustensiles" cliquable="true"><button class="dropdown-item" >${ustensile}</button></li>`).join("");
        });
        const DROPDOWN_BUTTONS= document.querySelectorAll(".suggestion");
        return DROPDOWN_BUTTONS;
    }
    displayRecipes(recipe){
        if(recipe){
            RECIPE_CARDS.innerHTML+=
                `<div class="col">
                    <div class="card h-100">
                        <img src="../assets/photos/${recipe.image}" class="card-img-top bg-secondary" alt="photo de ${recipe.name}" width="400" height="200" />
                        <div class="card-body row bg-light">
                            <div class="col-md">
                                <h2 class="card-title">${recipe.name}</h2>
                                <ul class="p-0">
                                    ${recipe.ingredients.map(ingredient => `<li> ${ingredient.ingredient} ${ingredient.quantity ? " : <span>" + ingredient.quantity : ""} ${ingredient.unit ? ingredient.unit : ""}</span></li>`).join("")}
                                </ul>
                            </div>

                            <div class="col-md">
                                <h3 class="text-end d-flex justify-content-end align-items-center"><i class="far fa-clock"></i>${recipe.time} min</h3>
                                <p class="card-text">${recipe.description}</p>
                            </div>
                        </div>
                    </div>
                </div>`;
        }else RECIPE_CARDS.innerHTML= "";
    }
    displayTags(world, type, target){
        SEARCH_WORLDS.innerHTML += `<button class="btn btn-${type} me-2 tag" target="${target}"><span>${world}</span><i class="far fa-times-circle"></i></button>`;
    }
    displayErrorMessage(recipe1, recipe2){
        RECIPE_CARDS.innerHTML= `<div class="error-message p-5">
            <h2>Aucune recette ne correspond à votre critère...</h2>
            <p>Vous pouvez chercher <a href="#">${recipe1.name}</a>, <a href="#">${recipe2.ingredients[0].ingredient}</a>, etc...</p>
            <svg class="img-fluid" type="image" alt="logo d'un personnage qui a faim" id="Capa_1" enable-background="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg">
                <g>
                    <path d="m374.339 9.476h-236.677c-75.907 0-137.662 61.754-137.662 137.661v136.826c0 28.09 8.41 55.112 24.32 78.146 13.559 19.631 31.731 35.243 52.964 45.599v79.816c0 5.802 3.346 11.083 8.592 13.562 2.043.965 4.23 1.438 6.406 1.438 3.411 0 6.791-1.163 9.527-3.412l94.271-77.488h178.259c75.906 0 137.661-61.754 137.661-137.661v-136.826c0-75.907-61.755-137.661-137.661-137.661zm107.661 274.487c0 59.365-48.297 107.661-107.661 107.661h-183.633c-3.474 0-6.841 1.206-9.525 3.412l-73.897 60.742v-57.826c0-6.141-3.743-11.662-9.448-13.935-41.209-16.419-67.836-55.692-67.836-100.054v-136.826c0-59.365 48.297-107.661 107.662-107.661h236.677c59.364 0 107.661 48.296 107.661 107.661z"/>
                    <path d="m301.212 295.463h-90.424c-8.284 0-15 6.716-15 15s6.716 15 15 15h90.424c8.284 0 15-6.716 15-15s-6.716-15-15-15z"/>
                    <path d="m353.202 99.476c-41.355 0-75 33.645-75 75s33.645 75 75 75 75-33.645 75-75-33.644-75-75-75zm0 30c14.432 0 27.289 6.837 35.529 17.432l-80.512 28.235c-.003-.223-.017-.444-.017-.668 0-24.812 20.187-44.999 45-44.999zm0 90c-13.867 0-26.285-6.308-34.546-16.201l79.523-27.888c-.488 24.392-20.469 44.089-44.977 44.089z"/>
                    <path d="m235.788 174.476c0-41.355-33.645-75-75-75s-75 33.645-75 75 33.645 75 75 75 75-33.645 75-75zm-75-45c24.813 0 45 20.187 45 45 0 .176-.011.35-.013.526-.113-.043-.219-.096-.334-.137l-80.081-28.084c8.243-10.523 21.054-17.305 35.428-17.305zm0 90c-24.563 0-44.579-19.785-44.981-44.253l79.635 27.928c-8.261 9.965-20.728 16.325-34.654 16.325z"/>
                </g>
            </svg>`;
            const ERROR_LINKS= RECIPE_CARDS.querySelectorAll("a");
            return ERROR_LINKS;
    }
}
