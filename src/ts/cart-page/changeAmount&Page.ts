import { getCartProducts, productAmountInput } from "./cartConst";
import { displayCartProductItems } from "./displayCart";

const cartProducts = getCartProducts();

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
