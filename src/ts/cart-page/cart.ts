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

displayCartProductItems(cartProducts, productPerPage, page);
changeTotalItemsAndMoney(cartProducts);
createAppliedPromo();
changePromoCodeMoney();
