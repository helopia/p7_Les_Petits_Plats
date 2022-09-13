import {
    NAV_SEARCH,
    SEARCH_WORLDS,
    DROPDOWN_INPUTS
} from "./globals";
import Search from "./Search";
import Display from "./Display";
import FilterByClick from "./FilterByClick";
import FilterByInput from "./FilterByInput";
export default class EventsManager{
    constructor(array){
        this.display= new Display();
        this.navigationInput= NAV_SEARCH;
        this.dropdownInputs= DROPDOWN_INPUTS;
        this.dropdownButtons= document.querySelectorAll(".btn-lg");
        this.array= array;
    }
    init(){
        const search= new Search(this.array);
        this.navigationInput.addEventListener('input', ()=>{
            search.navigationResearch(this.navigationInput.value.trim().toLowerCase());
            SEARCH_WORLDS.innerHTML= "";
            this.dropdownInputs.forEach(input=> input.value= "");
        });
        this.dropdownButtons.forEach(button=> button.addEventListener("click", (e)=>{
            e.stopPropagation();
            if(button.classList.contains("show")){
                const input= button.querySelector("input");
                if(input.attributes.name.value === "ingredients") input.setAttribute("placeholder", "Rechercher un ingrédient");
                else if(input.attributes.name.value === "appareils") input.setAttribute("placeholder", "Rechercher un appareil");
                else input.setAttribute("placeholder", "Rechercher un ustensile");
            }else{
                const input= button.querySelector("input");
                if(input.attributes.name.value === "ingredients") input.setAttribute("placeholder", "Ingrédients");
                else if(input.attributes.name.value === "appareils") input.setAttribute("placeholder", "Appareils");
                else input.setAttribute("placeholder", "Ustensiles");
            }
        }));
        document.addEventListener("click", ()=> {
            this.dropdownInputs.forEach(input=> {
                if(input.attributes.name.value === "ingredients") input.setAttribute("placeholder", "Ingrédients");
                else if(input.attributes.name.value === "appareils") input.setAttribute("placeholder", "Appareil");
                else input.setAttribute("placeholder", "Ustensiles");
                input.textContent= "";
            })
        })
    }
    onClickSuggestion(suggestions, results){
        const SEARCH_WORLDS_BUTTONS= SEARCH_WORLDS.querySelectorAll("button");
        const buttonsName= [];
        for(const button of SEARCH_WORLDS_BUTTONS){
            buttonsName.push(button.textContent);
        }
        suggestions.forEach(suggestion => {
            suggestion.addEventListener("click", ()=> {
                if(SEARCH_WORLDS_BUTTONS.length > 0){
                    if(buttonsName.includes(suggestion.textContent)) return;
                }
                this.display.displayTags(suggestion.textContent, suggestion.classList[1], suggestion.attributes.target.value);
                const filter= new FilterByClick(results, suggestion.attributes.target.value, suggestion.textContent, this.array);
                this.dropdownInputs.forEach(input=> input.value= "");
                this.navigationInput.value= "";
                this.onClickTags();
            });
        });
    }
    onInputDropdowns(results, ingredients, appareils, ustensiles, array){
        for(const input of this.dropdownInputs){
            input.addEventListener("input", ()=> {
                const filter= new FilterByInput(results, ingredients, appareils, ustensiles, input.attributes.name.value, input.value.trim().toLowerCase(), array);
            })
        }
    }
    onClickTags(){
        let SEARCH_WORLDS_BUTTONS= SEARCH_WORLDS.querySelectorAll("button");
        SEARCH_WORLDS_BUTTONS.forEach(button=> {
            button.addEventListener("click", ()=> {
                SEARCH_WORLDS.removeChild(button);
                SEARCH_WORLDS_BUTTONS= SEARCH_WORLDS.querySelectorAll("button");
                if(SEARCH_WORLDS_BUTTONS.length > 0){
                    let results= this.array;
                    for(let i=0; i < SEARCH_WORLDS_BUTTONS.length; i++){
                        results= new FilterByClick(results, SEARCH_WORLDS_BUTTONS[i].attributes.target.value, SEARCH_WORLDS_BUTTONS[i].textContent, this.array);
                        i++;
                    }
                }else{
                    const search= new Search(this.array);
                    this.display.displayRecipes();
                }
            });
        });
    }
    onClickErrorLinks(links){
        links.forEach(link=> link.addEventListener("click", (e)=> {
            e.preventDefault();
            this.navigationInput.value= link.innerText;
            const search= new Search(this.array);
            search.navigationResearch(this.navigationInput.value.trim().toLowerCase());
        }))
    }
}
