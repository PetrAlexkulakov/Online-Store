import "./scss/base.css";
import { createFilters } from "./ts/mainFilters";
import { putProducts } from "./ts/products";
import { filtraite } from "./ts/mainFilters";
import { createSearch } from "./ts/mainSearch";
import { createFilterButtons } from "./ts/mainFilterButtons";
import { createFiltersSlide } from "./ts/mainFiltersSlide";

const page = document.body;

switch(page.id){
    case 'index':
        putProducts();
        createFilters();
        filtraite();
        createSearch();
        createFilterButtons();
        createFiltersSlide();
    break;
}