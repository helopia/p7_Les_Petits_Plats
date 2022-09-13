import Display from "./Display";
import Search from "./Search";
export default class FilterByClick{
    constructor(results, target, suggestion, array){
        this.results= results;
        this.array= array;
        this.display= new Display();
        this.filter(target, suggestion);
    }
    filter(target, suggestion){
        this.display.displayRecipes();
        let filteredResults= [];
        switch(target){
            case "ingredients" :
                filteredResults= this.results.filter(result => result.ingredients.includes(suggestion));
                break;
            case "appareils" :
                filteredResults= this.results.filter(result => result.appareils.includes(suggestion));
                break;
            case "ustensiles" :
                filteredResults= this.results.filter(result => result.ustensiles.includes(suggestion));
                break;
            default :
                console.log("no type of filter");
        }
        const search= new Search(this.array, filteredResults);
        for(const result of filteredResults){
            this.display.displayRecipes(result.recipe);
        }
        return filteredResults;
    }
}
