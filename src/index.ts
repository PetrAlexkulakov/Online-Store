import "./scss/base.css";
import { createFilters } from "./ts/main-page/mainFilters";
import { putProducts } from "./ts/main-page/products";
import { filtraite } from "./ts/main-page/mainFilters";
import { createSearch } from "./ts/main-page/mainSearch";
import { createFilterButtons } from "./ts/main-page/mainFilterButtons";
import { createFiltersSlide } from "./ts/main-page/mainFiltersSlide";
import { cartClick } from "./ts/cartClick";
import { purchaseWindowClick } from "./ts/purchaseWindowClick";
import { createDetails } from "./ts/details-page/createDetailsPage";

import { startCart } from "./ts/cart-page/cart";
import { showModalWindow } from "./ts/purchase-window/startPurchaseWindow";
import { confirmBtnClick } from "./ts/confirmBtnClick";
import { goToIndex } from "./ts/goToIndex";

const page = document.body;

switch(page.id) {
    case 'index':
        putProducts();
        createFilters();
        filtraite();
        createSearch();
        createFilterButtons();
        createFiltersSlide();
    break;
    case 'details':
        createDetails();
    break;
    case 'cart':
        startCart();
        if (localStorage.getItem('isModaleOpen') === 'true') showModalWindow();
    break;
    case 'cartModalWindow':
        showModalWindow();
    break;
}

cartClick();
purchaseWindowClick();
confirmBtnClick();
goToIndex();
