import Display from "./Display";
import EventsManager from "./EventsManager";
export default class FilterByInput{
    constructor(results, ingredients, appareils, ustensiles, target, value, array){
        this.results= results;
        this.ingredientsArray= ingredients;
        this.appareilsArray= appareils;
        this.ustensilesArray= ustensiles;
        this.array= array;
        switch(target){
            case "ingredients" :
                this.filterByIngredients(value);
                break;
            case "appareils" :
                this.filterByAppareils(value);
                break;
            case "ustensiles" :
                this.filterByUstensiles(value);
                break;
            default :
                console.log("no type of filter");
        }
        this.display= new Display();
        this.suggestions= this.display.displayDropdowns(this.ingredientsArray, this.appareilsArray, this.ustensilesArray);
        this.events= new EventsManager(this.array);
        this.events.onClickSuggestion(this.suggestions, this.results);
    }
    filterByIngredients(value){
        this.ingredientsArray= this.ingredientsArray.filter(ingredient => ingredient.includes(value));
    }
    filterByAppareils(value){
        this.appareilsArray= this.appareilsArray.filter(appareil => appareil.includes(value));
    }
    filterByUstensiles(value){
        this.ustensilesArray= this.ustensilesArray.filter(ustensile => ustensile.includes(value));
    }
}
