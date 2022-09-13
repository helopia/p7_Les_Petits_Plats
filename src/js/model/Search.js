import Display from "./Display";
import EventsManager from "./EventsManager";

export default class Search{
    constructor(array, filteredArray){
        this.array= array;
        this.first3LettersResults= [];
        this.checkMessage= /^[\s\S]{3,}/;
        this.display= new Display();
        if(filteredArray) this.dropdownResearch(filteredArray);
        else this.dropdownResearch(this.array);
    }
    navigationResearch(value){
        if(this.checkMessage.test(value)){
            this.display.displayRecipes();
            const results= [];
            if(value.length === 3){
                for(const recipe of this.array){
                    if(recipe.name.includes(value)){
                        this.display.displayRecipes(recipe.recipe);
                        results.push(recipe);
                    }else{
                        if(recipe.description.includes(value)){
                            this.display.displayRecipes(recipe.recipe);
                            results.push(recipe);
                        }else{
                            for(const ingredient of recipe.ingredients){
                                if(ingredient.includes(value)){
                                    this.display.displayRecipes(recipe.recipe);
                                    results.push(recipe);
                                    break;
                                }
                            }
                        }
                    }
                }
                this.first3LettersResults= results;
            }else{
                if(this.first3LettersResults.length !== 0){
                    for(const recipe of this.first3LettersResults){
                        if(recipe.name.includes(value)){
                            results.push(recipe);
                            this.display.displayRecipes(recipe.recipe);
                        }else{
                            if(recipe.description.includes(value)){
                                results.push(recipe);
                                this.display.displayRecipes(recipe.recipe);
                            }else{
                                for(const ingredient of recipe.ingredients){
                                    if(ingredient.includes(value)){
                                        results.push(recipe);
                                        this.display.displayRecipes(recipe.recipe);
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }else{
                    for(const recipe of this.array){
                        if(recipe.name.includes(value)){
                            results.push(recipe);
                            this.display.displayRecipes(recipe.recipe);
                        }else{
                            if(recipe.description.includes(value)){
                                results.push(recipe);
                                this.display.displayRecipes(recipe.recipe);
                            }else{
                                for(const ingredient of recipe.ingredients){
                                    if(ingredient.includes(value)){
                                        results.push(recipe);
                                        this.display.displayRecipes(recipe.recipe);
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    this.first3LettersResults= results;
                }
            }
            if(results.length <= 0){
                const events= new EventsManager(this.array);
                const randomNumbers= [];
                for(let i= 0; i<2; i++) {
                    randomNumbers.push(Math.floor(Math.random()*this.array.length));
                }
                const links= this.display.displayErrorMessage(this.array[randomNumbers[0]].recipe, this.array[randomNumbers[1]].recipe);
                events.onClickErrorLinks(links);
            }else{
                this.dropdownResearch(results);
            }
        }else{
            this.first3LettersResults= [];
            this.dropdownResearch(this.array);
            this.display.displayRecipes();
        }
    }
    dropdownResearch(results){
        let ingredientsArray= [];
        for(const result of results){
            for(const ingredient of result.ingredients){
                ingredientsArray.push(ingredient);
            }
        }
        ingredientsArray= Array.from(new Set(ingredientsArray));
        ingredientsArray.sort();
        let appareilsArray= [];
        for(const result of results){
            appareilsArray.push(result.appareils);
        }
        appareilsArray= Array.from(new Set(appareilsArray));
        appareilsArray.sort();
        let ustensilesArray= [];
        for(const result of results){
            for(const ustensile of result.ustensiles){
                ustensilesArray.push(ustensile);
            }
        }
        ustensilesArray= Array.from(new Set(ustensilesArray));
        ustensilesArray.sort();
        const events= new EventsManager(this.array);
        const suggestions= this.display.displayDropdowns(ingredientsArray, appareilsArray, ustensilesArray);
        events.onClickSuggestion(suggestions, results);
        events.onInputDropdowns(results, ingredientsArray, appareilsArray, ustensilesArray, this.array);
    }
}
