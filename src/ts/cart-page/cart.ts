import { getCartProducts } from "./cartConst";
import { displayCartProductItems } from "./displayCart";
import { productsItems, productAmountInput } from "./cartConst";
import { changeProductAmount, changePage, page, productPerPage, pageForwardBtn, pageBackBtn } from "./changeAmount&Page";
import { changeTotalItemsAndMoney,  changePromoCodeMoney } from "./changeMoney";
import { createAppliedPromo } from "./usePromoCode";
import { clickHandler } from "./add&removeProducts";

const cartProducts = getCartProducts();


localStorage.setItem(
  "cartProducts",
  JSON.stringify([
    { id: 1, count: 1, price: 100 },
    { id: 2, count: 1, price: 200 },
    { id: 3, count: 1, price: 300 },
    { id: 4, count: 1, price: 400 },
    { id: 5, count: 1, price: 500 },
    { id: 6, count: 1, price: 600 },
    { id: 7, count: 1, price: 700 },
    { id: 8, count: 1, price: 800 },
    { id: 9, count: 1, price: 900 },
    { id: 10, count: 1, price: 1000 },
  ])
);



productAmountInput?.addEventListener("input", changeProductAmount);
productsItems?.addEventListener("click", clickHandler);
pageForwardBtn?.addEventListener("click", changePage);
pageBackBtn?.addEventListener("click", changePage);


displayCartProductItems(cartProducts, productPerPage, page);
changeTotalItemsAndMoney(cartProducts);
createAppliedPromo();
changePromoCodeMoney();
