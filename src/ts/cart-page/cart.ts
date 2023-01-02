import { CartLocalStor } from "./cartTypes";
import { displayCartProductItems } from "./displayCart";
import { page, productPerPage } from "./changeAmount&Page";
import { changeTotalItemsAndMoney,  changePromoCodeMoney } from "./changeMoney";
import { createAppliedPromo } from "./usePromoCode";


let cartProducts: CartLocalStor[] = [];
const localStor = localStorage.getItem("cartProducts");
if (localStor) {
  cartProducts = JSON.parse(localStor);
}

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

displayCartProductItems(cartProducts, productPerPage, page);
changeTotalItemsAndMoney(cartProducts);
createAppliedPromo();
changePromoCodeMoney();
