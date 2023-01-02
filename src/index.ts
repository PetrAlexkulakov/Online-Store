import "./scss/base.css";
import { createFilters } from "./ts/main-page/mainFilters";
import { putProducts } from "./ts/main-page/products";
import { filtraite } from "./ts/main-page/mainFilters";
import { createSearch } from "./ts/main-page/mainSearch";
import { createFilterButtons } from "./ts/main-page/mainFilterButtons";
import { createFiltersSlide } from "./ts/main-page/mainFiltersSlide";

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

import "./ts/cart-page/cart.ts";
