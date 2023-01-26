import { CartLocalStore } from "./cartTypes";
import { displayCartProductItems } from "./displayCart";
import { page, productPerPage } from "./changeAmountPage";
import { changeTotalItemsAndMoney, changePromoCodeMoney } from "./changeMoney";
import { createAppliedPromo } from "./usePromoCode";

export function startCart() {
  let cartProducts: CartLocalStore[] = [];
  const localStore = localStorage.getItem("cartProducts");
  if (localStore) {
    cartProducts = JSON.parse(localStore);
  }

  displayCartProductItems(cartProducts, productPerPage, page);
  changeTotalItemsAndMoney(cartProducts);
  createAppliedPromo();
  changePromoCodeMoney();
}