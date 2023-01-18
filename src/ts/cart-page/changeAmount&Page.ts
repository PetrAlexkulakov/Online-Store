import { productAmountInput, productsItems } from "./cartConst";
import { displayCartProductItems } from "./displayCart";
import { dataProducts } from "../dataProducts";
import { changeTotalItemsAndMoney, changePromoCodeMoney } from "./changeMoney";
import { CartLocalStore } from "./cartTypes";

let cartProducts: CartLocalStore[] = [];
const localStore = localStorage.getItem("cartProducts");
if (localStore) {
  cartProducts = JSON.parse(localStore);
}

export const pageNumber = document.querySelector<HTMLElement>(".page-number");
export const pageForwardBtn =
  document.querySelector<HTMLElement>(".page-btn-forward");
export const pageBackBtn =
  document.querySelector<HTMLElement>(".page-btn-back");

export let page: number;
export let productPerPage = Number(productAmountInput?.value);
export let pageCounts = Math.ceil(cartProducts.length / productPerPage);

page = 1;

export function changeProductAmount() {
  if (!productAmountInput) return;
  productPerPage = Number(productAmountInput.value);
  productAmountInput.setAttribute("max", `${cartProducts.length}`);
  pageCounts = Math.ceil(cartProducts.length / productPerPage);
  if (page > pageCounts) {
    if (!pageNumber) return;
    page = pageCounts;
    pageNumber.innerHTML = `${page}`;
  }
  displayCartProductItems(cartProducts, productPerPage, page);
}

export function changePage(e: Event) {
  const target = e.target as HTMLElement;
  if (!pageNumber) return;
  if (target === pageForwardBtn) {
    if (page === pageCounts) return;
    page++;
    pageNumber.innerHTML = `${page}`;
  } else if (target === pageBackBtn) {
    if (page === 1) return;
    page--;
    pageNumber.innerHTML = `${page}`;
  }

  displayCartProductItems(cartProducts, productPerPage, page);
}
export function clickHandler(e: Event) {
  if ((e.target as HTMLElement).classList.contains("btn__add")) {
    addProducts(e.target as HTMLElement);
  } else if ((e.target as HTMLElement).classList.contains("btn__remove")) {
    removeProducts(e.target as HTMLElement);
  }
}

function addProducts(target: HTMLElement) {
  const clickedItem = target.closest(".cart-products__item_wrapper");
  const clickedItemSpan = clickedItem?.querySelector<HTMLElement>(
    ".item__number-control_count"
  );
  if (clickedItem && clickedItemSpan) {
    cartProducts.forEach((item) => {
      if (item.id === +clickedItem.id) {
        const stock = dataProducts.products[item.id - 1].stock;
        if (item.count === stock) {
          return;
        } else {
          item.count++;
        }
        clickedItemSpan.innerHTML = `${item.count}`;
        localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
      }

      changeTotalItemsAndMoney(cartProducts);
      changePromoCodeMoney();
    });
  }
}

function removeProducts(target: HTMLElement) {
  const clickedItem = target.closest(".cart-products__item_wrapper");
  const clickedItemSpan = clickedItem?.querySelector<HTMLElement>(
    ".item__number-control_count"
  );

  if (clickedItem && clickedItemSpan) {
    cartProducts.forEach((item, i) => {
      if (item.id === +clickedItem.id) {
        if (item.count === 1) {
          cartProducts.splice(i, 1);
          clickedItem.remove();
        } else {
          item.count = item.count - 1;
        }
        clickedItemSpan.innerHTML = `${item.count}`;
        localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
        changeProductAmount();
      }

      displayCartProductItems(cartProducts, productPerPage, page);
      changeTotalItemsAndMoney(cartProducts);
      changePromoCodeMoney();
    });
  }
}
productsItems?.addEventListener("click", clickHandler);
productAmountInput?.addEventListener("input", changeProductAmount);
pageForwardBtn?.addEventListener("click", changePage);
pageBackBtn?.addEventListener("click", changePage);
