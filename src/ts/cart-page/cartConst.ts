import { CartLocalStor } from "./cartTypes";

export const productsItems = document.querySelector(".cart-products__items");
export const productAmountInput = document.querySelector<HTMLInputElement>(
  ".products-amount__input"
);


export function getCartProducts() {
  let cartProducts: CartLocalStor[];
  const localStor = localStorage.getItem("cartProducts");
  if (localStor) {
    cartProducts = JSON.parse(localStor);
  } else {
    cartProducts = [];
  }
  return cartProducts;
}
