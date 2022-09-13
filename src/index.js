//import du main.scss
import './sass/main.scss';

// import des fonctions liées au dropdown de bootsrap 5
import '../node_modules/bootstrap/js/dist/dropdown';

import { recipes } from './js/data/recipes';

import Arrays from "./js/model/Arrays";
import EventsManager from "./js/model/EventsManager";

//on crée un tableau normalisé avec les datas pour faciliter les recherches sur le site à son ouverture
const arrays= new Arrays(recipes);

//on instancie la classe eventsManager qui va initialiser tous les events sur l'application et on lui passe le tableau de base en argument
const events= new EventsManager(arrays.navigationArrayGenerator());
events.init();