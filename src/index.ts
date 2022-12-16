import "./scss/base.css";
import { putProducts } from "./ts/products";

const page = document.body;

switch(page.id){
    case 'index':
        putProducts();
        break;
}