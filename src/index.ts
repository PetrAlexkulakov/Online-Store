import "./scss/base.css";
import { createFilters } from "./ts/mainFilters";
import { putProducts } from "./ts/products";


const page = document.body;

switch(page.id){
    case 'index':
        putProducts();
        createFilters();
        break;
}