import { CartLocalStor } from "./cartTypes";
import { displayCartProductItems } from "./displayCart";
import { page, productPerPage } from "./changeAmount&Page";
import { changeTotalItemsAndMoney, changePromoCodeMoney } from "./changeMoney";
import { createAppliedPromo } from "./usePromoCode";

export function startCart() {
  let cartProducts: CartLocalStor[] = [];
  const localStor = localStorage.getItem("cartProducts");
  if (localStor) {
    cartProducts = JSON.parse(localStor);
  }

  displayCartProductItems(cartProducts, productPerPage, page);
  changeTotalItemsAndMoney(cartProducts);
  createAppliedPromo();
  changePromoCodeMoney();

  const itemInfo = document.querySelectorAll<HTMLElement>(".item__info");
  itemInfo.forEach((item) => {
    item.addEventListener("click", goToDetailsPage);
  });

}

  function goToDetailsPage(e: Event) {
    const target = e.target as HTMLElement;
    const product = target?.closest(".cart-products__item_wrapper");
    if (product) {
      localStorage.setItem("productDetails", String(product.id));
      window.location.href = "./details.html";
    }
  }